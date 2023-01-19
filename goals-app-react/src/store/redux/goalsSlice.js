import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGoalsService,
  getGoalsService,
  postGoalsService,
} from "../actions/goalsActions";

// Get user from localstorage

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSucces: false,
  message: "",
  errors: "",
};

// Register
export const getGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkAPI) => {
    try {
      let response = await getGoalsService();
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

export const addGoals = createAsyncThunk(
  "goal/addGoals",
  async (goals, thunkAPI) => {
    try {
      let response = await postGoalsService(goals);
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

export const removeGoal = createAsyncThunk(
  "goal/removeGoal",
  async (id, thunkAPI) => {
    try {
      await deleteGoalsService(id);
      return id;
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

export const goalSlice = createSlice({
  name: "goal",
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
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = false;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      })
      .addCase(addGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = "Goal Added";
        state.goals = [...state.goals, action.payload];
      })
      .addCase(addGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "";
        state.errors = action.payload;
      })
      .addCase(removeGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = "Goal Remove";
        state.goals = state.goals.filter((goal) => goal._id !== action.payload);
      })
      .addCase(removeGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "";
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
