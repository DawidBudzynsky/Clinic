from enum import Enum
from datetime import datetime, date, time
from typing import List
from pydantic import BaseModel, EmailStr


class Speciality(str, Enum):
    Dermatolog = "Dermatolog"
    Cardiolog = "Cardiolog"
    Neurolog = "Neurolog"
    Orthopedic = "Orthopedic"
    Pediatric = "Pediatric"


class UserBase(BaseModel):
    username: str
    email: EmailStr | None = None
    first_name: str | None = None
    last_name: str | None = None
    password: str
    is_admin: bool | None = None
    is_active: bool | None = None


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class DoctorBase(UserBase):
    speciality: Speciality


class DoctorCreate(DoctorBase):
    pass


class Doctor(DoctorBase):
    id: int
    visits: List["Visit"] = []
    schedules: List["Schedule"] = []

    class Config:
        from_attributes = True


class VisitBase(BaseModel):
    visit_date: datetime
    description: str | None = None
    user_id: int | None = None
    doctor_id: int | None = None
    is_reserved: bool = False


class VisitCreate(VisitBase):
    pass


class Visit(VisitBase):
    id: int
    row_version: str | None = None
    user: User | None = None
    doctor: Doctor | None = None

    class Config:
        from_attributes = True


class ScheduleBase(BaseModel):
    doctor_id: int
    day: date
    start: time
    finish: time


class ScheduleCreate(ScheduleBase):
    pass


class Schedule(ScheduleBase):
    id: int
    doctor: Doctor | None = None

    class Config:
        from_attributes = True
