import { Data } from "./../../types/IIssue";
import { IIssue } from "../../types/IIssue";
import { issuesSlice } from "./issuesSlice";
import { AppDispatch } from "../store";
import axios from "axios";

export const fetchIssues = (url: string) => {
  const search = url.split("/").reverse();
  const name = search[1];
  const project = search[0];
  const path = `https://api.github.com/repos/${name}/${project}/issues`;
  const storageKey = `${name}${project}`;
  const json = localStorage.getItem(storageKey) || "{}";
  const storageIssues: Data = JSON.parse(json);

  return async (dispatch: AppDispatch) => {
    if (json !== "{}") {
      dispatch(issuesSlice.actions.dndIssues(storageIssues));
    } else
      try {
        dispatch(issuesSlice.actions.fetching());
        const response = await axios.get<IIssue[]>(path, {
          params: {
            state: "all",
          },
        });
        const data = {
          name,
          project,
          data: response.data,
        };
        dispatch(issuesSlice.actions.fetchSuccess(data));
      } catch (e) {
        dispatch(issuesSlice.actions.fetchError(e as Error));
      }
  };
};
