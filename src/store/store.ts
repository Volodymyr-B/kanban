import { combineReducers, configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./reducers/issuesSlice";
import themeReducer from "./reducers/themeSlice";
const rootReducer = combineReducers({ issuesReducer, themeReducer });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
