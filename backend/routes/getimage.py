import os
from dotenv import load_dotenv
from openai import OpenAI
from fastapi import APIRouter, FastAPI
from pydantic import BaseModel
import json

client = OpenAI()

app = FastAPI()
route_process = APIRouter()

conversation_history = [
    {
        "role": "system",
        "content": [
            {"type": "text",
             "text": "You are a virtual doctor whose role is to explain medical diagnoses and health reports in simple, everyday language. Imagine you are speaking to someone with no medical knowledge. Break down any complex terms, and explain everything in a single paragraph, using examples or analogies that a layperson can relate to. Make sure your explanation is clear, concise, and reassuring, so the person understands their health condition without feeling overwhelmed. Also, offer suggestions on what the person can do next in terms of lifestyle changes or treatments, if appropriate. write it in a paragraph"}
        ]
    }
]


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


@route_process.post("/process")
def process(request: ImageRequest):
    print(request)
    if request.first == "1":
        assistant_reply = chat_with_bot_first(request.body)
    else:
        assistant_reply = chat_with_bot(request.body)

    # Return the assistant's reply in the API response
    with open('data.json', 'w') as file:
        json.dump(conversation_history, file, indent=4)
    return conversation_history


@route_process.get("/exit")
def exit():
    conversation_history = [
        {
            "role": "system",
            "content": [
                {"type": "text",
                 "text": "You are a virtual doctor whose role is to explain medical diagnoses and health reports in simple, everyday language. Imagine you are speaking to someone with no medical knowledge. Break down any complex terms, and explain everything in a single paragraph, using examples or analogies that a layperson can relate to. Make sure your explanation is clear, concise, and reassuring, so the person understands their health condition without feeling overwhelmed. Also, offer suggestions on what the person can do next in terms of lifestyle changes or treatments, if appropriate. write it in a paragraph"}
            ]
        }
    ]
    return conversation_history
