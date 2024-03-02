using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class HocVien
    {
        public HocVien()
        {
            DanhGia = new HashSet<DanhGium>();
            Giohangs = new HashSet<Giohang>();
            Hoadons = new HashSet<Hoadon>();
            KhoaHocDaMuas = new HashSet<KhoaHocDaMua>();
        }

        public string MaHv { get; set; }
        public string MaNd { get; set; }
        public string TenHv { get; set; }
        public string Hinh { get; set; }
        public string DiaChi { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string Phai { get; set; }
        public string Sdt { get; set; }
        public string Email { get; set; }

        public virtual NguoiDung MaNdNavigation { get; set; }
        public virtual ICollection<DanhGium> DanhGia { get; set; }
        public virtual ICollection<Giohang> Giohangs { get; set; }
        public virtual ICollection<Hoadon> Hoadons { get; set; }
        public virtual ICollection<KhoaHocDaMua> KhoaHocDaMuas { get; set; }
    }
}
