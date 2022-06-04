from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerWithFlags
from rest_framework import mixins, permissions
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
#    permission_classes = [permissions.IsAuthenticated]

#    def get_serializer_class(self):
#        if self.request.version == '0.2':
#            return UserModelSerializerWithFlags
#        return UserModelSerializer


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [permissions.IsAuthenticated]
