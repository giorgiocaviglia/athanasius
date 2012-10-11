#   settings.py
from django.conf import settings

API_KEY_SIZE = getattr(settings, 'API_KEY_SIKE', 30)


#   mongo server configuration
MONGO_SERVER_HOSTNAME = getattr(settings, 'MONGO_SERVER_HOSTNAME', 'localhost')
MONGO_SERVER_PORT = getattr(settings, 'MONGO_SERVER_PORT', '27017')
MONGO_SERVER_DEFAULT_DB = getattr(settings, 'MONGO_SERVER_DEFAULT_DB', 'mrofl')

#   request limit and offset
DEFAULT_OFFSET = getattr(settings, 'DEFAULT_OFFSET', 0)
DEFAULT_LIMIT = getattr(settings, 'DEFAULT_LIMIT', 0)
DEFAULT_SORT = [( '_id', 1)]