import { configureStore } from "@reduxjs/toolkit";
import userComponentsListReducer from "./services/userComponentsListSlice";
import currentPageForFooterReducer from "./services/currentPageForFooterSlice";
import compatibleIdForSearchComponentsReducer from "./services/compatibleIdForSearchComponentsSlice";
import filtersComponentsReducer from "./services/filtersComponentsSlice";

export const store = configureStore({
  reducer: {
    userComponentsListReducer,
    currentPageForFooterReducer,
    compatibleIdForSearchComponentsReducer,
    filtersComponentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
