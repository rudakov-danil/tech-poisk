import { createSlice } from "@reduxjs/toolkit";

const initialState: { name: string } = {
  name: "",
};

export const currentPageForFooterSlice = createSlice({
  name: "currentPageForFooterSlice",
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeCurrentPage } = currentPageForFooterSlice.actions;
export default currentPageForFooterSlice.reducer;
