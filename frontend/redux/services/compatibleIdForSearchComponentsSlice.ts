import { createSlice } from "@reduxjs/toolkit";

const bigObject =
  (typeof window !== "undefined" &&
    JSON.parse(String(localStorage.getItem("userCompilation")) || "")) ||
  [];
const allIds = Object.values(bigObject).flatMap((arr: any) =>
  arr.map((obj: any) => obj.id)
);

const initialState: { id: number[] } = {
  id: allIds,
};

export const compatibleIdForSearchComponentsSlice = createSlice({
  name: "compatibleIdForSearchComponentsSlice",
  initialState,
  reducers: {
    changeCurrentIds: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeCurrentIds } =
  compatibleIdForSearchComponentsSlice.actions;
export default compatibleIdForSearchComponentsSlice.reducer;
