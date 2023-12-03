using System;
namespace Clinic.Models;

public class DoctorReportViewModel
{
    public Guid doctorId { get; set; }
    public string doctorUsername { get; set; }
    public TimeSpan scheduledTime { get; set; }
    public int visitCount { get; set; }
}

