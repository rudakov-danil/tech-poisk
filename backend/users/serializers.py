from rest_framework import serializers
from .models import *


class EarlyAccessMemberSerializer(serializers.ModelSerializer):
    early_access_token = serializers.CharField(source='early_access_token.token', required=False)

    class Meta:
        model = EarlyAccessMember
        fields = '__all__'


class EarlyAccessTokenSerializer(serializers.ModelSerializer):
    token = serializers.CharField()

    class Meta:
        model = EarlyAccessToken
        fields = ("token",)
