import axios from "axios";

const API_URL = "/api/admin/"; // Adjust based on your API structure

const getAdminPanelData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const adminService = {
  getAdminPanelData,
};

export default adminService;
