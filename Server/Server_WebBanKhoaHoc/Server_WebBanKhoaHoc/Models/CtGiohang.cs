using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class CtGioHang
    {
        public string MaGh { get; set; }
        public string MaKh { get; set; }
        public double? DonGia { get; set; }

        public virtual Giohang MaGhNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
