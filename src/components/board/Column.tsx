import React, { FC } from "react";
import { IIssue } from "../../types/IIssue";
import { Droppable } from "react-beautiful-dnd";
import Card from "../board/Card";

interface IColumn {
  issues: IIssue[];
  status: string;
}

const Column: FC<IColumn> = ({ issues, status }) => {
  const columnName =
    status === "open" ? "open" : status === "process" ? "in progress" : "done";
  const columnColor =
    status === "open" ? "blue" : status === "process" ? "yellow" : "green";

  return (
    <div className="column">
      <div className="flex-container title h-14">{columnName}</div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {issues.map((el, index) => {
              return (
                <Card
                  key={el.id}
                  issue={el}
                  index={index}
                  color={columnColor}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
