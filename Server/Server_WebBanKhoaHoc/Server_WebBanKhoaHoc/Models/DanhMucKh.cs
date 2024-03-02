﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Server_WebBanKhoaHoc.Models
{
    public partial class DanhMucKh
    {
        public DanhMucKh()
        {
            KhoaHocs = new HashSet<KhoaHoc>();
        }

        public string MaDm { get; set; }
        public string TenDm { get; set; }

        public virtual ICollection<KhoaHoc> KhoaHocs { get; set; }
    }
}
