using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Giohang
    {
        public Giohang()
        {
            CtGioHangs = new HashSet<CtGioHang>();
        }

        public string MaGh { get; set; }
        public string MaHv { get; set; }
        public double? TongTien { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual ICollection<CtGioHang> CtGioHangs { get; set; }
    }
}
