import os
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import APIRouter, FastAPI
from pydantic import BaseModel
import json

client = OpenAI()

app = FastAPI()
route_process = APIRouter()

# Default conversation history
default_conversation_history = [
    {
        "role": "system",
        "content": [
            {"type": "text",
             "text": "Given the following medical report text, provide a paragraph summarizing what the report says in an 8th-grade level and patient-friendly manner. Write in nepali"}
        ]
    }
]

# Initialize conversation history with the default value
conversation_history = default_conversation_history.copy()


class ImageRequest(BaseModel):
    body: str
    first: str


class ExitRequest(BaseModel):
    exit: str


def chat_with_bot_first(image_url):
    conversation_history.append(
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_url,
                        "detail": "high"
                    },
                },
            ],
        }
    )

    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=conversation_history,
        temperature=0.1,
        top_p=0.1
    )

    assistant_reply = response.choices[0].message.content
    conversation_history.append(
        {"role": "assistant", "content": [
            {"type": "text", "text": assistant_reply}]}
    )

    return conversation_history


def chat_with_bot(user_text):
    conversation_history.append(
        {"role": "user", "content": [{"type": "text", "text": user_text}]})

    response = client.chat.completions.create(
        model='gpt-4o',
        messages=conversation_history,
        temperature=0.1,
        top_p=0.1
    )

    assistant_reply = response.choices[0].message.content
    conversation_history.append(
        {"role": "assistant", "content": [
            {"type": "text", "text": assistant_reply}]}
    )

    return conversation_history


# Route to process chat
@route_process.post("/process")
def process(request: ImageRequest):
    if request.first == "1":
        assistant_reply = chat_with_bot_first(request.body)
    else:
        assistant_reply = chat_with_bot(request.body)
    return conversation_history


# Route to reset conversation history
@route_process.get("/exit")
def reset_conversation():
    global conversation_history
    conversation_history = default_conversation_history.copy()
    return {"message": "Conversation history has been reset.", "conversation_history": conversation_history}


app.include_router(route_process)
