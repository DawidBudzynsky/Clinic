﻿// <auto-generated />
using System;
using Clinic.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Clinic.Migrations
{
    [DbContext(typeof(ClinicContext))]
    [Migration("20231217193516_mysqlmigration1")]
    partial class mysqlmigration1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Clinic.Models.Doctor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<DateTime?>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp(6)");

                    b.Property<int>("Speciality")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Doctor");
                });

            modelBuilder.Entity("Clinic.Models.ScheduleDay", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("day")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("doctorId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("endHour")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("startHour")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("ScheduleDay");
                });

            modelBuilder.Entity("Clinic.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<decimal>("IsAdmin")
                        .HasColumnType("decimal(1,0)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<DateTime?>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<bool>("isActive")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Clinic.Models.Visit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("dateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("description")
                        .HasColumnType("longtext");

                    b.Property<Guid?>("doctorId")
                        .HasColumnType("char(36)");

                    b.Property<decimal>("isReserved")
                        .HasColumnType("decimal(1,0)");

                    b.Property<Guid?>("userId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("doctorId");

                    b.HasIndex("userId");

                    b.ToTable("Visit");
                });

            modelBuilder.Entity("Clinic.Models.Visit", b =>
                {
                    b.HasOne("Clinic.Models.Doctor", "doctor")
                        .WithMany("Visits")
                        .HasForeignKey("doctorId");

                    b.HasOne("Clinic.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userId");

                    b.Navigation("doctor");

                    b.Navigation("user");
                });

            modelBuilder.Entity("Clinic.Models.Doctor", b =>
                {
                    b.Navigation("Visits");
                });
#pragma warning restore 612, 618
        }
    }
}
