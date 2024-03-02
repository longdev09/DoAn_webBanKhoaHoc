import routesConfig from "~/config/routesConfig";
import MentorDashboards from "~/pageMetor/Dashboards";
import CreateCourse_GioiThieu from "~/pageMetor/CreateCourse/TaoKhoaHoc/CreateCourse_GioiThieu";
import CreateCourse_ChuongTrinhGiangDay from "~/pageMetor/CreateCourse/TaoKhoaHoc/CreateCourse_ChuongTrinhGiangDay";
import MentorManageCourse from "~/pageMetor/MentorManageCourse";
import CreateCourse_Price from "~/pageMetor/CreateCourse/TaoKhoaHoc/CreateCourse_Price";
import MentorManageDiscount from "~/pageMetor/MentorManageDiscount";
import LoginMentor from "~/pageMetor/LoginMentor";
import RegisterMentor from "~/pageMetor/RegisterMentor";
import InfoMentor from "~/pageMetor/InfoMentor";

/// hoc vien
import Search from "~/page/Search";
import DetailCourse from "~/page/DetailCourse";
import DetailCart from "~/page/DetailCart";
import DetailMyCourse from "~/page/DetailMyCourse";
import Learning from "~/page/Learning";
import LoginUser from "~/page/LoginUser";
import RegisterUser from "~/page/RegisterUser";
import Payment from "~/page/Payment";
import Home from "~/page/Home";
import Bill from "~/page/Bill";
import SettingUser from "~/page/SettingUser";
import PaySucces from "~/page/PaySucces";

// admin
import AdminDashboard from "~/pageAdmin/Dashborads";
import AdminLogin from "~/pageAdmin/Login";
import AdminManageCourse from "~/pageAdmin/AdminManageCourse";
import AdminDetailCourse from "~/pageAdmin/AdminDetailCourse";
import AdminManageCategory from "~/pageAdmin/AdminManageCategory";
import AdminManageUsers from "~/pageAdmin/AdminManagaUser";
import AdminHoaDon from "~/pageAdmin/AdminHoaDon";
import AdminManagaEvaluate from "~/pageAdmin/AdminManagaEvaluate";
// chua cac tuyen duong
const publicRoutes = [
  { path: routesConfig.search, component: Search },
  { path: routesConfig.payment, component: Payment, layout: null },
  { path: routesConfig.registerUser, component: RegisterUser, layout: null },
  { path: routesConfig.loginUser, component: LoginUser, layout: null },
  { path: routesConfig.learning, component: Learning, layout: null },
  { path: routesConfig.detailMyCourse, component: DetailMyCourse },
  { path: routesConfig.detailCart, component: DetailCart },
  { path: routesConfig.detailCourse, component: DetailCourse },
  { path: routesConfig.bill, component: Bill },
  { path: routesConfig.home, component: Home },
  { path: routesConfig.setting, component: SettingUser },
];

// mentor
const publicRoutesMentor = [
  {
    path: routesConfig.mentorInfo,
    component: InfoMentor,
  },
  {
    path: routesConfig.mentorManageCourse,
    component: MentorManageCourse,
  },
  {
    path: routesConfig.mentorDashboards,
    component: MentorDashboards,
  },
  {
    path: routesConfig.mentorCreateCourse_GioiThieu,
    component: CreateCourse_GioiThieu,
  },
  {
    path: routesConfig.mentorCreateCourse_ChuongTrinhHoc,
    component: CreateCourse_ChuongTrinhGiangDay,
  },
  {
    path: routesConfig.mentorCreateCourse_Price,
    component: CreateCourse_Price,
  },
  {
    path: routesConfig.mentorManageDiscount,
    component: MentorManageDiscount,
  },
  {
    path: routesConfig.mentorLogin,
    component: LoginMentor,
    layout: null,
  },
  {
    path: routesConfig.mentorRegister,
    component: RegisterMentor,
    layout: null,
  },
  {
    path: routesConfig.paySucces,
    component: PaySucces,
    layout: null,
  },
];

// admin

const publicRoutesAdmin = [
  {
    path: routesConfig.adminDashboard,
    component: AdminDashboard,
  },
  {
    path: routesConfig.adminManageCourse,
    component: AdminManageCourse,
  },
  {
    path: routesConfig.adminLogin,
    component: AdminLogin,
    layout: null,
  },
  {
    path: routesConfig.adminDetailCourse,
    component: AdminDetailCourse,
    layout: null,
  },
  {
    path: routesConfig.adminManageCategory,
    component: AdminManageCategory,
  },

  {
    path: routesConfig.adminManageUser,
    component: AdminManageUsers,
  },
  {
    path: routesConfig.adminHoaDon,
    component: AdminHoaDon,
  },
  {
    path: routesConfig.adminDanhGia,
    component: AdminManagaEvaluate,
  },
];

export { publicRoutes, publicRoutesMentor, publicRoutesAdmin };
