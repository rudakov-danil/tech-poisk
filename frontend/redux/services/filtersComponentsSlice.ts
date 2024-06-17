import { createSlice } from "@reduxjs/toolkit";

const lsStore =
  typeof window !== "undefined"
    ? JSON.parse(
        String(localStorage.getItem("filtersInSearchComponents")) || ""
      ) || []
    : [];
const initialState: any =
  lsStore.length === 0
    ? {
        motherboard: [],
        processor: [],
        ram: [],
        "hdd,ssd": [],
        gpu: [],
        power_supply: [],
        case: [],
        "cooler,liquid_cooling,case_fans": [],
      }
    : lsStore;

export const filtersComponentsSlice = createSlice({
  name: "filtersComponentsSlice",
  initialState,
  reducers: {
    addFilterToStore(state, action) {
      const { searchTableName, value, slug } = action.payload;

      if (state[searchTableName]) {
        state[searchTableName].push([slug, value]);
      }

      localStorage.setItem(
        "filtersInSearchComponents",
        JSON.stringify({ ...state })
      );
    },
    removeFilter(state, action) {
      const { searchTableName, value } = action.payload;
      if (state[searchTableName]) {
        state[searchTableName] = state[searchTableName].filter(
          (filter: any) => filter[1] !== value
        );
      }
      localStorage.setItem(
        "filtersInSearchComponents",
        JSON.stringify({ ...state })
      );
    },
    resetFilters(state) {
      state.motherboard = [];
      state.processor = [];
      state.ram = [];
      state["hdd,ssd"] = [];
      state.gpu = [];
      state.power_supply = [];
      state.case = [];
      state["cooler,liquid_cooling,case_fans"] = [];
      localStorage.setItem(
        "filtersInSearchComponents",
        JSON.stringify({ ...state })
      );
    },
  },
});

export const { addFilterToStore, removeFilter, resetFilters } =
  filtersComponentsSlice.actions;
export default filtersComponentsSlice.reducer;
