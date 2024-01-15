from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated

from starlette.status import HTTP_200_OK
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import schemas
from fastapi.middleware.cors import CORSMiddleware
import auth
from database import get_db


app = FastAPI()
app.include_router(auth.router)

origins = ["http://localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(auth.get_current_user)]


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


@app.get("/current_user", status_code=status.HTTP_200_OK)
async def current_user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    db_user = db.query(models.User).get(user["id"])
    return db_user


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


@app.post(
    "/schedules",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.ScheduleBase,
)
async def schedule_create(schedule: schemas.ScheduleCreate, db: db_dependency):
    db_schedule = models.Schedule(**schedule.model_dump())
    db.add(db_schedule)
    db.commit()
    return db_schedule


@app.get("/schedules/{schedule_id}", status_code=status.HTTP_200_OK)
async def read_schedule(schedule_id: int, db: db_dependency):
    schedule = (
        db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()
    )
    if schedule is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return schedule


@app.get("/schedules", status_code=status.HTTP_200_OK)
async def read_all_schedules(db: db_dependency, skip: int = 0, limit: int = 100):
    schedules = (
        db.query(models.Schedule)
        .offset(skip)
        .limit(limit)
        .options(joinedload(models.Schedule.doctor))
        .all()
    )
    return schedules


@app.get("/specialities", status_code=status.HTTP_200_OK)
async def get_specialitis():
    specialties = [specialty for specialty in models.Speciality]
    return specialties
