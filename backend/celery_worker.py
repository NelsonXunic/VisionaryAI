# backend/celery_worker.py
from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables

# Configure Celery to connect to Redis
# Ensure CELERY_BROKER_URL and CELERY_RESULT_BACKEND are set in your .env file
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")

celery_app = Celery(
    'visionaryai',
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
    include=['main'] # We'll move tasks here later, or create a tasks.py
)

celery_app.conf.update(
    task_track_started=True,
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    broker_connection_retry_on_startup=True # Important for Docker scenarios
)

@celery_app.task
def debug_task(message):
    """
    A simple task to verify Celery is working.
    """
    print(f"Executing debug task: {message}")
    return f"Task completed: {message}"