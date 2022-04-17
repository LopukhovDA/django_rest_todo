from django.core.management.base import BaseCommand
from usersapp.models import User

import json


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open("test_users.json", "r", encoding="utf-8") as f:
            users = json.load(f)

        User.objects.all().delete()
        for user in users:
            new_user = User(**user)
            new_user.save()

        super_user = User.objects.create_superuser(
            "rest", "lopukhovda@gmail.com", "geekbrains", user_category="administrator"
        )
