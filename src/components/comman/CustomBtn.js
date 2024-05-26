"use client";
import { Button, Spin } from "antd";
import { useState } from "react";

export default function CustomButton(props) {
  const { title, className, type, shape, onClick, style, disabled, icon , loading} =
    props;

  const [spinLoading, setSpinLoading] = useState(false);

  const handleClick = () => {
    setSpinLoading(true); // Set spin loading to true when button is clicked
    onClick().catch(() => {
      setSpinLoading(false); // Stop loading if there is an error
    }); // Call the original onClick function
  };


  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      shape={shape}
      style={style}
      disabled={disabled}
      icon={icon}
      loading={loading}
    >
      {title}
    </button>
  );
}
