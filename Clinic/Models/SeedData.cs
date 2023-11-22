using Clinic.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Clinic.Data;
using System;
using System.Linq;

namespace Clinic.Models
{
    public class SeedData
    {
        public static void Initialiaze(IServiceProvider serviceProvider)
        {
            using (var context = new ClinicContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ClinicContext>>()))
            {
                // Look for any Users.
                if (!context.User.Any())
                {
                    context.User.AddRange(
                     // Add Director
				        new User
					    {
						    Username = "Admin",
						    FirstName = "Tadeusz",
						    LastName = "Romaniewski",
						    Password = "admin,123",
						    IsAdmin = 1,
						    isActive = true
					    },

                        new User
                        {
                            Username = "AdrianKamyk",
                            FirstName = "Adrian",
                            LastName = "Kamyk",
                            Password = "Adrian,123",
                            IsAdmin = 0,
                            isActive = false
                        },

                        new User
                        {
                            Username = "AlicjaDom",
                            FirstName = "Alicja",
                            LastName = "Dom",
                            Password = "Alicja,123",
                            IsAdmin = 0,
                            isActive = true
                        }
                    );
                    context.SaveChanges();
                }

                if (!context.Doctor.Any())
                {
                    context.Doctor.AddRange(

                        new Doctor
                        {
                            Username = "drRafał",
                            FirstName = "Rafał",
                            LastName = "Wilczur",
                            Password = "Doktor,123",
                            Speciality = Speciality.Neurolog,
                        },

                        new Doctor
                        {
                            Username = "drAntoni",
                            FirstName = "Antoni",
                            LastName = "Kosiba",
                            Password = "Doktor,123",
                            Speciality = Speciality.Dermatolog,
                        }
                    );
                    context.SaveChanges();
                }

                if (!context.ScheduleDay.Any())
                {

                    var doctorRafal = context.Doctor.SingleOrDefault(d => d.Username == "drRafał");
                    var doctorAntoni = context.Doctor.SingleOrDefault(d => d.Username == "drAntoni");
                    context.ScheduleDay.AddRange(

                        new ScheduleDay
                        {
                            day = DateTime.Today,
                            startHour = DateTime.Parse("09:00 AM"),
                            endHour = DateTime.Parse("10:00 AM"),
                            doctorId = doctorRafal.Id,
                        },

                        new ScheduleDay
                        {
                            day = DateTime.Today.AddDays(1),
                            startHour = DateTime.Parse("08:00 AM"),
                            endHour = DateTime.Parse("10:00 AM"),
                            doctorId = doctorAntoni.Id,
                        }
                    );
                    context.SaveChanges();
                }

                if (!context.Visit.Any())
                {
                    var schedules = context.ScheduleDay.ToList();
                    foreach (var schedule in schedules)
                    {
                        CreateVisits(context, schedule);
                    }

                    context.SaveChanges();
                }
            }
        }

        private static void CreateVisits(ClinicContext context, ScheduleDay scheduleDay)
        {
            TimeSpan visitDuration = TimeSpan.FromMinutes(15);
            DateTime currentDateTime = scheduleDay.startHour;

            var doctor = context.Doctor.Find(scheduleDay.doctorId);

            while (currentDateTime < scheduleDay.endHour)
            {
                Visit visit = new Visit
                {
                    doctor = doctor,
                    dateTime = scheduleDay.day.Date + currentDateTime.TimeOfDay
                };

                context.Add(visit);

                currentDateTime = currentDateTime.Add(visitDuration);
            }
        }
    }
}