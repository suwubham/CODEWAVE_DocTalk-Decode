import os
from dotenv import load_dotenv
import openai

load_dotenv()

client = openai.OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.sambanova.ai/v1",
)

conversation_history = [
    {"role": "system", "content": "You are a doctor. Here is the OCR output of a report. You are to provide a brief summary of the report and provide any helpful suggesion. Speak in a friendly tone."}
]


def chat_with_bot(user_input):
    conversation_history.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=conversation_history,
        temperature=0.1,
        top_p=0.1
    )

    assistant_reply = response.choices[0].message.content
    conversation_history.append(
        {"role": "assistant", "content": assistant_reply})

    return assistant_reply


while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    assistant_reply = chat_with_bot(user_input)
    print("Assistant:", assistant_reply)
