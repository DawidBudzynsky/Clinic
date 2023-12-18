using System;
using System.ComponentModel.DataAnnotations;

namespace Clinic.Models;

public class AppUser
{
    public Guid Id { get; set; }

    [StringLength(20, MinimumLength = 1)]
    [Required]
    public string Username { get; set; }

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string FirstName { get; set; }

    [StringLength(50, MinimumLength = 1)]
    [Required]
    public string LastName { get; set; }

    [StringLength(20, MinimumLength = 8)]
    [Required]
    public string Password { get; set; }

    [Timestamp]
    public byte[]? RowVersion { get; set; }
}