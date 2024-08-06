import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state: any, action) {
      state.events.push(action.payload);
    },
    updateEvent(state: any, action) {
      const { id } = action.payload;
      state.events[id] = action.payload;
    },
    deleteEvent(state: any, action) {
      state.events = state.events.filter(
        (event: any) => event.id !== action.payload
      );
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export const getEventList = (state: any) => state.eventSlice.events;
export default eventsSlice.reducer;
