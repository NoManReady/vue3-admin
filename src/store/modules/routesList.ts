import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

import { RoutesListStates } from "../interface";

const useRoutesList = defineStore("routesList", () => {
  const state: RoutesListStates = reactive({
    routesList: [],
    isColumnsMenuHover: false,
    isColumnsNavHover: false,
  });

  const setRoutesList = (payload: RoutesListStates["routesList"]) => {
    state.routesList = payload;
  };

  const setColumnsMenuHover = (
    payload: RoutesListStates["isColumnsMenuHover"]
  ) => {
    state.isColumnsMenuHover = payload;
  };

  const setColumnsNavHover = (
    payload: RoutesListStates["isColumnsNavHover"]
  ) => {
    state.isColumnsNavHover = payload;
  };
  return {
    ...toRefs(state),
    setRoutesList,
    setColumnsMenuHover,
    setColumnsNavHover,
  };
});

export default useRoutesList;
