from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.views import TokenViewBase, TokenObtainPairView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Setting
from .serializers import SettingSerializer

class GetSettings(GenericAPIView):
    permission_classes = []
    authentication_classes = []

    def get(self, request):
        Settings = Setting.objects.all()

        if(len(Settings) > 0):
            Settings = Settings[0]
            
            res = {
                "contactMail": Settings.contactMail,
                "noIndex": Settings.noIndex,
                "bannerImageUrl": Settings.bannerImageUrl,
                "mainText": Settings.mainText,
                "metaTags": Settings.metaTags,
                "metaDesc": Settings.metaDesc,
                "tracker": Settings.tracker
            }

            return JsonResponse(res, status=200)
        else:
            return JsonResponse({"error": "failure"}, status=400)

class UpdateSettings(GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = JSONParser().parse(request)
        data = data["data"]
        

        contactMail = data["contactMail"]
        noIndex = data["noIndex"]
        bannerImageUrl = data["bannerImageUrl"]
        mainText = data["mainText"]
        metaTags = data["metaTags"]
        metaDesc = data["metaDesc"]
        tracker = data["tracker"]
        
        try:
            Settings = Setting.objects.all()

            if(len(Settings) > 0):
                Settings = Settings[0]

                Settings.contactMail = contactMail
                Settings.noIndex = noIndex
                Settings.bannerImageUrl = bannerImageUrl
                Settings.mainText = mainText
                Settings.metaTags = metaTags
                Settings.metaDesc = metaDesc
                Settings.tracker = tracker
            else:
                Settings = Setting.objects.create(
                    contactMail = contactMail,
                    noIndex = noIndex,
                    bannerImageUrl = bannerImageUrl,
                    mainText = mainText,
                    metaTags = metaTags,
                    metaDesc = metaDesc,
                    tracker = tracker
                )

            Settings.save()

            res = {
                "contactMail": contactMail,
                "noIndex": noIndex,
                "bannerImageUrl": bannerImageUrl,
                "mainText": mainText,
                "metaTags": metaTags,
                "metaDesc": metaDesc,
                "tracker": tracker
            }
            
            return JsonResponse(res, status=201)
        except:
            pass
        
        return JsonResponse({"error": "Unknown error occured"}, status=400)