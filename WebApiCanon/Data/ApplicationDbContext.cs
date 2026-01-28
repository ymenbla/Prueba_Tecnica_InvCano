using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;
using WebApiCanon.Features.Machines;
using WebApiCanon.Features.Productions;

namespace WebApiCanon.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<MachineItems> MachineItems { get; set; }
        public DbSet<DailyProduction> DailyProductions { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // ===== Machines =====
        //    modelBuilder.Entity<MachineItems>(entity =>
        //    {
        //        entity.HasIndex(e => e.Code)
        //              .IsUnique();

        //        entity.Property(e => e.IsActive)
        //              .HasDefaultValue(true);
        //    });

        //    // ===== DailyProduction =====
        //    modelBuilder.Entity<DailyProduction>(entity =>
        //    {
        //        entity.Property(e => e.IsActive)
        //              .HasDefaultValue(true);

        //        entity.HasOne(d => d.Machine)
        //              .WithMany(m => m.DailyProductions)
        //              .HasForeignKey(d => d.MachineId)
        //              .OnDelete(DeleteBehavior.Restrict);

        //        entity.HasIndex(d => new { d.MachineId, d.Date })
        //              .IsUnique()
        //              .HasFilter("[IsActive] = 1")
        //              .HasDatabaseName("UX_DailyProduction_ActiveMachineDate");
        //    });
        //}
    }
}
