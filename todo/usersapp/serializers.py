from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name",
                  "last_name", "email", "user_category", "gender")


class UserModelSerializerWithFlags(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name",
                  "last_name", "email", "user_category", "gender",
                  "is_superuser", "is_staff")
