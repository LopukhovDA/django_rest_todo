from statistics import mode
from tkinter import CASCADE
from venv import create
from django.db import models
from usersapp.models import User


class Project(models.Model):
    name = models.CharField(verbose_name="Название проекта", max_length=128)
    link = models.URLField(
        verbose_name="ссылка на репозиторий", max_length=200, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    name = models.CharField(verbose_name="Название заметки", max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_note = models.TextField(verbose_name="текст заметки")
    created_date = models.DateTimeField(
        verbose_name="дата создания", auto_created=True)
    updated_date = models.DateTimeField(
        verbose_name="дата обновления", auto_now=True)
    created_user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
