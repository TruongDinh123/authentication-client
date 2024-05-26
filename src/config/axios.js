import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/v1/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "4b727173ec996e7196ca3b3a90086d5e69a6f20045e4b1f65145af6b45052a13b23ac279c460170228918534c714112edc73ac85bb29599d1b818984af96762c",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("Bearer");
    const clientId = localStorage?.getItem("x-client-id");
    const refreshToken = Cookies.get("refreshToken");

    if (token) {
      config.headers["authorization"] = token;
      const tokenExpiry = jwtDecode(token).exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenExpiry - currentTime <= 30) {
        const response = await axios.post('http://localhost:4000/v1/api/refreshToken', {
          refreshToken: refreshToken
        });

        // Update the tokens in cookies
        Cookies.set("Bearer", response.data.metadata.tokens.acceessToken);
        Cookies.set("refreshToken", response.data.metadata.tokens.refreshToken);

        // Update the headers with the new access token
        config.headers["authorization"] = response.data.metadata.tokens.acceessToken;
      }
    }

    if (clientId) {
      config.headers["x-client-id"] = clientId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default axiosInstance;