import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
const cx = classNames.bind(style);

export default function Menu({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={(nav) => cx("nav-item", { active: nav.isActive })}
    >
      <div className={cx("nav-link")}>
        <span className={cx("icon")}>{icon}</span>
        <span className={cx("text")}>{text}</span>
      </div>
    </NavLink>
  );
}
