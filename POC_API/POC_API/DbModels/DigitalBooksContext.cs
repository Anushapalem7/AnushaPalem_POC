using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace POC_API.DbModels
{
    public partial class DigitalBooksContext : DbContext
    {
        public DigitalBooksContext()
        {
        }

        public DigitalBooksContext(DbContextOptions<DigitalBooksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderCount> OrderCounts { get; set; }
        public virtual DbSet<PurchaseCount> PurchaseCounts { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=CTSDOTNET848;Initial Catalog=DigitalBooks;Persist Security Info=True;User ID=sa ; Password =pass@word1");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.ActiveStatus).HasMaxLength(50);

                entity.Property(e => e.Author).HasMaxLength(50);

                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.Content).HasMaxLength(500);

                entity.Property(e => e.ImagePath).HasMaxLength(50);

                entity.Property(e => e.PublishedDate).HasColumnType("date");

                entity.Property(e => e.Publisher).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.BookTitle).HasMaxLength(50);

                entity.Property(e => e.OrderDate).HasColumnType("date");

                entity.Property(e => e.PaymentType).HasMaxLength(50);
            });

            modelBuilder.Entity<OrderCount>(entity =>
            {
                entity.HasKey(e => e.OrderCount1);

                entity.ToTable("OrderCount");

                entity.Property(e => e.OrderCount1).HasColumnName("OrderCount");
            });

            modelBuilder.Entity<PurchaseCount>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("PurchaseCount");

                entity.Property(e => e.Bookid).HasColumnName("bookid");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.PurchaseCount1).HasColumnName("purchaseCount");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .HasColumnName("userName");

                entity.Property(e => e.UserTpe).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
