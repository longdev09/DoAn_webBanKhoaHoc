using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class GiamGium
    {
        public GiamGium()
        {
            KhoaHocGiamGia = new HashSet<KhoaHocGiamGium>();
        }

        public string MaGg { get; set; }
        public double? PhanTramGiam { get; set; }
        public string MaGv { get; set; }

        public virtual GiangVien MaGvNavigation { get; set; }
        public virtual ICollection<KhoaHocGiamGium> KhoaHocGiamGia { get; set; }
    }
}
