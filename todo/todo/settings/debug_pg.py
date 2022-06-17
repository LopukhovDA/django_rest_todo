from .debug import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'rest',
        'PASSWORD': 'geekbrains',
        'HOST': '127.0.0.1',
        'PORT': '54327'
    }
}
