import { combineReducers, configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./issues-slice/issues-slice";
import themeReducer from "./theme-slice.ts/theme-slice";

const rootReducer = combineReducers({ issuesReducer, themeReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
