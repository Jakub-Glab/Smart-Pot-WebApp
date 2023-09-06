import axios from "axios";
import urlData from "../../assets/url.json";

const querystring = require("querystring");

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

const login = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/token", body);
  return response.data;
};

const register = async (fullName, email, password) => {
  const body = {
    full_name: fullName,
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/registration", body);
  return response.data;
};

const logout = async () => {
  const response = await API.post("/api/v1/logout");
  return response;
};

const getPlantData = async (plantId) => {
  const response = await API.get(`/api/v1/plants/${plantId}`);
  return response;
};

// Exporting as named exports
export { setAuthToken, removeAuthToken, login, logout, register, getPlantData };
