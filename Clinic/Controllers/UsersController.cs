using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Clinic.Data;
using Clinic.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Clinic.Controllers
{
    public class UsersController : Controller
    {
        private readonly ClinicContext _context;

        public UsersController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Users
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Index()
        {
            return _context.User != null ?
                        View(await _context.User.ToListAsync()) :
                        Problem("Entity set 'ClinicContext.User'  is null.");
        }

        // GET: Users/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: Users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IsAdmin,Id,Username,FirstName,LastName,Password")] User user)
        {
            var doesUserExist = await _context.User.FirstOrDefaultAsync(m => m.Username == user.Username);
            if (doesUserExist != null)
            {
                return RedirectToAction("ErrorUsernameOccupied");
            }

            if (ModelState.IsValid)
            {
                //user.Id = Guid.NewGuid()
                _context.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Users/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("IsAdmin,isActive,Id,Username,FirstName,LastName,Password")] User user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.Id))
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
            return View(user);
        }

        // GET: Users/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.User == null)
            {
                return Problem("Entity set 'ClinicContext.User'  is null.");
            }
            var user = await _context.User.FindAsync(id);
            if (user != null)
            {
                _context.User.Remove(user);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(LogOut));
        }

        private bool UserExists(Guid id)
        {
            return (_context.User?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public IActionResult LogIn()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogIn(string Username, string Password)
        {

            var user = await _context.User
                .FirstOrDefaultAsync(p => p.Username == Username);


            if (user == null || Password != user.Password)
            {
                // Check if the Doctor is logging in
                var doctor = await _context.Doctor
                    .FirstOrDefaultAsync(d => d.Username == Username && d.Password == Password);

                if (doctor == null)
                {
                    return RedirectToAction("ErrorInvalidCredentials");
                }

                var claimsDoctor = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, doctor.Username),
                    new Claim(ClaimTypes.NameIdentifier, doctor.Id.ToString()),
                    new Claim(ClaimTypes.Role, "Doctor")
                };

                var claimsDoctorIdentity = new ClaimsIdentity(
                    claimsDoctor, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsDoctorIdentity));

                return RedirectToAction("MyAccount");
                //return RedirectToAction("ErrorInvalidCredentials");
            }

            var role = (user.IsAdmin == 1) ? "Admin" : "User";

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim("isActive", user.isActive.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity));

            return RedirectToAction("MyAccount");
        }

        public async Task<IActionResult> MyAccount()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            Guid id = Guid.Parse(userIdClaim.Value);

            var user = await _context.User
                .FirstOrDefaultAsync(m => m.Id == id);

            if (user == null)
            {
                var doctor = await _context.Doctor
                .FirstOrDefaultAsync(m => m.Id == id);

                if (doctor == null)
                {
                    return NotFound();
                }

                return View(doctor);
            }

            return View(user);
        }

        public async Task<IActionResult> LogOut()
        {
            //HttpContext.Session.Remove(SessionData.SessionKeyUserId);
            //HttpContext.Session.Remove(SessionData.SessionKeyIsAdmin);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("LogIn");
        }

        // Messages
        public IActionResult ErrorUsernameOccupied()
        {
            Message info = new Message("Error", "Cannot create an account",
                "Chosen username is occupied.");
            return View("Message", info);
        }
        public IActionResult ErrorDeleteLibrarianAccount()
        {
            Message info = new Message("Error", "Cannot delete your account",
                "Librarian account cannot be deleted.");
            return View("Message", info);
        }

        public IActionResult AccessDenied()
        {
            Message info = new Message("AccesDenied", "Access has been denied",
                "You must be logged in as AdminUser");
            return View("Message", info);
        }

        public IActionResult InactiveAccount()
        {
            Message info = new Message("Inactive Account", "Access has been denied",
                "Your account must be activated by Admin");
            return View("Message", info);
        }
        public IActionResult CannotDeleteDoctorWithSchedules()
        {
            Message info = new Message("Cannot Delete Doctor", "Cannot Delete Doctor",
                "Docotr has active schedule for this week");
            return View("Message", info);
        }

        public IActionResult NotImplementedYet()
        {
            Message info = new Message("Not Implemented Yet", "Not Implemented Yet",
                "This action is not yet implemented");
            return View("Message", info);
        }

        // GET: UserController/GenerateReport
        [Authorize(Roles = "Admin")]
        public IActionResult GenerateReport()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult GenerateReport(DateTime t1, DateTime t2)
        {
            var visits = _context.Visit.Include(v => v.doctor)
            .Where(v => v.dateTime >= t1 && v.dateTime <= t2)
            .Where(v => v.isReserved == 1)
            .ToList();

            var schedules = _context.ScheduleDay
                .Where(s => s.day.Date >= t1 && s.day.Date <= t2)
                .ToList();

            var groupedVisits = visits.GroupBy(v => v.doctor.Id);

            var reportData = new List<DoctorReportViewModel>();

            foreach (var group in groupedVisits)
            {
                var doctorId = group.Key;

                var doctorUsername = group.First().doctor.Username;

                var doctorSchedule = schedules.FirstOrDefault(s => s.doctorId == doctorId);

                var scheduledTime = (doctorSchedule?.endHour - doctorSchedule?.startHour) ?? TimeSpan.Zero;

                reportData.Add(new DoctorReportViewModel
                {
                    doctorId = doctorId,
                    doctorUsername = doctorUsername,
                    scheduledTime = scheduledTime,
                    visitCount = group.Count()
                });
            }
            return View("ReportResult", reportData);
        }
    }
}
