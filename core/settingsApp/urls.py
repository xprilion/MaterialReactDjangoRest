from django.urls import path

from . import views

urlpatterns = [
    path('fetch/', views.GetSettings.as_view(), name='update_settings'),
    path('update/', views.UpdateSettings.as_view(), name='get_settings'),
]