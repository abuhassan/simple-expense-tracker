import axios from "axios";

const API_URL = "http://localhost:4000/api/admin"; // Adjust the base URL as needed

// Fetch all users
const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Fetch all transactions
const getAllTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

const adminService = {
  getUsers,
  getAllTransactions,
};

export default adminService;
