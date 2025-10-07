# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# To run, `run uvicorn app.main:app --reload --port 8000` in python_backend folder

class TextInput(BaseModel):
    text: str

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running"}

@app.post("/predict")
def predict(input: TextInput):
    # Placeholder inference
    return {"result": f"Predicted for: {input.text}"}