import { createSlice } from "@reduxjs/toolkit";
import { authApi, User } from "./authApi";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signin
      .addMatcher(authApi.endpoints.signin.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, action) => {
        // Adjust the following line if the user is nested or named differently in AuthResponse
        const user = (action.payload as any).user as User;
        state.user = user;
        console.log("✅ Signin Success Payload:", action.payload);
        // Adjust the following line if the token is nested or named differently in AuthResponse
        const token =
          (action.payload as any).data?.token_detail?.token ||
          (action.payload as any).token;
        state.token = token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userId = user?.unique_id || null;
        localStorage.setItem("token", token);
      })
      .addMatcher(authApi.endpoints.signin.matchRejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
