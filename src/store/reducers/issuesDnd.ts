import { AppDispatch } from "./../store";
import { issuesSlice } from "./issuesSlice";
import { DropResult } from "react-beautiful-dnd";
import { Data } from "./../../types/IIssue";

type IssueStatus = "open" | "process" | "closed";

export const issuesDnd: any = (result: DropResult, issues: Data) => {
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
