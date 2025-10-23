# backend/app/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

# DB stuff
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from . import models, db, dependencies

from app.leetcode.longestIncreasingSubsequence import LongestIncreasingSubsequence
from app.leetcode.longestCommonSubsequence import LongestCommonSubsequence
from app.leetcode.framework import ArgError
import random

from pocketflow.utils.call_llm import call_llm

# To run, run `python -m uvicorn app.main:app --reload --port 8000` in python_backend folder

class TextInput(BaseModel):
    text: str

class ProblemData(BaseModel):
    data: dict[str, Any]
    problemName: str

app = FastAPI()

models.Base.metadata.create_all(bind=db.engine)

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

    print( f"Processing problem: {problemName} with data: {data}" )

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

class UserCreate(BaseModel):
    name: str
    email: str

@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(dependencies.get_db)):
    user = models.User(name=user.name, email=user.email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(dependencies.get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"result": "User deleted successfully"}


class UserRead(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True  # allows SQLAlchemy models to be converted to Pydantic models
        
@app.get("/users/")
def get_users(db: Session = Depends(dependencies.get_db)):
    users = db.query(models.User).all()  # retrieves all users
    return users

class QueryLLM(BaseModel):
    query: str

@app.post("/query_llm")
async def query_llm(query: QueryLLM):
    prompt = query.query
    response = call_llm(prompt)
    return {"result": response}