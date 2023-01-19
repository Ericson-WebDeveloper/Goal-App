import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import goalReducer from "./redux/goalsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
