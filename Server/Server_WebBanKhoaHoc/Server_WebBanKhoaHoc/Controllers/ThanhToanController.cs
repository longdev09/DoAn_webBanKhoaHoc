using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server_WebBanKhoaHoc.ModelsVnPay;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Server_WebBanKhoaHoc.Models;
namespace Server_WebBanGiay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThanhToanController : ControllerBase
    {

        
        private readonly IConfiguration _configuration;
        private readonly ILogger<ThanhToanController> _logger;
        private readonly DB_QLKHOAHOCContext db;
        public ThanhToanController(IConfiguration configuration, ILogger<ThanhToanController> logger, DB_QLKHOAHOCContext db)
        {
           
            _configuration = configuration;
            _logger = logger;
            this.db = db;
        }

        [HttpPost]
        [Route("tao-thanh-toan")]
        public IActionResult taoThanhToan(long tongtien, string maHv)
        {
            string vnp_Returnurl = _configuration["VnPaySettings:vnp_Returnurl"];
            string vnp_Url = _configuration["VnPaySettings:vnp_Url"];
            string vnp_TmnCode = _configuration["VnPaySettings:vnp_TmnCode"];
            string vnp_HashSecret = _configuration["VnPaySettings:vnp_HashSecret"];
            if (string.IsNullOrEmpty(vnp_TmnCode) || string.IsNullOrEmpty(vnp_HashSecret))
            {
                _logger.LogError("Vui lòng cấu hình các tham số: vnp_TmnCode, vnp_HashSecret trong file appsettings.json");
                return BadRequest("Vui lòng cấu hình các tham số: vnp_TmnCode, vnp_HashSecret trong file appsettings.json");
            }

            OrderInfo order = new OrderInfo();
            order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
            order.Amount = tongtien; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND
            order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending" khởi tạo giao dịch chưa có IPN
            order.CreatedDate = DateTime.Now;


            VnPayLibrary vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (order.Amount * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000

            vnpay.AddRequestData("vnp_CreateDate", order.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", "192.168.56.1");
            vnpay.AddRequestData("vnp_Locale", "vn");

            vnpay.AddRequestData("vnp_OrderInfo", maHv + "," + tongtien);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other

            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", order.OrderId.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy 
            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
            //log.InfoFormat("VNPAY URL: {0}", paymentUrl);
            return Ok(new { RedirectUrl = paymentUrl });

        }

        [HttpGet]
        [Route("vnpay_return")]
        public IActionResult vnPayReturn([FromQuery] VnPayReturnModel model)
        {
            if (model.vnp_ResponseCode == "00" && model.vnp_TransactionStatus == "00")
            {
                //Thanh toan thanh cong
                return Ok(new { message = "Succes" });
            }

            return Ok(new { message = "Error" });

        }


    }
}
