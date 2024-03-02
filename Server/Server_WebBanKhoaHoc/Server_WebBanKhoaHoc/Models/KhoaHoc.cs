using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class KhoaHoc
    {
        public KhoaHoc()
        {
            ChuongKhs = new HashSet<ChuongKh>();
            CtGioHangs = new HashSet<CtGioHang>();
            Cthds = new HashSet<Cthd>();
            DanhGia = new HashSet<DanhGium>();
            KhoaHocDaMuas = new HashSet<KhoaHocDaMua>();
            KhoaHocGiamGia = new HashSet<KhoaHocGiamGium>();
        }

        public string MaKh { get; set; }
        public string MaGv { get; set; }
        public string MaDm { get; set; }
        public string TieuDe { get; set; }
        public double? DonGia { get; set; }
        public double? GiaDaGiam { get; set; }
        public string Mota { get; set; }
        public string KetQuaDatDuoc { get; set; }
        public string Hinh { get; set; }
        public string TrangThai { get; set; }

        public virtual DanhMucKh MaDmNavigation { get; set; }
        public virtual GiangVien MaGvNavigation { get; set; }
        public virtual ICollection<ChuongKh> ChuongKhs { get; set; }
        public virtual ICollection<CtGioHang> CtGioHangs { get; set; }
        public virtual ICollection<Cthd> Cthds { get; set; }
        public virtual ICollection<DanhGium> DanhGia { get; set; }
        public virtual ICollection<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
        public virtual ICollection<KhoaHocGiamGium> KhoaHocGiamGia { get; set; }
    }
}
