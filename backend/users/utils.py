from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from techpoisk import settings


def send_email(subject, template, context, recipient_list):
    html_message = render_to_string(template, context)
    plain_message = strip_tags(html_message)
    from_email = settings.DEFAULT_FROM_EMAIL

    mail.send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)
