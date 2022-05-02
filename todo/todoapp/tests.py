from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from mixer.backend.django import mixer
from usersapp.models import User
from .models import Project, ToDo


class TestProjectModelViewSet(TestCase):
    def test_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToDoModelViewSet(APITestCase):
    def test_get_list(self):
        todo = mixer.blend(ToDo, created_date="2022-05-02 20:00:00")
        response = self.client.get(f'/api/notes/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = mixer.blend(Project)
        todo = mixer.blend(
            ToDo, created_date="2022-05-02 20:00:00", project=project)
        super_user = User.objects.create_superuser(
            "rest", "lopukhovda@gmail.com", "geekbrains", user_category="administrator"
        )
        project.users.set([super_user])
        self.client.login(username='rest', password='geekbrains')
        response = self.client.get(f'/api/notes/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.put(
            f'/api/notes/{todo.id}/', {'name': 'Срочный ToDo list', 'project': project.id,
                                       'text_note': todo.text_note, 'created_date': todo.created_date,
                                       'updated_date': todo.updated_date, 'created_user': super_user.id,
                                       'is_active': True})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.name, 'Срочный ToDo list')
