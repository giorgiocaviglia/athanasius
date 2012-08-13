import os
from django.conf import settings

# mongo server configuration
MONGO_SERVER_HOSTNAME = getattr(settings, 'MONGO_SERVER_HOSTNAME', 'localhost')
MONGO_SERVER_PORT = getattr(settings, 'MONGO_SERVER_PORT', '27017')

# Default Mongo Db
MONGO_SERVER_DEFAULT_DB = getattr(settings, 'MONGO_SERVER_DEFAULT_DB', 'mong2')

DEFAULT_QUERY_LIMIT = 10000

DEFAULT_SUGGESTED_FIELDS = [
    'Occupation',
    'BirthCountry',
    'BirthCity',
    'DeathCountry',
    'DeathCity',
    'PrimaryName',
    'Nationality'
]

DEFAULT_CASE_SENSITIVE = False