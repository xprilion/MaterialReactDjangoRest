from rest_framework import permissions, status, generics
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .serializers import RefreshTokenSerializer, LoginSerializer, RegisterSerializer, RefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User

class LogoutView(GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class RefreshView(TokenRefreshView):
    serializer_class = RefreshSerializer

class RegisterView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid()
        response = sz.save()
        return response
