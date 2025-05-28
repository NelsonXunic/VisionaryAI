# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from celery_worker import debug_task # Import celery_app and task

from fastapi import UploadFile, File, HTTPException
import base64
from celery_worker import generate_caption # Import the new task

load_dotenv() # Load environment variables from .env file

app = FastAPI(
    title="VisionaryAI Backend",
    description="API for image captioning, VQA, and text-to-speech.",
    version="0.1.0",
)

# CORS Middleware: Crucial for frontend-backend communication during development
origins = [
    "http://localhost:3000",  # Frontend development server (React/Next.js default)
    "http://127.0.0.1:3000",
    # Add other origins if frontend runs on a different port/domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to VisionaryAI Backend!"}

@app.get("/ping")
async def ping():
    return {"status": "pong", "message": "Backend is running and accessible."}

# Optional: Test environment variable loading
@app.get("/env_test")
async def env_test():
    test_var = os.getenv("TEST_ENV_VAR", "Not Set")
    return {"test_variable": test_var}

@app.get("/test_celery")
async def test_celery_task():
    """
    Sends a simple debug task to the Celery worker.
    """
    task = debug_task.delay("This is a test message from FastAPI.")
    return {"task_id": task.id, "message": "Celery task sent successfully."}

@app.get("/task_status/{task_id}")
async def get_task_status(task_id: str):
    """
    Retrieves the status and result of a Celery task by ID.
    """
    task_result = debug_task.AsyncResult(task_id)
    return {
        "task_id": task_id,
        "status": task_result.status,
        "result": task_result.result if task_result.ready() else None
    }

@app.post("/caption_image")
async def caption_image(file: UploadFile = File(...)):
    """
    Receives an image, sends it to Celery for captioning, and returns the task ID.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")

    image_bytes = await file.read()
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')

    task = generate_caption.delay(image_base64)
    return {"task_id": task.id, "message": "Image captioning task initiated."}