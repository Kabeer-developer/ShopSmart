import axios from "axios";

const API_URL = "/api/admin";

const getUsers = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`${API_URL}/users`, config);
  return res.data;
};

const deleteUser = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.delete(`${API_URL}/users/${id}`, config);
  return res.data;
};

const getStats = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`${API_URL}/stats`, config);
  return res.data;
};

export default { getUsers, deleteUser, getStats };
