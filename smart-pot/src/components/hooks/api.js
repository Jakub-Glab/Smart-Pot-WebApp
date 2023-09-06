import axios from "axios";
import urlData from "../../assets/url.json";

const API = axios.create({
  baseURL: urlData.url,
  headers: {
    "Content-Type": "application/json",
    "WWW-Authenticate": "Bearer",
    "ngrok-skip-browser-warning": "true",
    "Access-Control-Allow-Origin": "*",
  },
});

const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const body = {
    refresh_token: refreshToken,
  };
  const response = await API.post("/api/v1/token/refresh", body);
  localStorage.setItem("accessToken", response.data.access_token);
  localStorage.setItem("refreshToken", response.data.refresh_token);
  setAuthToken(response.data.access_token);
};

const login = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/token", body);
  return response;
};

const register = async (fullName, email, password) => {
  const body = {
    full_name: fullName,
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/registration", body);
  return response;
};

const logout = async () => {
  const response = await API.post("/api/v1/logout");
  return response;
};

const getPlantData = async (plantId) => {
  let response = await API.get(`/api/v1/plants/${plantId}`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.get(`/api/v1/plants/${plantId}`);
  }
  return response;
};

// Exporting as named exports
export {
  setAuthToken,
  removeAuthToken,
  login,
  logout,
  register,
  getPlantData,
  refreshToken,
};
