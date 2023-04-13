import { AppDispatch } from "./../store";
import { issuesSlice } from "./issues-slice";
import { DropResult } from "react-beautiful-dnd";
import { IIssuesState, IIssue } from "./../../types/IIssue";
import axios from "axios";

type IssueStatus = "open" | "process" | "closed";

export const issuesDnd = (result: DropResult, issues: IIssuesState) => {
  return (dispatch: AppDispatch) => {
    if (!result.destination) return;
    let dndBoard = issues;
    const storageKey: string = `${dndBoard.user}${dndBoard.project}`;

    const { source, destination } = result;
    const sourceColumn = dndBoard[source.droppableId as IssueStatus];
    const sourceItems = [...sourceColumn];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      const destinationColumn =
        dndBoard[destination.droppableId as IssueStatus];
      const destinationItems = [...destinationColumn];
      destinationItems.splice(destination.index, 0, removed);
      dndBoard = {
        ...dndBoard,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      };
      dispatch(issuesSlice.actions.dndIssues(dndBoard));
      localStorage.setItem(storageKey, JSON.stringify(dndBoard));
    } else {
      sourceItems.splice(destination.index, 0, removed);
      dndBoard = { ...dndBoard, [source.droppableId]: sourceItems };
      dispatch(issuesSlice.actions.dndIssues(dndBoard));
      localStorage.setItem(storageKey, JSON.stringify(dndBoard));
    }
  };
};

export const fetchIssues = (url: string) => {
  const search = url.split("/").reverse();
  const name = search[1];
  const project = search[0];
  const path = `https://api.github.com/repos/${name}/${project}/issues`;
  const storageKey = `${name}${project}`;
  const prevSave = localStorage.getItem(storageKey) || "{}";
  const storageIssues = JSON.parse(prevSave);

  return async (dispatch: AppDispatch) => {
    if (prevSave !== "{}") {
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
