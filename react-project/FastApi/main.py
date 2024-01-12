from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import schemas
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.User)
async def create_user(user: schemas.UserBase, db: db_dependency):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    return db_user


@app.get("/users/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db: db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/users", status_code=status.HTTP_200_OK)
async def read_all_users(db: db_dependency, skip: int = 0, limit: int = 100):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users


@app.post(
    "/doctors", status_code=status.HTTP_201_CREATED, response_model=schemas.Doctor
)
async def create_doctor(doctor: schemas.DoctorCreate, db: db_dependency):
    db_doctor = models.Doctor(**doctor.model_dump())
    db.add(db_doctor)
    db.commit()
    return db_doctor


@app.get("/doctors/{doctor_id}", status_code=status.HTTP_200_OK)
async def read_doctor(doctor_id: int, db: db_dependency):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor


@app.get("/doctors", status_code=status.HTTP_200_OK)
async def read_all_doctors(db: db_dependency, skip: int = 0, limit: int = 100):
    doctors = db.query(models.Doctor).offset(skip).limit(limit).all()
    return doctors
