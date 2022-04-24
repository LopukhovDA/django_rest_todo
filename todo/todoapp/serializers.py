from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer()
    created_user = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
