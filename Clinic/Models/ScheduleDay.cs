using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Clinic.Models;
public class ScheduleDay
{
    public Guid Id { get; set; }

    [ForeignKey("Doctor")]
    public Guid? doctorId { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime day { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public DateTime startHour { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public DateTime endHour { get; set; }
}

