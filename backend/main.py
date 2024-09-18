from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.test import route_test

app = FastAPI()

app.include_router(route_test)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
