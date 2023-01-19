import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerService, signinService } from "../actions/authActions";

// Get user from localstorage
let userData = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userData || null,
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
  errors: "",
};

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      let response = await registerService(user);
      if (response && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data.data;
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

// Login
export const signin = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      let response = await signinService(user);
      if (response && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data.data;
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

export const signout = createAsyncThunk("auth/signout", (_, thunkAPI) => {
  //setTimeout(() => {
  localStorage.removeItem("user");
  return true;
  //},2000);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSucces = false;
      state.message = "";
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.errors = "";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.errors = "";
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
        state.user = null;
      })
      // .addCase(signout.pending, (state) => {
      //     state.isLoading = true;
      // })
      .addCase(signout.fulfilled, (state) => {
        // state.isLoading = false;
        // state.isSucces = true;
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = userSlice.actions;

export default userSlice.reducer;
