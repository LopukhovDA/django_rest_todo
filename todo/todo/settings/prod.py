from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'rest',
        'PASSWORD': 'geekbrains',
        'HOST': 'db',
        'PORT': '5432'
    }
}
