import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/data";
import { signupUser, loginUser, logoutUser, updateProfile } from "./authThunk";

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  message: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: state => {
      state.message = null;
    },
    clearError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    /* SIGNUP */
    builder.addCase(signupUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user!;
      state.message = action.payload.message;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* LOGIN */
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user!;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* UPDATE PROFILE */
    builder.addCase(updateProfile.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user!;
      state.message = action.payload.message;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /* LOGOUT */
    builder.addCase(logoutUser.fulfilled, state => {
      state.user = null;
      state.message = "Logged out successfully";
    });
  }
});

export const { clearMessage, clearError } = authSlice.actions;

export default authSlice.reducer;
