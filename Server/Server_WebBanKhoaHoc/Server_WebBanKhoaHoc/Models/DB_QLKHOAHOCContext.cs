using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class DB_QLKHOAHOCContext : DbContext
    {
        public DB_QLKHOAHOCContext()
        {
        }

        public DB_QLKHOAHOCContext(DbContextOptions<DB_QLKHOAHOCContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChuongKh> ChuongKhs { get; set; }
        public virtual DbSet<CtGioHang> CtGioHangs { get; set; }
        public virtual DbSet<Cthd> Cthds { get; set; }
        public virtual DbSet<DanhGium> DanhGia { get; set; }
        public virtual DbSet<DanhMucKh> DanhMucKhs { get; set; }
        public virtual DbSet<GiamGium> GiamGia { get; set; }
        public virtual DbSet<GiangVien> GiangViens { get; set; }
        public virtual DbSet<Giohang> Giohangs { get; set; }
        public virtual DbSet<Hoadon> Hoadons { get; set; }
        public virtual DbSet<HocVien> HocViens { get; set; }
        public virtual DbSet<KhoaHoc> KhoaHocs { get; set; }
        public virtual DbSet<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
        public virtual DbSet<KhoaHocGiamGium> KhoaHocGiamGia { get; set; }
        public virtual DbSet<Ndchuong> Ndchuongs { get; set; }
        public virtual DbSet<NguoiDung> NguoiDungs { get; set; }
        public virtual DbSet<Ptthanhtoan> Ptthanhtoans { get; set; }
        public virtual DbSet<VaiTro> VaiTros { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=DB_QLKHOAHOC;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ChuongKh>(entity =>
            {
                entity.HasKey(e => e.MaCh)
                    .HasName("PK__ChuongKh__27258E0079816611");

                entity.ToTable("ChuongKh");

                entity.Property(e => e.MaCh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaCH");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaKH");

                entity.Property(e => e.TenCh)
                    .HasMaxLength(255)
                    .HasColumnName("TenCH");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.ChuongKhs)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK__ChuongKh__MaKH__5CD6CB2B");
            });

            modelBuilder.Entity<CtGioHang>(entity =>
            {
                entity.HasKey(e => new { e.MaGh, e.MaKh })
                    .HasName("PK__CT_GioHa__D557F2743825B070");

                entity.ToTable("CT_GioHang");

                entity.Property(e => e.MaGh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGH");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaKH");

                entity.HasOne(d => d.MaGhNavigation)
                    .WithMany(p => p.CtGioHangs)
                    .HasForeignKey(d => d.MaGh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CT_GioHang__MaGH__4F47C5E3");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.CtGioHangs)
                    .HasForeignKey(d => d.MaKh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CT_GioHang__MaKH__503BEA1C");
            });

            modelBuilder.Entity<Cthd>(entity =>
            {
                entity.HasKey(e => new { e.MaHd, e.MaKh })
                    .HasName("PK__CTHD__D557FA116F1E3B5C");

                entity.ToTable("CTHD");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHD");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaKH");

                entity.HasOne(d => d.MaHdNavigation)
                    .WithMany(p => p.Cthds)
                    .HasForeignKey(d => d.MaHd)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CTHD__MaHD__625A9A57");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.Cthds)
                    .HasForeignKey(d => d.MaKh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CTHD__MaKH__634EBE90");
            });

            modelBuilder.Entity<DanhGium>(entity =>
            {
                entity.HasKey(e => e.MaDg)
                    .HasName("PK__DanhGia__272586606F9B4D12");

                entity.Property(e => e.MaDg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaDG");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHV");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaKH");

                entity.Property(e => e.NgayDg)
                    .HasColumnType("date")
                    .HasColumnName("NgayDG");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.DanhGia)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK__DanhGia__MaHV__70DDC3D8");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.DanhGia)
                    .HasForeignKey(d => d.MaKh)
                    .HasConstraintName("FK__DanhGia__MaKH__71D1E811");
            });

            modelBuilder.Entity<DanhMucKh>(entity =>
            {
                entity.HasKey(e => e.MaDm)
                    .HasName("PK__DanhMucK__2725866E2E594FFB");

                entity.ToTable("DanhMucKh");

                entity.Property(e => e.MaDm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaDM");

                entity.Property(e => e.TenDm)
                    .HasMaxLength(255)
                    .HasColumnName("TenDM");
            });

            modelBuilder.Entity<GiamGium>(entity =>
            {
                entity.HasKey(e => e.MaGg)
                    .HasName("PK__GiamGia__2725AE82011D01F8");

                entity.Property(e => e.MaGg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGG");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.GiamGia)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK__GiamGia__MaGv__45BE5BA9");
            });

            modelBuilder.Entity<GiangVien>(entity =>
            {
                entity.HasKey(e => e.MaGv)
                    .HasName("PK__GiangVie__2725AEF35212396E");

                entity.ToTable("GiangVien");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGV");

                entity.Property(e => e.CmndMacSau)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CmndMacTruoc)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Hinh)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaND");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.Phai).HasMaxLength(10);

                entity.Property(e => e.Sdt)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("SDT");

                entity.Property(e => e.TenGv)
                    .HasMaxLength(255)
                    .HasColumnName("TenGV");

                entity.HasOne(d => d.MaNdNavigation)
                    .WithMany(p => p.GiangViens)
                    .HasForeignKey(d => d.MaNd)
                    .HasConstraintName("FK__GiangVien__LinkI__5165187F");
            });

            modelBuilder.Entity<Giohang>(entity =>
            {
                entity.HasKey(e => e.MaGh)
                    .HasName("PK__GIOHANG__2725AE8593E01BC1");

                entity.ToTable("GIOHANG");

                entity.Property(e => e.MaGh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGH");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHV");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.Giohangs)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK__GIOHANG__MaHV__6B24EA82");
            });

            modelBuilder.Entity<Hoadon>(entity =>
            {
                entity.HasKey(e => e.MaHd)
                    .HasName("PK__HOADON__2725A6E0BCC23953");

                entity.ToTable("HOADON");

                entity.Property(e => e.MaHd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHD");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHV");

                entity.Property(e => e.MaPt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaPT");

                entity.Property(e => e.NgayThanhToan).HasColumnType("datetime");

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.Hoadons)
                    .HasForeignKey(d => d.MaHv)
                    .HasConstraintName("FK__HOADON__MaHV__6477ECF3");

                entity.HasOne(d => d.MaPtNavigation)
                    .WithMany(p => p.Hoadons)
                    .HasForeignKey(d => d.MaPt)
                    .HasConstraintName("FK__HOADON__MaPT__656C112C");
            });

            modelBuilder.Entity<HocVien>(entity =>
            {
                entity.HasKey(e => e.MaHv)
                    .HasName("PK__HocVien__2725A6D28CB688A7");

                entity.ToTable("HocVien");

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaHV");

                entity.Property(e => e.DiaChi).HasMaxLength(255);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Hinh)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaND");

                entity.Property(e => e.NgaySinh).HasColumnType("date");

                entity.Property(e => e.Phai).HasMaxLength(10);

                entity.Property(e => e.Sdt)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("SDT");

                entity.Property(e => e.TenHv)
                    .HasMaxLength(255)
                    .HasColumnName("TenHV");

                entity.HasOne(d => d.MaNdNavigation)
                    .WithMany(p => p.HocViens)
                    .HasForeignKey(d => d.MaNd)
                    .HasConstraintName("FK__HocVien__MaND__4E88ABD4");
            });

            modelBuilder.Entity<KhoaHoc>(entity =>
            {
                entity.HasKey(e => e.MaKh)
                    .HasName("PK__KhoaHoc__2725CF1EBFC46E16");

                entity.ToTable("KhoaHoc");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaKH");

                entity.Property(e => e.Hinh)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MaDm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaDM");

                entity.Property(e => e.MaGv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGV");

                entity.Property(e => e.TieuDe).HasMaxLength(255);

                entity.Property(e => e.TrangThai).HasMaxLength(255);

                entity.HasOne(d => d.MaDmNavigation)
                    .WithMany(p => p.KhoaHocs)
                    .HasForeignKey(d => d.MaDm)
                    .HasConstraintName("FK__KhoaHoc__MaDM__5629CD9C");

                entity.HasOne(d => d.MaGvNavigation)
                    .WithMany(p => p.KhoaHocs)
                    .HasForeignKey(d => d.MaGv)
                    .HasConstraintName("FK__KhoaHoc__MaGV__571DF1D5");
            });

            modelBuilder.Entity<KhoaHocDaMua>(entity =>
            {
                entity.HasKey(e => new { e.MaKh, e.MaHv })
                    .HasName("PK__KhoaHocD__1557951D99A4EEDE");

                entity.ToTable("KhoaHocDaMua");

                entity.Property(e => e.MaKh)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MaHv)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaHvNavigation)
                    .WithMany(p => p.KhoaHocDaMuas)
                    .HasForeignKey(d => d.MaHv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__KhoaHocDaM__MaHv__367C1819");

                entity.HasOne(d => d.MaKhNavigation)
                    .WithMany(p => p.KhoaHocDaMuas)
                    .HasForeignKey(d => d.MaKh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__KhoaHocDaM__MaKh__3587F3E0");
            });

            modelBuilder.Entity<KhoaHocGiamGium>(entity =>
            {
                entity.HasKey(e => new { e.MaGg, e.Makh })
                    .HasName("PK__KhoaHocG__5557E2B3B7CB19C6");

                entity.Property(e => e.MaGg)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaGG");

                entity.Property(e => e.Makh)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NgayBatDau).HasColumnType("date");

                entity.Property(e => e.NgayKetThuc).HasColumnType("date");

                entity.HasOne(d => d.MaGgNavigation)
                    .WithMany(p => p.KhoaHocGiamGia)
                    .HasForeignKey(d => d.MaGg)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__KhoaHocGia__MaGG__489AC854");

                entity.HasOne(d => d.MakhNavigation)
                    .WithMany(p => p.KhoaHocGiamGia)
                    .HasForeignKey(d => d.Makh)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__KhoaHocGia__Makh__498EEC8D");
            });

            modelBuilder.Entity<Ndchuong>(entity =>
            {
                entity.HasKey(e => e.MaNd)
                    .HasName("PK__NDChuong__2725D724A7118762");

                entity.ToTable("NDChuong");

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaND");

                entity.Property(e => e.MaCh)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaCH");

                entity.Property(e => e.TenNd)
                    .HasMaxLength(255)
                    .HasColumnName("TenND");

                entity.HasOne(d => d.MaChNavigation)
                    .WithMany(p => p.Ndchuongs)
                    .HasForeignKey(d => d.MaCh)
                    .HasConstraintName("FK__NDChuong__MaCH__5FB337D6");
            });

            modelBuilder.Entity<NguoiDung>(entity =>
            {
                entity.HasKey(e => e.MaNd)
                    .HasName("PK__NguoiDun__2725D7241AC09079");

                entity.ToTable("NguoiDung");

                entity.HasIndex(e => e.TenDn, "UQ_TenDN")
                    .IsUnique();

                entity.Property(e => e.MaNd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaND");

                entity.Property(e => e.MaVt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaVT");

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TenDn)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TenDN");

                entity.Property(e => e.TrangThai).HasMaxLength(255);

                entity.HasOne(d => d.MaVtNavigation)
                    .WithMany(p => p.NguoiDungs)
                    .HasForeignKey(d => d.MaVt)
                    .HasConstraintName("FK__NguoiDung__MaVT__4BAC3F29");
            });

            modelBuilder.Entity<Ptthanhtoan>(entity =>
            {
                entity.HasKey(e => e.MaPt)
                    .HasName("PK__PTTHANHT__2725E7F6F77F88AD");

                entity.ToTable("PTTHANHTOAN");

                entity.Property(e => e.MaPt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaPT");

                entity.Property(e => e.TenPt)
                    .HasMaxLength(255)
                    .HasColumnName("TenPT");
            });

            modelBuilder.Entity<VaiTro>(entity =>
            {
                entity.HasKey(e => e.MaVt)
                    .HasName("PK__VaiTro__2725103E47C08244");

                entity.ToTable("VaiTro");

                entity.Property(e => e.MaVt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MaVT");

                entity.Property(e => e.TenVt)
                    .HasMaxLength(255)
                    .HasColumnName("TenVT");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
