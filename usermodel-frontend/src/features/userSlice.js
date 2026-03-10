import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersAPI, updateUserAPI } from "../api/userAPI";
import { toast } from "react-toastify";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getUsersAPI(params);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateUserAPI(id, data);
      toast.success("User updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    updating: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.updating = false;
        const updatedUser = action.payload.updatedUser || action.payload;
        const index = state.users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(updateUserAsync.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;