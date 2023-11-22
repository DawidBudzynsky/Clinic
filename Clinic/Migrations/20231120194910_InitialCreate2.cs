using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Clinic.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Doctor_DoctorId",
                table: "Visit");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Visit",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "DoctorId",
                table: "Visit",
                newName: "doctorId");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Visit",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Visit",
                newName: "dateTime");

            migrationBuilder.RenameIndex(
                name: "IX_Visit_DoctorId",
                table: "Visit",
                newName: "IX_Visit_doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Visit_userId",
                table: "Visit",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Doctor_doctorId",
                table: "Visit",
                column: "doctorId",
                principalTable: "Doctor",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_User_userId",
                table: "Visit",
                column: "userId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Doctor_doctorId",
                table: "Visit");

            migrationBuilder.DropForeignKey(
                name: "FK_Visit_User_userId",
                table: "Visit");

            migrationBuilder.DropIndex(
                name: "IX_Visit_userId",
                table: "Visit");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Visit",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "doctorId",
                table: "Visit",
                newName: "DoctorId");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Visit",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "dateTime",
                table: "Visit",
                newName: "DateTime");

            migrationBuilder.RenameIndex(
                name: "IX_Visit_doctorId",
                table: "Visit",
                newName: "IX_Visit_DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Doctor_DoctorId",
                table: "Visit",
                column: "DoctorId",
                principalTable: "Doctor",
                principalColumn: "Id");
        }
    }
}
