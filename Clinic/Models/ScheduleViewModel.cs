using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Models;
public class ScheduleViewModel
{
    public ScheduleDay? schedule { get; set; }

    [DisplayName("Doctor Name")]
    public string? DoctorUsername { get; set; }
}