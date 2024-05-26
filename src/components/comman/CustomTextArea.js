"use client";
import { Input } from "antd";

const { TextArea } = Input;

export default function CustomTextArea() {
  return <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />;
}
