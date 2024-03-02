using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Cthd
    {
        public string MaHd { get; set; }
        public string MaKh { get; set; }
        public double? DonGia { get; set; }

        public virtual Hoadon MaHdNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
