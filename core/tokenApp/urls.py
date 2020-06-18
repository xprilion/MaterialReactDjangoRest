from django.urls import path

from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='token_register'),
    path('login/', views.LoginView.as_view(), name='token_login'),
    path('refresh/', views.RefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', views.LogoutView, name='token_logout')
]