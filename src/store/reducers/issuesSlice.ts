import { IIssue, Data } from "../../types/IIssue";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IssuesState {
  issues: {
    user: string;
    project: string;
    open: IIssue[];
    process: IIssue[];
    closed: IIssue[];
  };
  isLoading: boolean;
  error: string;
}
interface Response {
  name: string;
  project: string;
  data: IIssue[];
}

const initialState: IssuesState = {
  issues: { user: "", project: "", open: [], process: [], closed: [] },
  isLoading: false,
  error: "",
};
export const issuesSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true;
      state.issues = initialState.issues;
    },
    fetchSuccess(state, action: PayloadAction<Response>) {
      const { name, project, data } = action.payload;
      state.isLoading = false;
      state.error = "";
      state.issues.user = name;
      state.issues.project = project;
      state.issues.open = data.filter(
        (el) => el.assignees.length === 0 && el.state === "open"
      );
      state.issues.process = data.filter(
        (el) => el.assignees.length > 0 && el.state === "open"
      );
      state.issues.closed = data.filter((el) => el.state === "closed");
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.issues = initialState.issues;
      state.error = action.payload.message;
    },
    dndIssues(state, action: PayloadAction<Data>) {
      state.error = "";
      state.issues = action.payload;
    },
  },
});
// export const { fetching, fetchSuccess, fetchError, dndIssues } =
//   issuesSlice.actions;

export default issuesSlice.reducer;
