using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class GiangVien
    {
        public GiangVien()
        {
            GiamGia = new HashSet<GiamGium>();
            KhoaHocs = new HashSet<KhoaHoc>();
        }

        public string MaGv { get; set; }
        public string MaNd { get; set; }
        public string TenGv { get; set; }
        public string GioiThieu { get; set; }
        public string Hinh { get; set; }
        public DateTime? NgaySinh { get; set; }
        public string Phai { get; set; }
        public string Sdt { get; set; }
        public string Email { get; set; }
        public string LinkInfor { get; set; }
        public string CmndMacTruoc { get; set; }
        public string CmndMacSau { get; set; }

        public virtual NguoiDung MaNdNavigation { get; set; }
        public virtual ICollection<GiamGium> GiamGia { get; set; }
        public virtual ICollection<KhoaHoc> KhoaHocs { get; set; }
    }
}
