
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    MALE = 'M'
    FEMALE = 'W'

    GENDER_CHOICES = (
        (MALE, 'М'),
        (FEMALE, 'Ж'),
    )

    ADMINISTRATOR = "administrator"
    PROJECT_MANAGER = "project manager"
    DEVELOPER = "developer"

    CATEGORY_CHOICES = (
        (ADMINISTRATOR, 'администратор'),
        (PROJECT_MANAGER, 'менеджер проекта'),
        (DEVELOPER, 'разработчик'),
    )

    email = models.EmailField(
        verbose_name="электронная почта", blank=True, unique=True)
    age = models.PositiveIntegerField(
        verbose_name="возраст", default=18, blank=True)
    city = models.CharField(verbose_name='город', max_length=100, blank=True)
    gender = models.CharField(
        verbose_name='пол', max_length=1, choices=GENDER_CHOICES, blank=True)
    user_category = models.CharField(
        verbose_name='категория пользователя', max_length=30, choices=CATEGORY_CHOICES)
