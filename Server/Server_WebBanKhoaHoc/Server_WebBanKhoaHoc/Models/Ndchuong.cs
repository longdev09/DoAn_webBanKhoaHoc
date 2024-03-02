using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class Ndchuong
    {
        public string MaNd { get; set; }
        public string MaCh { get; set; }
        public string TenNd { get; set; }
        public string MoTa { get; set; }
        public string Video { get; set; }
        public int? Stt { get; set; }

        public virtual ChuongKh MaChNavigation { get; set; }
    }
}
