using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Models;

public class User : AppUser
{
    [Column(TypeName = "decimal(1,0)")]
    [Range(0, 1)]
    [Required]
    public int IsAdmin { get; set; } = 0;

    public bool isActive { get; set; } = false;

}