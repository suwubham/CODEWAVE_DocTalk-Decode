from fastapi import APIRouter

route_test = APIRouter()


@route_test.get("/test")
def test():
    return {"Hello": "World"}
