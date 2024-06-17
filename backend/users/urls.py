from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from knox import views as knox_views
from users.views import *


urlpatterns = [
    path('earlyAccessMembers/', EarlyAccessMembersView.as_view()),
    path('retrieveEarlyAccessMember/<str:early_access_token__token>', RetrieveEarlyAccessMemberView.as_view()),
    path(r'login/', LoginView.as_view(), name='knox_login'),
    path(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path(r'logoutAll/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
]
