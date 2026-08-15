import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


const getToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (!persistRoot) return "";
  try {
    const rootData = JSON.parce(persistRoot);
    const userData = rootData.user ? JSON.parce(rootData.user) : null;
    return userData?.currentUser?.accessToken || "";
  } catch (error) {
    return "";
  }
};
export const TOKEN = getToken();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
