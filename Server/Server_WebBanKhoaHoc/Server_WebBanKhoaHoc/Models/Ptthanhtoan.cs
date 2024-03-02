using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Ptthanhtoan
    {
        public Ptthanhtoan()
        {
            Hoadons = new HashSet<Hoadon>();
        }

        public string MaPt { get; set; }
        public string TenPt { get; set; }

        public virtual ICollection<Hoadon> Hoadons { get; set; }
    }
}
