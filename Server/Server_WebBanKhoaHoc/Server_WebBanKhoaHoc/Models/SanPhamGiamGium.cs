using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class SanPhamGiamGium
    {
        public string MaGg { get; set; }
        public string Makh { get; set; }

        public virtual GiamGium MaGgNavigation { get; set; }
        public virtual KhoaHoc MakhNavigation { get; set; }
    }
}
