# backend/ai_models/core.py
from transformers import pipeline, AutoProcessor, MusicgenForConditionalGeneration

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