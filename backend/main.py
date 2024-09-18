from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.test import route_test
from routes.getimage import route_process

app = FastAPI()

app.include_router(route_test)
app.include_router(route_process)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
