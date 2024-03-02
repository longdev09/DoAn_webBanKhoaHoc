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
    public class VaiTroController : ControllerBase
    {
        

        public readonly DB_QLKHOAHOCContext db;
      
        public VaiTroController (DB_QLKHOAHOCContext db)
        {
            this.db = db;
        }

        /// lay danh sach vai tro
        [HttpGet]
        [Route("lay-danh-sach-vai-tro")]
        public IActionResult layDanhSachVaiTro()
        {
            var dsVaiTro = db.VaiTros.Where(t => true).ToList();
            if(dsVaiTro == null)
            {
                return Ok( new {message = "Error"});
            }
            return Ok(dsVaiTro);
        }

        [HttpPost]
        [Route("them-vai-tro")]
        public IActionResult themVaiTro(VaiTro vaiTro)
        {
            TaoMaTuDong taoMa = new TaoMaTuDong();

            VaiTro newVaitro = new VaiTro();
            newVaitro.MaVt = TaoMaTuDong.GenerateRandomCode("VT");
            
            newVaitro.TenVt = vaiTro.TenVt;
            db.VaiTros.Add(newVaitro);
            int check = db.SaveChanges();
            if(check > 0)
            {
                return Ok(new { message = "Succes" });
            }
            return Ok(new { message = "Error" });
        }



        [HttpPut]
        [Route("sua-vai-tro")]
        public IActionResult themVaiTro(string maVt, VaiTro vaiTroUpdate)
        {
            var vaiTro = db.VaiTros.Where(t => t.MaVt == maVt).FirstOrDefault();

            if(vaiTro != null)
            {
                vaiTro.TenVt = vaiTroUpdate.TenVt;
                db.SaveChanges();
                return Ok(new { message = "Succes" });
            }    
            return Ok(new { message = "Error" });
        }



        [HttpDelete]
        [Route("xoa-vai-tro")]
        public IActionResult xoaVaiTro(string maVt)
        {
            var vaiTro = db.VaiTros.Where(t => t.MaVt == maVt).FirstOrDefault();

            if (vaiTro != null)
            {
                db.Remove(vaiTro);
                db.SaveChanges();
                return Ok(new { message = "Succes" });
            }
            return Ok(new { message = "Error" });
        }


    }
}
