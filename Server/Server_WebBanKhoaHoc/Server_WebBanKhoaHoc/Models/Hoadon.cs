using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Hoadon
    {
        public Hoadon()
        {
            Cthds = new HashSet<Cthd>();
        }

        public string MaHd { get; set; }
        public string MaPt { get; set; }
        public string MaHv { get; set; }
        public double? TongTien { get; set; }
        public DateTime? NgayThanhToan { get; set; }

        public virtual HocVien MaHvNavigation { get; set; }
        public virtual Ptthanhtoan MaPtNavigation { get; set; }
        public virtual ICollection<Cthd> Cthds { get; set; }
    }
}
