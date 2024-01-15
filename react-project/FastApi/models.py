from database import Base
from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Date,
    Time,
    Enum,
    ForeignKey,
    Text,
    Boolean,
)
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), nullable=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    password = Column(String(50), nullable=False)
    is_admin = Column(Boolean, nullable=True)
    is_active = Column(Boolean, nullable=True)
    visits = relationship("Visit", back_populates="user")


class Speciality(PyEnum):
    Dermatolog = "Dermatolog"
    Cardiolog = "Cardiolog"
    Neurolog = "Neurolog"
    Orthopedic = "Orthopedic"
    Pediatric = "Pediatric"


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), nullable=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    visits = relationship("Visit", back_populates="doctor")
    schedules = relationship("Schedule", back_populates="doctor")
    password = Column(String(50), nullable=False)
    is_admin = Column(Boolean, nullable=True)
    is_active = Column(Boolean, nullable=True)
    speciality = Column(Enum(Speciality))


class Visit(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    visit_date = Column(DateTime)
    description = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="visits")
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    doctor = relationship("Doctor", back_populates="visits")
    is_reserved = Column(Boolean, default=False)
    row_version = Column(String(50), nullable=True)


class Schedule(Base):
    __tablename__ = "schedules"
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))  # ForeignKey constraint added
    doctor = relationship("Doctor", back_populates="schedules")
    day = Column(Date)
    start = Column(Time)
    finish = Column(Time)
