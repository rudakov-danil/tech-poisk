from rest_framework import generics
from rest_framework.authentication import BasicAuthentication
from knox.views import LoginView as KnoxLoginView
from .utils import send_email
from django.contrib.sites.shortcuts import get_current_site
from techpoisk.settings import EMAIL_STATIC_BASE_URL
from .models import *
from .serializers import *


class EarlyAccessMembersView(generics.ListCreateAPIView):
    queryset = EarlyAccessMember.objects.all()
    serializer_class = EarlyAccessMemberSerializer

    def create(self, request, *args, **kwargs):
        response = super(EarlyAccessMembersView, self).create(request, *args, **kwargs)
        if email := request.data.get('email'):
            token = response.data.get('early_access_token')
            send_email(
                'Ключ доступа для сервиса TechPoisk',
                'request_token.html',
                {
                    "token": token,
                    'BASE': EMAIL_STATIC_BASE_URL,
                },
                [email]
            )

        return response


class RetrieveEarlyAccessMemberView(generics.RetrieveAPIView):
    queryset = EarlyAccessMember.objects.all()
    serializer_class = EarlyAccessMemberSerializer
    lookup_field = "early_access_token__token"


class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]
