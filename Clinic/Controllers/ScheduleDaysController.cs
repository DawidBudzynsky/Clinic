using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Clinic.Data;
using Clinic.Models;
using Microsoft.AspNetCore.Authorization;

namespace Clinic.Controllers
{
    public class ScheduleDaysController : Controller
    {
        private readonly ClinicContext _context;

        public ScheduleDaysController(ClinicContext context)
        {
            _context = context;
        }

        // GET: ScheduleDays
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Index(Guid? doctorId)
        {
            var doctors = await _context.Doctor.ToListAsync();
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "", Value = "" });

            foreach (var doctor in doctors)
            {
                items.Add(new SelectListItem { Text = doctor.Username, Value = doctor.Id.ToString() });
            }

            var schedules = await _context.ScheduleDay.ToListAsync();
            if (doctorId.HasValue)
            {
                schedules = schedules.FindAll(s => s.doctorId == doctorId);
            }

            var scheduleViewModels = new List<ScheduleViewModel>();

            foreach (var s in schedules)
            {
                var doctor = await _context.Doctor.FirstOrDefaultAsync(d => d.Id == s.doctorId);
                var svm = new ScheduleViewModel { DoctorUsername = doctor.Username, schedule = s };
                scheduleViewModels.Add(svm);
            }

            ViewBag.Doctors = items;

            return View(scheduleViewModels);
        }

        // GET: ScheduleDays/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.ScheduleDay == null)
            {
                return NotFound();
            }

            var scheduleDay = await _context.ScheduleDay
                .FirstOrDefaultAsync(m => m.Id == id);
            if (scheduleDay == null)
            {
                return NotFound();
            }

            return View(scheduleDay);
        }

        // GET: ScheduleDays/Create
        public IActionResult Create()
        {
            var doctors = _context.Doctor.Select(d => new SelectListItem { Value = d.Id.ToString(), Text = d.Username }).ToList();
            ViewBag.Doctors = new SelectList(doctors, "Value", "Text");

            return View();
        }

        // POST: ScheduleDays/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,doctorId,day,startHour,endHour")] ScheduleDay scheduleDay)
        {
            if (ModelState.IsValid)
            {
                DateTime today = DateTime.Today;
                DateTime startOfWeek = today.AddDays((int)DayOfWeek.Monday - (int)today.DayOfWeek);
                DateTime endOfWeek = startOfWeek.AddDays(6);

                var doctors = _context.Doctor.Select(d => new SelectListItem { Value = d.Id.ToString(), Text = d.Username }).ToList();
                ViewBag.Doctors = new SelectList(doctors, "Value", "Text");

                if (scheduleDay.day < startOfWeek || scheduleDay.day > endOfWeek)
                {
                    // Display an error message on the create page
                    ModelState.AddModelError("Day", "Day should be within the current week (Monday to Sunday).");
                    return View(scheduleDay);
                }
                if (_context.ScheduleDay.Any(s => s.doctorId == scheduleDay.doctorId && s.day == scheduleDay.day))
                {
                    // Display an error message on the create page
                    ModelState.AddModelError("Day", "A schedule for the given day already exists.");
                    return View(scheduleDay);
                }

                if (scheduleDay.startHour >= scheduleDay.endHour)
                {
                    ModelState.AddModelError("Finish", "Finish time should be greater than Start time.");
                    return View(scheduleDay);
                }

                if (scheduleDay.endHour - scheduleDay.startHour < TimeSpan.FromMinutes(15))
                {
                    ModelState.AddModelError("Finish", "Schedule duration should be at least 15 minutes.");
                    return View(scheduleDay);
                }

                scheduleDay.Id = Guid.NewGuid();
                _context.Add(scheduleDay);
                await _context.SaveChangesAsync();

                CreateVisits(scheduleDay);

                return RedirectToAction(nameof(Index));
            }
            return View(scheduleDay);
        }

        private void CreateVisits(ScheduleDay scheduleDay)
        {
            TimeSpan visitDuration = TimeSpan.FromMinutes(15);
            DateTime currentDateTime = scheduleDay.startHour;

            var doctor = _context.Doctor.Find(scheduleDay.doctorId);
            while (currentDateTime < scheduleDay.endHour)
            {
                Visit visit = new Visit
                {
                    doctor = doctor,
                    dateTime = scheduleDay.day.Date + currentDateTime.TimeOfDay
                };

                _context.Add(visit);
                currentDateTime = currentDateTime.Add(visitDuration);
            }
            _context.SaveChanges();
        }

        /*
        // GET: ScheduleDays/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.ScheduleDay == null)
            {
                return NotFound();
            }

            var scheduleDay = await _context.ScheduleDay.FindAsync(id);
            if (scheduleDay == null)
            {
                return NotFound();
            }
            return View(scheduleDay);
        }

        // POST: ScheduleDays/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,day,startHour,endHour")] ScheduleDay scheduleDay)
        {
            if (id != scheduleDay.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(scheduleDay);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ScheduleDayExists(scheduleDay.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(scheduleDay);
        }

        // GET: ScheduleDays/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.ScheduleDay == null)
            {
                return NotFound();
            }

            var scheduleDay = await _context.ScheduleDay
                .FirstOrDefaultAsync(m => m.Id == id);
            if (scheduleDay == null)
            {
                return NotFound();
            }

            return View(scheduleDay);
        }

        // POST: ScheduleDays/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.ScheduleDay == null)
            {
                return Problem("Entity set 'ClinicContext.ScheduleDay'  is null.");
            }
            var scheduleDay = await _context.ScheduleDay.FindAsync(id);
            if (scheduleDay != null)
            {
                _context.ScheduleDay.Remove(scheduleDay);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ScheduleDayExists(Guid id)
        {
            return (_context.ScheduleDay?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        */
    }
}
