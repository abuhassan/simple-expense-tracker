import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      return await adminService.getUsers();
    } catch (error) {
      console.error("Error fetching users", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || " Unknown error"
      );
    }
  }
);

export const fetchAllTransactions = createAsyncThunk(
  "admin/fetchAllTransactions",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAllTransactions();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Unknown error"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    transactions: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      // eslint-disable-next-line no-undef
      Object.assign(state, initialState);
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || "Failed to fetch users";
        })
        .addCase(fetchAllTransactions.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllTransactions.fulfilled, (state, action) => {
          state.isLoading = false;
          state.transactions = action.payload;
        })
        .addCase(fetchAllTransactions.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || "Failed to fetch transactions";
        });
    },
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
