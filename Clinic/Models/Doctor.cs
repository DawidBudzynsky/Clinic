using System;
using System.ComponentModel.DataAnnotations;

namespace Clinic.Models;

public enum Speciality
{
    Dermatolog,
    Cardiolog,
    Neurolog,
    Orthopedic,
    Pediatric
}

public class Doctor : AppUser
{
    public ICollection<Visit>? Visits { get; set; }

    public Speciality Speciality { get; set; }
}