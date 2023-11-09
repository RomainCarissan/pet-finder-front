import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Custom method to get user information
myApi.getUserInfos = function () {
  return myApi
    .get("/auth/verify")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

// Custom method for user signup
myApi.signup = function (userInfos) {
  return myApi
    .post("/auth/signup", userInfos)
    .then((response) => response)
    .catch((error) => error);
};

// Interceptor for request headers
myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken"); // Check if an authentication token is stored in localStorage
  if (!token) return request;
  request.headers.Authorization = `Bearer ${token}`; // Add the token to the 'Authorization' header
  return request;
});

export default myApi;
