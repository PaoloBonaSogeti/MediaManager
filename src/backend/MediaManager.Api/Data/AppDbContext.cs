using MediaManager.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MediaManager.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<MediaType> MediaTypes => Set<MediaType>();
    public DbSet<MediaItem> MediaItems => Set<MediaItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MediaType>(e =>
        {
            e.HasKey(t => t.Id);
            e.Property(t => t.Name).IsRequired().HasMaxLength(50);
            e.HasIndex(t => t.Name).IsUnique();
            e.HasData(
                new MediaType { Id = 1, Name = "CD" },
                new MediaType { Id = 2, Name = "DVD" },
                new MediaType { Id = 3, Name = "BLU-RAY" },
                new MediaType { Id = 4, Name = "VHS" }
            );
        });

        modelBuilder.Entity<MediaItem>(e =>
        {
            e.HasKey(i => i.Id);
            e.Property(i => i.Id).ValueGeneratedOnAdd();
            e.Property(i => i.Title).IsRequired().HasMaxLength(200);
            e.Property(i => i.Barcode).IsRequired().HasMaxLength(100);
            e.HasOne(i => i.MediaType)
             .WithMany(t => t.MediaItems)
             .HasForeignKey(i => i.MediaTypeId)
             .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
