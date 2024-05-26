import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";

export const login = createAsyncThunk(
  "/e-learning/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.loginAUser(data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let userFromLocalStorage = null;

if (typeof window !== "undefined") {
  userFromLocalStorage = JSON.parse(localStorage?.getItem("user"));
}

const initialState = {
  user: userFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = action.error;
        state.message = "Something went wrong!";
      })
      .addCase(resetState, () => initialState);
  },
});

export const { setUser, setUserName } = userSlice.actions;

export default userSlice.reducer;
