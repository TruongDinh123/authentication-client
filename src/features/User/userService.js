const { default: axiosInstance } = require("@/config/axios");

const loginAUser = async (data) => {
  const res = await axiosInstance({
    url: "/login",
    method: "POST",
    data: data,
  });
  return res.data;
};

export const authService = {
  loginAUser,
};
