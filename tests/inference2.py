from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
          "role": "system",
          "content": [
              {"type": "text",
               "text": "You are a professional doctor and you are to talk in a conversational way. Here is an image of a medical report. Explain it for a 10 years old"}
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

    ],
)

print(response.choices[0])
