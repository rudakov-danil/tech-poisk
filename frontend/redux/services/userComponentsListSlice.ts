import { createSlice } from "@reduxjs/toolkit";

export type userComponentsListState = {
  motherboard: any[];
  processor: any[];
  gpu: any[];
  ram: any[];
  cooler: any[];
  case: any[];
  hdd: any[];
  power_supply: any[];
  liquid_cooling: any[];
  case_fans: any[];
  ssd: any[];
};

const initialState: userComponentsListState = {
  motherboard: [],
  processor: [],
  gpu: [],
  ram: [],
  cooler: [],
  liquid_cooling: [],
  case_fans: [],
  case: [],
  hdd: [],
  power_supply: [],
  ssd: [],
};

export const userComponentsList = createSlice({
  name: "userComponentsList",
  initialState,
  reducers: {
    addComponent: (state: any, action: any) => {
      const filteredStores = action.payload.data.offers.filter((offer: any) => {
        return offer.store.name === action.payload.store;
      });
      const userCompilation = JSON.parse(
        String(localStorage.getItem("userCompilation"))
      );
      if (userCompilation === null) {
        localStorage.setItem(
          "userCompilation",
          JSON.stringify({
            motherboard: [],
            processor: [],
            gpu: [],
            ram: [],
            cooler: [],
            liquid_cooling: [],
            case_fans: [],
            case: [],
            hdd: [],
            power_supply: [],
            ssd: [],
          })
        );
      }
      if (
        action.payload.data.componentType === "gpu" ||
        action.payload.data.componentType === "ram" ||
        action.payload.data.componentType === "cooler" ||
        action.payload.data.componentType === "liquid_cooling" ||
        action.payload.data.componentType === "case_fans" ||
        action.payload.data.componentType === "hdd" ||
        action.payload.data.componentType === "ssd"
      ) {
        const userCompilation = JSON.parse(
          String(localStorage.getItem("userCompilation"))
        );

        let payloadDataCopy = JSON.parse(JSON.stringify(action.payload.data));
        payloadDataCopy.offers = filteredStores;

        userCompilation[payloadDataCopy.componentType]?.push(payloadDataCopy);

        localStorage.setItem(
          "userCompilation",
          JSON.stringify(userCompilation)
        );

        state[payloadDataCopy.componentType]?.push(action.payload.data);
      } else {
        const userCompilation = JSON.parse(
          String(localStorage.getItem("userCompilation"))
        );

        let payloadDataFormattedSelectedByStore = JSON.parse(
          JSON.stringify(action.payload.data)
        );
        payloadDataFormattedSelectedByStore.offers = filteredStores;

        state[payloadDataFormattedSelectedByStore.componentType] = [
          payloadDataFormattedSelectedByStore,
        ];
        userCompilation[payloadDataFormattedSelectedByStore.componentType] = [
          payloadDataFormattedSelectedByStore,
        ];
        localStorage.setItem(
          "userCompilation",
          JSON.stringify(userCompilation)
        );
      }
    },
    removeComponent: (state: any, action: any) => {
      const userCompilation = JSON.parse(
        String(localStorage.getItem("userCompilation"))
      );
      userCompilation[action.payload.component.componentType] = userCompilation[
        action.payload.component.componentType
      ]?.filter(
        (component: any) =>
          component.id !== action.payload.id &&
          component.offers[0].store.name !== action.payload.store
      );
      localStorage.setItem("userCompilation", JSON.stringify(userCompilation));
      if (state[action.payload.component.componentType].length === 0) {
        return;
      }

      state[action.payload.component.componentType] = state[
        action.payload.component.componentType
      ]?.filter(
        (component: any) =>
          component.id !== action.payload.id &&
          component.offers[0].store.name !== action.payload.store
      );
    },
  },
});

export const { addComponent, removeComponent } = userComponentsList.actions;
export default userComponentsList.reducer;
