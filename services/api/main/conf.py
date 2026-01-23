from django.conf import settings as django_settings
from .app_secrets import Secrets


class TypedSettings:
    @property
    def secrets(self) -> Secrets:
        return django_settings.secrets


settings = TypedSettings()
