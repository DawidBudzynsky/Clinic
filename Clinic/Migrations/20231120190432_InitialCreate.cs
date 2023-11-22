using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Clinic.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleDay_Doctor_doctorId",
                table: "ScheduleDay");

            migrationBuilder.DropIndex(
                name: "IX_ScheduleDay_doctorId",
                table: "ScheduleDay");

            migrationBuilder.RenameColumn(
                name: "doctorId",
                table: "ScheduleDay",
                newName: "doctor");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "doctor",
                table: "ScheduleDay",
                newName: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleDay_doctorId",
                table: "ScheduleDay",
                column: "doctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleDay_Doctor_doctorId",
                table: "ScheduleDay",
                column: "doctorId",
                principalTable: "Doctor",
                principalColumn: "Id");
        }
    }
}
