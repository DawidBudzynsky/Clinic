using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Clinic.Models;

namespace Clinic.Data
{
    public class ClinicContext : DbContext
    {
        public ClinicContext (DbContextOptions<ClinicContext> options)
            : base(options)
        {
        }

        public DbSet<Clinic.Models.User> User { get; set; } = default!;

        public DbSet<Clinic.Models.Doctor> Doctor { get; set; } = default!;

        public DbSet<Clinic.Models.ScheduleDay> ScheduleDay { get; set; } = default!;

        public DbSet<Clinic.Models.Visit> Visit { get; set; } = default!;
    }
}
