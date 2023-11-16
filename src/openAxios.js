import axios from "axios";

export const OpenFetch = axios.create({
  baseURL: "https://api.carrotsuite.space/",
  // baseURL: "http://localhost:5000/api/v1/",
});

// export const MainApi = axios.create({
//   baseURL: "https://api.carrotsuite.space/api/v1/",
//   headers: {
//     Authorization:
//       "Bearer " + cJSON.parse(localStorage.getItem("auth")).userData.token,
//   },
// });
