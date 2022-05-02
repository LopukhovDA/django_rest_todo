from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField, ModelSerializer
from .models import Project, ToDo


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


class ToDoModelSerializerBase(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
