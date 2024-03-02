using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class DanhGium
    {
        public string MaDg { get; set; }
        public string MaHv { get; set; }
        public string MaKh { get; set; }
        public string NoiDung { get; set; }
        public int? SoSao { get; set; }
        public DateTime? NgayDg { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual KhoaHoc MaKhNavigation { get; set; }
    }
}
