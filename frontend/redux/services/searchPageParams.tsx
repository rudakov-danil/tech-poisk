import { createSlice } from "@reduxjs/toolkit";

export type userComponentsListState = {
  componentType: string;
  componentTypeSlug: string;
  search: string;
};

const initialState: userComponentsListState = {
  componentType: "",
  componentTypeSlug: "",
  search: "",
};

export const searchPageParams = createSlice({
  name: "searchPageParams",
  initialState,
  reducers: {
    addComponent: (state, action) => {},
    removeComponent: (state, action) => {},
  },
});

export const { addComponent, removeComponent } = searchPageParams.actions;
export default searchPageParams.reducer;
