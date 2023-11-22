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
                    .ToListAsync();
            }
            else
            {
                visits = await _context.Visit.Include(v => v.doctor).OrderBy(v => v.dateTime).ToListAsync();
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
        public async Task<IActionResult> Edit(int id, [Bind("Id,dateTime,description,isReserved")] Visit visit)
        {
            if (id != visit.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(visit);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VisitExists(visit.Id))
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
            return View(visit);
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
            return RedirectToAction(nameof(Index));
        }

        private bool VisitExists(int id)
        {
            return (_context.Visit?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
