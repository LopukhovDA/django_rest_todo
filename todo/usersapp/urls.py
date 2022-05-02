from django.urls import path
from .views import UserModelViewSet

app_name = 'usersapp'

urlpatterns = [
    path('', UserModelViewSet.as_view({'get': 'list'})),
]
