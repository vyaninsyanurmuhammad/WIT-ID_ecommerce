import { createSlice } from "@reduxjs/toolkit";
import { dashboardInitialState } from "./dashboard.state";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardInitialState,
  reducers: {},
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
