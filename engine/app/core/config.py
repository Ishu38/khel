from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Khel AI Engine"
    debug: bool = False
    deepseek_api_key: str = ""
    deepseek_base_url: str = "https://api.deepseek.com"
    gateway_url: str = "http://localhost:3001"
    model_id: str = "deepseek-chat"

    class Config:
        env_file = ".env"


settings = Settings()
