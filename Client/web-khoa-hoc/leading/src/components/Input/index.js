import classNames from "classnames/bind";
import style from "./Input.module.scss";

const cx = classNames.bind(style);

export default function Input({
  label,
  pla,
  name,
  value,
  onChange,
  type,
  disabled,
  className,
}) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  const propsStyle = cx("input-w", {
    [className]: className,
  });
  return (
    <div className={cx("input")}>
      <label>{label}</label>
      <input
        className={propsStyle}
        type={type}
        placeholder={pla}
        value={value}
        name={name}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
