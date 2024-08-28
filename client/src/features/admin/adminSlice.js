import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// Async thunk to fetch admin panel data
export const fetchAdminPanelData = createAsyncThunk(
  "admin/fetchAdminPanelData",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAdminPanelData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  adminPanelData: {
    users: [],
    transactions: [],
    // Add more fields as needed
  },
  isLoading: false,
  isError: false,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.adminPanelData = { users: [], transactions: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPanelData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminPanelData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminPanelData = action.payload;
      })
      .addCase(fetchAdminPanelData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
