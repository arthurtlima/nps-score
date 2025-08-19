from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    DATABASE_URL: str

    CORS_ORIGINS: str = "http://localhost:3000"
    DEBUG: bool = False
    SECRET_KEY: str

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    APP_NAME: str = "NPS API"
    VERSION: str = "1.0.0"

    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS_ORIGINS string to a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
