# backend/celery_worker.py
from celery import Celery
import os
from dotenv import load_dotenv

from transformers import pipeline, AutoProcessor, MusicgenForConditionalGeneration
from PIL import Image
import io
import base64

import scipy.io.wavfile as wavfile
import numpy as np

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

# Global model for image captioning
print("Loading image captioning model...")
captioner = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")
print("Image captioning model loaded.")

# Global model for Visual Question Answering
print("Loading VQA model...")
vqa_pipeline = pipeline("visual-question-answering", model="dandelin/vilt-b32-finetuned-vqa")
print("VQA model loaded.")

# Global models for Text-to-Speech
print("Loading TTS processor and model...")
tts_processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
tts_model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
print("TTS models loaded.")

@celery_app.task
def debug_task(message):
    """
    A simple task to verify Celery is working.
    """
    print(f"Executing debug task: {message}")
    return f"Task completed: {message}"

@celery_app.task(bind=True)
def generate_caption(self, image_base64_string: str):
    try:
        # Decode the base64 string to bytes
        image_bytes = base64.b64decode(image_base64_string)
        # Open the image using PIL
        image = Image.open(io.BytesIO(image_bytes))

        # Generate caption
        caption = captioner(image)[0]['generated_text']

        print(f"Generated caption: {caption}")
        return {"caption": caption}
    except Exception as e:
        self.update_state(state='FAILURE', meta={'exc_type': type(e).__name__, 'exc_message': str(e)}) # Update task state on failure
        print(f"Error generating caption: {e}")
        raise # Re-raise the exception to mark the task as failed

@celery_app.task(bind=True)
def answer_question_on_image(self, image_base64_string: str, question: str):
    try:
        image_bytes = base64.b64decode(image_base64_string)
        image = Image.open(io.BytesIO(image_bytes))

        # Generate answer
        answer = vqa_pipeline(image=image, question=question)[0]['answer']

        print(f"Answer for '{question}': {answer}")
        return {"answer": answer}
    except Exception as e:
        self.update_state(state='FAILURE', meta={'exc_type': type(e).__name__, 'exc_message': str(e)}) # Update task state on failure
        print(f"Error answering question: {e}")
        raise

@celery_app.task(bind=True)
def generate_speech(self, text: str):
    try:
        inputs = tts_processor(text=text, sampling_rate=tts_model.config.sampling_rate, return_tensors="pt")
        audio_values = tts_model.generate(**inputs, do_sample=True, guidance_scale=3.0, max_new_tokens=256)
        # Convert audio to a suitable format (e.g., WAV bytes) and base64 encode
        audio_np = audio_values[0, 0].cpu().numpy()
        # Normalize to 16-bit PCM for WAV
        audio_np = (audio_np * 32767).astype(np.int16)

        # Save to a BytesIO object (in-memory file) as WAV [cite: 64]
        buffer = io.BytesIO()
        wavfile.write(buffer, tts_model.config.sampling_rate, audio_np)

        audio_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

        print(f"Generated speech for: '{text}' (size: {len(audio_base64) / 1024:.2f} KB)")
        return {"audio_base64": audio_base64, "format": "wav"}
    except Exception as e:
        self.update_state(state='FAILURE', meta={'exc_type': type(e).__name__, 'exc_message': str(e)}) # Update task state on failure [cite: 64]
        print(f"Error generating speech: {e}") [cite: 65]
        raise