from rest_framework import serializers
from .models import Setting
import datetime

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ['id', 'noIndex', 'contactMail', 'bannerImageUrl', 'mainText', 'metaTags', 'metaDesc', 'tracker']