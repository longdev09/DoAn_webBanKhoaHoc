using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class KhoaHocGiamGium
    {
        public string MaGg { get; set; }
        public string Makh { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }

        public virtual GiamGium MaGgNavigation { get; set; }
        public virtual KhoaHoc MakhNavigation { get; set; }
    }
}
