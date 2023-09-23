import axios from "axios";
import urlData from "../../assets/url.json";

let url = urlData.url;

const API = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "WWW-Authenticate": "Bearer",
    "ngrok-skip-browser-warning": "true",
    "Access-Control-Allow-Origin": "*",
  },
});

export const updateAPIBaseURL = (newURL) => {
  API.defaults.baseURL = newURL;
  console.log(API.defaults.baseURL);
  localStorage.setItem("customURL", newURL);
};

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

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      await refreshToken();
      const config = error.config;
      config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
        "accessToken"
      )}`;
      return API(config);
    }
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.data.detail === "Incorrect username or password"
    ) {
      const clearAuthEvent = new Event("clearAuth");
      window.dispatchEvent(clearAuthEvent);
    }
    if (error.message === "Network Error") {
      console.log("Network Error: Log out");
      const clearAuthEvent = new Event("clearAuth");
      window.dispatchEvent(clearAuthEvent);
    }
  }
);

export const login = async (email, password) => {
  const body = {
    email,
    password,
  };
  const response = await API.post("/api/v1/token", body);
  return response;
};

export const register = async (fullName, email, password) => {
  const body = {
    full_name: fullName,
    email,
    password,
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
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.get(`/api/v1/plants/${plantId}`);
  return response;
};

export const getDevices = async () => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.get("/api/v1/devices/");
  return response;
};

export const getPlants = async () => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.get("/api/v1/plants/");
  return response;
};

export const createNewPlant = async (payload) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.post("/api/v1/plants/new-plant", payload);
  return response;
};

export const createNewDevice = async (payload) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.post("/api/v1/devices/create-new-device", payload);
  return response;
};
export const deleteAccount = async (password) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const body = {
    user_token: sessionStorage.getItem("accessToken"),
    password: password,
  };
  const response = await API.delete(`/api/v1/users/active-user-delete`, body);
  return response;
};

export const deletePlant = async (plantId) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.delete(`/api/v1/plants/${plantId}`);
  return response;
};

export const deleteDevice = async (deviceId) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.delete(`/api/v1/devices/${deviceId}`);
  return response;
};

export const getPlantHistoryByLimit = async (plantId, limit) => {
  setAuthToken(sessionStorage.getItem("accessToken"));
  const response = await API.get(`/api/v1/hist-plants/get-by-limit/12?limit=5`);
  return response;
};

export const getPlantHistoryByDate = async (
  plantId,
  startDate,
  endDate = null
) => {
  setAuthToken(sessionStorage.getItem("accessToken"));

  let endpoint = `/api/v1/hist-plants/get-by-date/${plantId}?start_date=${startDate}`;

  if (endDate) {
    endpoint += `&end_date=${endDate}`;
  }

  const response = await API.get(endpoint);
  return response;
};

export const resetPassword = async (email, password) => {
  console.log("Not implemented yet");
};

export const changePassword = async (password) => {
  const body = {
    token: localStorage.getItem("accessToken"),
    new_password: password,
  };
  const response = await API.post("/api/v1/reset-password", body);
  return response;
};

export const requestPasswordReset = async (email) => {
  const body = {
    user_email: email,
  };
  const response = await API.post("/api/v1/recover-password", body);
  return response;
};
