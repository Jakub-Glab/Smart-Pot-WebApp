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

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};

export const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const body = {
    refresh_token: refreshToken,
  };
  const response = await API.post("/api/v1/token/refresh", body);
  sessionStorage.setItem("accessToken", response.data.access_token);
  sessionStorage.setItem("refreshToken", response.data.refresh_token);
  setAuthToken(response.data.access_token);
};

export const login = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/token", body);
  return response;
};

export const register = async (fullName, email, password) => {
  const body = {
    full_name: fullName,
    email: email,
    password: password,
  };

  const response = await API.post("/api/v1/registration", body);
  return response;
};

export const logout = async () => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.post("/api/v1/logout");
  return response;
};

export const getPlantData = async (plantId) => {
  let response = await API.get(`/api/v1/plants/${plantId}`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.get(`/api/v1/plants/${plantId}`);
  }
  return response;
};

export const getDevices = async () => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.get(`/api/v1/devices/`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.get(`/api/v1/devices/`);
  }
  return response;
};

export const getPlants = async () => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.get(`/api/v1/plants/`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.get(`/api/v1/plants/`);
  }
  return response;
};

export const createNewPlant = async (payload) => {
  //console.log(payload);
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.post(`/api/v1/plants/new-plant`, payload);
  if (response.status === 401) {
    await refreshToken();
    response = await API.post(`/api/v1/plants/new-plant`, payload);
  }
  return response;
};

export const createNewDevice = async (payload) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.post(`/api/v1/devices/create-new-device`, payload);
  if (response.status === 401) {
    await refreshToken();
    response = await API.post(`/api/v1/devices/create-new-device`, payload);
  }
  return response;
};

export const deletePlant = async (plantId) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.delete(`/api/v1/plants/${plantId}`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.delete(`/api/v1/plants/${plantId}`);
  }
  return response;
};

export const deleteDevice = async (deviceId) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  let response = await API.delete(`/api/v1/devices/${deviceId}`);
  if (response.status === 401) {
    await refreshToken();
    response = await API.delete(`/api/v1/devices/${deviceId}`);
  }
  return response;
};
