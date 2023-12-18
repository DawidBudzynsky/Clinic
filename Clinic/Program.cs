using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Clinic.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Clinic.Models;

var builder = WebApplication.CreateBuilder(args);

/*
builder.Services.AddDbContext<ClinicContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("ClinicContext") ?? throw new InvalidOperationException("Connection string 'ClinicContext' not found.")));
*/

var connectionString = builder.Configuration.GetConnectionString("ClinicContext");

builder.Services.AddDbContext<ClinicContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    options.EnableSensitiveDataLogging();
});


// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.LoginPath = "/Users/LogIn";
        options.AccessDeniedPath = "/Users/AccessDenied";
    });

var app = builder.Build();

// Seed the Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialiaze(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

