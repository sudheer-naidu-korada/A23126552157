import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notifications";

export const fetchNotifications = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.notifications;
};

export const createNotification = async (title, message) => {
  const res = await axios.post(BASE_URL, { title, message });
  return res.data;
};

export const markAsRead = async (id) => {
  const res = await axios.put(`${BASE_URL}/${id}/read`);
  return res.data;
};