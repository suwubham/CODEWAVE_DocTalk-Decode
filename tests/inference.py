import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

conversation_history = [
    {
        "role": "system",
                "content": [
                    {"type": "text",
                     "text": "You are a virtual doctor whose role is to explain medical diagnoses and health reports in simple, everyday language. Imagine you are speaking to someone with no medical knowledge. Break down any complex terms, and explain everything in a single paragraph, using examples or analogies that a layperson can relate to. Make sure your explanation is clear, concise, and reassuring, so the person understands their health condition without feeling overwhelmed. Also, offer suggestions on what the person can do next in terms of lifestyle changes or treatments, if appropriate. write it in a paragraph"}
                ]
    },
    {
        "role": "user",
        "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://firebasestorage.googleapis.com/v0/b/codewave-hackathon.appspot.com/o/files%2Ftest.jpg?alt=media&token=c967d37c-6661-4fa9-bde6-28ca7afa8c2a",
                        "detail": "high"
                    },
                },
        ],
    }
]


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
        {"role": "assistant", "content": [{"type": "text", "text": assistant_reply}]})

    return assistant_reply


assistant_reply = chat_with_bot("")
while True:
    print("Assistant:", assistant_reply)
    user_input = input("User: ")
    if user_input.lower() == "exit":
        break
    assistant_reply = chat_with_bot(user_input)
