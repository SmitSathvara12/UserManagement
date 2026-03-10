import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserAPI, loginAPI } from "../api/authAPI";
import { toast } from "react-toastify";
import { handelError, handelSuccess } from "../utiles";

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      
      handelSuccess("Login successful");

      return user;
    } catch (error) {
      handelError(error?.response?.data?.message || error.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createUserAPI(data);

      const { user } = res.data;

      handelSuccess("user created successful");

      return user;
    } catch (error) {
      handelError(error?.response?.data?.message || error.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

// LOAD USER FROM TOKEN (PAGE REFRESH)
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return null;

      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    isAuthenticated: false,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      handelSuccess("Logout successful");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
