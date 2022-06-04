from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ToDoModelSerializerBase
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter
from rest_framework import permissions


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#    permission_classes = [permissions.IsAuthenticated]
#    pagination_class = ProjectLimitOffsetPagination
#    filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializerBase
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#    permission_classes = [permissions.IsAuthenticated]
#    pagination_class = ToDoLimitOffsetPagination
#    filterset_fields = ['project']

#    def get_serializer_class(self):
#        if self.request.method in ['GET']:
#            return ToDoModelSerializer
#        return ToDoModelSerializerBase

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
