import { useAppDispatch } from "@/redux/hooks";
import {
  addComponent,
  removeComponent,
} from "@/redux/services/userComponentsListSlice";

const dispatch = useAppDispatch;

export function addToConfigurator(storeName: any, componentToAdd: any) {
  // @ts-ignore: Unreachable code error
  dispatch(addComponent({ data: componentToAdd, store: storeName }));
}

export function removeFromConfigurator(componentToRemove: any) {
  // @ts-ignore: Unreachable code error
  dispatch(removeComponent(componentToRemove));
}
