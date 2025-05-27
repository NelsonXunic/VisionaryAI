# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

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
    # Add other origins if your frontend runs on a different port/domain
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