"use client";

import { Input } from "antd";
import React from "react";

export default function CustomInput(props) {
  const {
    placeholder,
    prefix,
    suffix,
    className,
    onChange,
    onBlur,
    value,
    error,
    type,
    disabled,
  } = props;
  return (
    <React.Fragment>
      <Input
        size="large"
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        status={error && "error"}
        type={type}
        disabled={disabled}
      />
      {error && <p className="ms-2 mb-0 mt-1 text-danger">{error}</p>}
    </React.Fragment>
  );
}
