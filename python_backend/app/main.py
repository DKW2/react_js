# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from app.leetcode.longestIncreasingSubsequence import LongestIncreasingSubsequence
from app.leetcode.longestCommonSubsequence import LongestCommonSubsequence
from app.leetcode.framework import ArgError
import random

# To run, run `uvicorn app.main:app --reload --port 8000` in python_backend folder

class TextInput(BaseModel):
    text: str

class ProblemData(BaseModel):
    data: dict[str, Any]
    problemName: str

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

@app.get("/funny_word")
def giveFunnyWord():
    funnyWords = ["Skibity", "Turtle", "Rizz", "Sigma"]
    return {"result": f"{random.choice(funnyWords)}"}

@app.post("/array_problem")
def getOptions(input:ProblemData):
    data, problemName = input.data, input.problemName

    try:
        if problemName == "LIS":
            problem = LongestIncreasingSubsequence( problemName, data )
        elif problemName == "LCS":
            problem = LongestCommonSubsequence( problemName, data )
        else:
            return {"result": "Problem not found"}

        answer = problem.solve()
    except ArgError:
        return {"result": "Bad args"}

    if( type(answer) == list ):
        return {"result": ", ".join( str( num ) for num in answer )}
    else:
        return {"result": str( answer ) }
