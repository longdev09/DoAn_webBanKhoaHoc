﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.Models;
using Server_WebBanKhoaHoc.ClassSupport;
namespace Server_WebBanKhoaHoc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuongKhController : ControllerBase
    {
        public readonly DB_QLKHOAHOCContext db;

        public ChuongKhController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-chuong-kh")]
        public IActionResult laydsChuongkh(string maKh)
        {
            var dschuong = db.ChuongKhs.Where(t => t.MaKh == maKh).ToList();
            if (dschuong == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dschuong);
        }


        [HttpPost]
        [Route("them-chuong-khoa-hoc")]
        public IActionResult themChuong(string maKh , ChuongKh chuongKH)
        {
            int ?stt = 1;
            var khChuong = db.ChuongKhs.Where(t => t.MaKh == maKh).ToList();
            if(khChuong.Count > 0)
            {
                var phanTuCoSttLonNhat = khChuong.OrderByDescending(chuong => chuong.Stt).FirstOrDefault();
                stt = phanTuCoSttLonNhat.Stt + 1;
            }
            ChuongKh newChuong = new ChuongKh();
            newChuong.MaCh = TaoMaTuDong.GenerateRandomCode("CKH");
            newChuong.TenCh = chuongKH.TenCh;
            newChuong.MaKh = maKh;
            newChuong.Stt = stt;
            db.ChuongKhs.Add(newChuong);
            int check = db.SaveChanges();
            if (check > 0)
            {
                return Ok(new { status = "Succes", message = "Thêm chương thành công"});
            }
            return Ok(new { status = "Error", message = "Thêm chương thất bại" });
        }
    }
}
