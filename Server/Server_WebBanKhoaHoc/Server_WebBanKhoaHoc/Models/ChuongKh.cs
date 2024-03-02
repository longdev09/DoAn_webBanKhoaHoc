using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class ChuongKh
    {
        public ChuongKh()
        {
            Ndchuongs = new HashSet<Ndchuong>();
        }

        public string MaCh { get; set; }
        public string MaKh { get; set; }
        public string TenCh { get; set; }
        public int? Stt { get; set; }

        public virtual KhoaHoc MaKhNavigation { get; set; }
        public virtual ICollection<Ndchuong> Ndchuongs { get; set; }
    }
}
