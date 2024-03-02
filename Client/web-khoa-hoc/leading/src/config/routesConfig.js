const routes = {
  mentorCreateCourse_GioiThieu: "/mentor/tao-khoa-hoc",
  mentorCreateCourse_ChuongTrinhHoc:
    "/mentor/tao-khoa-hoc/chuong-trinh-hoc/:maKh",
  mentorCreateCourse_Price: "/mentor/tao-khoa-hoc/gia-khoa-hoc/:maKh",
  mentorManageDiscount: "/mentor/quan-ly-giam-gia",
  mentorDashboards: "/mentor/dashboards",
  mentorManageCourse: "/mentor/quan-ly-khoa-hoc",
  mentorLogin: "/mentor/login",
  mentorRegister: "/mentor/register",
  mentorInfo: "/mentor/info",


  // hoc vien
  paySucces: "/pay-succse",
  setting: "/setting",
  search: "/search/course/:search",
  bill: "/bill",
  payment: "/payment/course",
  registerUser: "/register/user",
  loginUser: "/login/user",
  learning: "/learning/:makhoahoc",
  detailMyCourse: "/my-course",
  detailCourse: "/course/:makhoahoc",
  detailCart: "/cart",
  home: "/",

  // admin
  adminLogin: "/admin/login",
  adminDashboard: "/admin/dashboard",
  adminManageUser: "/admin/manage-user",
  adminManageCourse: "/admin/manage-course",
  adminDetailCourse: "/admin/detailCourse/:makhoahoc",
  adminManageCategory: "/admin/manage-category",
  adminManageUser: "/admin/manage-user",
  adminHoaDon: "/admin/manage-hoa-don",
  adminDanhGia: "/admin/manage-danh-gia",

};

export default routes;
