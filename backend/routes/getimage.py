from fastapi import APIRouter
from pydantic import BaseModel
route_process = APIRouter()


class ImageRequest(BaseModel):
    image_url: str


@route_process.post("/process")
def process(request: ImageRequest):
    print(request)
    return {"message": f"Hello, {request.image_url}!"}
