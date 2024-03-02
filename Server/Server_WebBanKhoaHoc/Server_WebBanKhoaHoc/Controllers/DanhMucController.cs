using Microsoft.AspNetCore.Http;
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
    public class DanhMucController : ControllerBase
    {

        public readonly DB_QLKHOAHOCContext db;

        public DanhMucController(DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("lay-danh-sach-danh-muc")]
        public IActionResult layDanhSachDanhMuc()
        {
            var dsDanhMuc = db.DanhMucKhs.Where(t => true).ToList();
            if (dsDanhMuc == null)
            {
                return Ok(new { status = "Error" });
            }
            return Ok(dsDanhMuc);
        }

        [HttpPost]
        [Route("them-danh-muc")]
        public IActionResult themDanhMuc(string tenDanhMuc)
        {   
            DanhMucKh newDm = new DanhMucKh();
            newDm.MaDm = TaoMaTuDong.GenerateRandomCode("DM");
            newDm.TenDm = tenDanhMuc;
            db.DanhMucKhs.Add(newDm);
            db.SaveChanges();
            return Ok(new { status = "Succes", message = "Thêm danh mục thành công" });
        }

        [HttpPut]
        [Route("sua-danh-muc")]
        public IActionResult suaDanhMuc (string maDm, string tenDm)
        {
            var dm = db.DanhMucKhs.Where(t => t.MaDm == maDm).FirstOrDefault();
            dm.TenDm = tenDm;
            if(db.SaveChanges() > 0)
            {
                return Ok(new { status = "Succes", message = "Sửa danh mục thành công" });
            }
            return Ok(new { status = "Error", message = "Sửa danh mục thật bại" });
        }

     
    }
}
