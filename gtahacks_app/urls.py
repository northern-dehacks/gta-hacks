from django.urls import path

from .views import index, Success


urlpatterns = [
    path('', index, name='home'),
    path('success/', Success.as_view(), name='success')
]