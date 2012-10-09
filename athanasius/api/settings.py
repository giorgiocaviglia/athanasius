#   settings.py
from django.conf import settings

API_KEY_SIZE = getattr(settings, 'API_KEY_SIKE', 20)
