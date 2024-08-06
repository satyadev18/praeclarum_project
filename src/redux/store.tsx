import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./slice/eventSlice";

const store = configureStore({
  reducer: {
    eventSlice,
  },
});

export default store;
