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
using System.Security.Claims;

namespace Clinic.Controllers
{
    public class VisitsController : Controller
    {
        private readonly ClinicContext _context;

        public VisitsController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Visits
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> Index(string speciality)
        {
            if (User.IsInRole("User"))
            {
                var isActiveClaim = User.FindFirst("isActive")?.Value;
                bool isActive = bool.TryParse(isActiveClaim, out bool isActiveValue) && isActiveValue;
                if (!isActive)
                {
                    return RedirectToAction("InactiveAccount", "Users");
                }
            }
            // Get distinct specialities from the database
            var specialities = await _context.Doctor.Select(d => d.Speciality).Distinct().ToListAsync();

            // Populate ViewBag with specialities for the dropdown
            ViewBag.Specialities = new SelectList(specialities);

            // Query all visits
            List<Visit> visits;

            if (!string.IsNullOrEmpty(speciality))
            {
                var filterSpeciality = Enum.Parse<Speciality>(speciality);

                visits = await _context.Visit
                    .Include(v => v.doctor)
                    .Where(v => v.doctor.Speciality == filterSpeciality)
                    .Where(v => v.isReserved == 0)
                    .ToListAsync();
            }
            else
            {
                visits = await _context.Visit.Include(v => v.doctor).Where(v => v.isReserved == 0).OrderBy(v => v.dateTime).ToListAsync();
            }

            return View(visits);
        }

        // GET: Visits/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Visit == null)
            {
                return NotFound();
            }

            var visit = await _context.Visit
                .FirstOrDefaultAsync(m => m.Id == id);
            if (visit == null)
            {
                return NotFound();
            }

            return View(visit);
        }

        // GET: Visits/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Visits/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,dateTime,description,isReserved")] Visit visit)
        {
            if (ModelState.IsValid)
            {
                _context.Add(visit);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(visit);
        }

        // GET: Visits/Edit/5
        [Authorize(Roles = "Doctor, User")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Visit == null)
            {
                return NotFound();
            }

            var visit = await _context.Visit.FindAsync(id);
            if (visit == null)
            {
                return NotFound();
            }
            return View(visit);
        }

        // POST: Visits/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Doctor, User")]
        public async Task<IActionResult> Edit(int? id, byte[] RowVersion)
        {
            if (id == null)
            {
                return NotFound();
            }

            var existingVisit = await _context.Visit.FirstOrDefaultAsync(m => m.Id == id);

            if (existingVisit == null)
            {
                Visit deletedVisit = new Visit();
                await TryUpdateModelAsync(deletedVisit);
                ModelState.AddModelError(string.Empty,
                    "Nie można zapisać, wizyta została już usunięta");
                return View(deletedVisit);
            }

            _context.Entry(existingVisit).Property("RowVersion").OriginalValue = RowVersion;

            if (await TryUpdateModelAsync<Visit>(
             existingVisit,
             "",
             s => s.description))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(MyVisits));
                }
                catch (DbUpdateConcurrencyException)
                {
                    ModelState.AddModelError(string.Empty, "Plik, który próbowałeś edytować, "
                    + "został zmodyfikowany przez innego użytkownika po uzyskaniu przez ciebie oryginalnej wartości. "
                    + "Operacja edycji została anulowana, a obecne wartości w bazie danych "
                    + "zostały wyświetlone. Jeśli nadal chcesz edytować ten rekord, kliknij "
                    + "ponownie przycisk Save. W przeciwnym razie kliknij hiperłącze back to list.");
                    existingVisit.RowVersion = (byte[])existingVisit.RowVersion;
                    ModelState.Remove("RowVersion");

                    //return RedirectToAction("ConcurencyError");
                }
            }
            return View(existingVisit);
        }

        // GET: Visits/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Visit == null)
            {
                return NotFound();
            }

            var visit = await _context.Visit
                .FirstOrDefaultAsync(m => m.Id == id);
            if (visit == null)
            {
                return NotFound();
            }

            return View(visit);
        }

        // POST: Visits/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Visit == null)
            {
                return Problem("Entity set 'ClinicContext.Visit'  is null.");
            }
            var visit = await _context.Visit.FindAsync(id);
            if (visit != null)
            {
                _context.Visit.Remove(visit);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(MyVisits));
        }

        private bool VisitExists(int id)
        {
            return (_context.Visit?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [Authorize(Roles = "User")]
        public async Task<IActionResult> Apply(int Id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            Guid patientId = Guid.Parse(userIdClaim.Value);

            if (!VisitExists(Id))
            {
                return NotFound();
            }

            var visit = await _context.Visit.FindAsync(Id);

            var patient = await _context.User.FindAsync(patientId);

            visit.user = patient;
            visit.isReserved = 1;
            _context.Update(visit);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        [Authorize(Roles = "User")]
        public async Task<IActionResult> Resign(int id)
        {
            if (!VisitExists(id))
            {
                return NotFound();
            }

            var existingVisit = await _context.Visit.Include(v => v.user).FirstOrDefaultAsync(m => m.Id == id);

            existingVisit.user = null;
            existingVisit.isReserved = 0;
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(MyVisits));
        }

        [Authorize(Roles = "User, Doctor")]
        public async Task<IActionResult> MyVisits()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            Guid userId = Guid.Parse(userIdClaim.Value);

            if (User.IsInRole("User"))
            {
                // For users
                return View(await _context.Visit
                    .Include(v => v.doctor)
                    .Where(v => v.user.Id == userId)
                    .ToListAsync());
            }
            else if (User.IsInRole("Doctor"))
            {
                // For doctors
                return View(await _context.Visit
                    .Include(v => v.user)
                    .Where(v => v.isReserved == 1)
                    .Where(v => v.doctor.Id == userId)
                    .ToListAsync());
            }

            return View();
        }
    }
}
