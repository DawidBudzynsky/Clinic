using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Models;

public class Visit
{
    public int Id { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime dateTime { get; set; }

    public string? description { get; set; }

    public User? user { get; set; }

    public Doctor? doctor { get; set; }

    [Column(TypeName = "decimal(1,0)")]
    [Range(0, 1)]
    [Required]
    public int isReserved { get; set; } = 0;

    [Timestamp]
    public byte[]? RowVersion { get; set; }
}