import secrets

from django.db import models
from django.contrib.auth.models import AbstractUser
import random


EARLY_ACCESS_TOKEN_LENGTH = 32


def generate_early_access_token():
    return secrets.token_urlsafe(EARLY_ACCESS_TOKEN_LENGTH)[:EARLY_ACCESS_TOKEN_LENGTH]


class EarlyAccessToken(models.Model):
    token = models.CharField(
        max_length=EARLY_ACCESS_TOKEN_LENGTH,
        default=generate_early_access_token
    )

    def __str__(self):
        return self.token


class EarlyAccessMember(models.Model):
    email = models.EmailField(blank=True, default='', unique=True)
    early_access_token = models.ForeignKey(
        EarlyAccessToken,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='early_access_members'
    )
    first_name = models.CharField(max_length=32, blank=True, default='')
    last_name = models.CharField(max_length=32, blank=True, default='')

    def save(self, **kwargs):
        super(EarlyAccessMember, self).save(**kwargs)
        token = EarlyAccessToken()
        token.save()
        token.early_access_members.add(self)


class Contact(models.Model):
    contact_type = models.CharField(max_length=32)
    contact = models.CharField(max_length=64)
    early_access_member = models.ForeignKey(
        EarlyAccessMember,
        on_delete=models.CASCADE
    )
