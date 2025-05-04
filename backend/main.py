from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os

# Load the Gemini API key from environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the Gemini model
model = genai.GenerativeModel("models/gemini-1.5-flash")

# Start a chat session with a system message to set behavior and language
chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": [
            "Sen EBFL AI adında bir yapay zekâsın. Türkçe konuş ve öğrencilere sınavlara hazırlık, ders çalışma, zaman yönetimi ve motivasyon konularında yardımcı ol. Sorulara kısa, açık ve yardımcı bir şekilde yanıt ver."
        ]
    }
])

# Define the FastAPI app
app = FastAPI()

# Allow frontend connection (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for incoming requests
class Message(BaseModel):
    message: str

# Chat endpoint
@app.post("/chat")
async def chat_endpoint(msg: Message):
    try:
        response = chat.send_message(msg.message)
        return {"response": response.text}
    except Exception as e:
        print("Gemini API error:", e)
        return {"response": f"HATA: {str(e)}"}
