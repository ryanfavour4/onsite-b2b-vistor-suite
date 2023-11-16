import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api.carrotsuite.space/api/v1/",
  // baseURL: "http://localhost:5000/api/v1/",
});

// export const MainApi = axios.create({
//   baseURL: "https://api.carrotsuite.space/api/v1/",
//   headers: {
//     Authorization:
//       "Bearer " + cJSON.parse(localStorage.getItem("auth")).userData.token,
//   },
// });

Api.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error.response.data)
);

// Api.defaults.headers.post["Content-Type"] = "application/json;charse=UTF-8";

// Api.defaults.headers.get["Content-Type"] = "application/json;charse=UTF-8";

export const setAxiosToken = (token) => {
  // console.log(token, "the auth token");

  return Api.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
        // Accept: 'application/json',
        // 'Content-Type': 'application/json;charse=UTF-8',
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
