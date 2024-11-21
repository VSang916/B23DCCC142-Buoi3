import React, { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large"; // Thêm thuộc tính size
  style?: CSSProperties; // Thêm style để hỗ trợ các giá trị truyền vào
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  size = "medium",
  style,
}) => {
  return (
    <button
      style={style}
      className={`btn ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
