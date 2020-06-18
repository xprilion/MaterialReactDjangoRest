from django.utils.text import gettext_lazy as _
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': _('Token is invalid or expired')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        del data['refresh']
        del data['access']

        data['success'] = True
        data['refreshToken'] = str(refresh)
        data['accessToken'] = str(refresh.access_token)

        return data

class RefreshSerializer(TokenRefreshSerializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        data = super().validate(attrs)

        access = data['access']

        data['success'] = True
        data['accessToken'] = access

        del data['access']

        return data

class RegisterSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        self.username = attrs['username']
        self.email = attrs['email']
        self.password = attrs['password']
        return attrs

    def save(self, **kwargs):

        username = self.username
        email = self.email
        password = self.password

        newUser = User.objects.create_user(username, email, password)
        newUser.save()
        
        if newUser is not None:
            newUserAttrs = {"username": username, "password": password}
            data = super().validate(newUserAttrs)

            refresh = self.get_token(self.user)

            del data['refresh']
            del data['access']

            data['success'] = True
            data['refreshToken'] = str(refresh)
            data['accessToken'] = str(refresh.access_token)

            return Response(data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

