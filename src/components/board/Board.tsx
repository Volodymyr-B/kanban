import React, { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { issuesDnd } from "../../store/reducers/issuesDnd";
import Column from "../board/Column";

const Board: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, issues } = useAppSelector(
    (state) => state.issuesReducer
  );
  const onDragEnd = (result: DropResult) => {
    dispatch(issuesDnd(result, issues));
  };

  return (
    <>
      {isLoading && (
        <div className="dark:text-white">
          please wait, we loading your request
        </div>
      )}
      {error && <div className="dark:text-white">{error}</div>}
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
