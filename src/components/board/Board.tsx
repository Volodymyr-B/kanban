import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { issuesDnd } from "../../store/issues-slice/issues-actions";
import Column from "../board/Column";

const Board = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, issues } = useAppSelector(
    (state) => state.issuesReducer
  );
  const onDragEnd = (result: DropResult) => {
    dispatch(issuesDnd(result, issues));
  };

  if (isLoading)
    return (
      <div className="dark:text-white">
        please wait, we loading your request
      </div>
    );
  if (error) return <div className="dark:text-white">{error}</div>;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          <Column issues={issues.open} status={"open"} />
          <Column issues={issues.process} status={"process"} />
          <Column issues={issues.closed} status={"closed"} />
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
