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
    [Authorize(Roles = "Admin")]
    public class DoctorsController : Controller
    {
        private readonly ClinicContext _context;

        public DoctorsController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Doctors
        public async Task<IActionResult> Index()
        {
            return _context.Doctor != null ?
                        View(await _context.Doctor.ToListAsync()) :
                        Problem("Entity set 'ClinicContext.Doctor'  is null.");
        }

        // GET: Doctors/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.Doctor == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctor
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doctor == null)
            {
                return NotFound();
            }

            return View(doctor);
        }

        // GET: Doctors/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Doctors/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Speciality,Username,FirstName,LastName,Password")] Doctor doctor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(doctor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(doctor);
        }

        // GET: Doctors/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.Doctor == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctor.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }
            return View(doctor);
        }

        // POST: Doctors/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid? id, byte[] RowVersion)
        {

            //var doctorRoleClaim = User.FindFirst(ClaimTypes.Role).ToString();

            if (id == null)
            {
                return NotFound();
            }

            var existingDoctor = await _context.Doctor.FirstOrDefaultAsync(m => m.Id == id);

            if (existingDoctor == null)
            {
                Doctor deletedDoctor = new Doctor();
                await TryUpdateModelAsync(deletedDoctor);
                ModelState.AddModelError(string.Empty,
                    "Unable to save changes. The department was deleted by another user.");
                return View(deletedDoctor);
            }

            _context.Entry(existingDoctor).Property("RowVersion").OriginalValue = RowVersion;

            if (await TryUpdateModelAsync<Doctor>(
             existingDoctor,
             "",
             s => s.Speciality, s => s.Username, s => s.FirstName, s => s.LastName, s => s.Password))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    ModelState.AddModelError(string.Empty, "Plik, który próbowałeś edytować, "
                    + "został zmodyfikowany przez innego użytkownika po uzyskaniu przez ciebie oryginalnej wartości. "
                    + "Operacja edycji została anulowana, a obecne wartości w bazie danych "
                    + "zostały wyświetlone. Jeśli nadal chcesz edytować ten rekord, kliknij "
                    + "ponownie przycisk Zapisz. W przeciwnym razie kliknij hiperłącze Powrót do listy.");
                    existingDoctor.RowVersion = (byte[])existingDoctor.RowVersion;
                    ModelState.Remove("RowVersion");

                    //return RedirectToAction("ConcurencyError");
                }
            }
            return View(existingDoctor);
        }
        // GET: Doctors/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.Doctor == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctor
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doctor == null)
            {
                return NotFound();
            }

            return View(doctor);
        }

        // POST: Doctors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.Doctor == null)
            {
                return Problem("Entity set 'ClinicContext.Doctor' is null.");
            }

            var doctor = await _context.Doctor.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            bool hasSchedules = _context.ScheduleDay.Any(s => s.doctorId == id);

            if (hasSchedules)
            {
                var allDoctorsSchedules = await _context.ScheduleDay.Where(m => m.doctorId == id).ToListAsync();
                foreach (var schedule in allDoctorsSchedules)
                {
                    _context.ScheduleDay.Remove(schedule);
                }
                var allDoctorsVisits = await _context.Visit.Include(m => m.doctor).Where(m => m.doctor.Id == id).ToListAsync();
                foreach (var visit in allDoctorsVisits)
                {
                    _context.Visit.Remove(visit);
                }
            }

            _context.Doctor.Remove(doctor);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        private bool DoctorExists(Guid id)
        {
            return (_context.Doctor?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
