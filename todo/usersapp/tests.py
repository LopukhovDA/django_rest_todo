from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory
from .views import UserModelViewSet


class TestUserModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
