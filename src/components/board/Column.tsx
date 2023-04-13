import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { IIssue } from "../../types/IIssue";

import Card from "../board/Card";

type Status = "open" | "process" | "closed";

interface ColumnProps {
  issues: IIssue[];
  status: Status;
}

const Column: FC<ColumnProps> = ({ issues, status }) => {
  const columnColor =
    status === "open" ? "blue" : status === "process" ? "yellow" : "green";

  return (
    <div className="column">
      <div className="flex-container title h-14">{status}</div>
      <Droppable droppableId={status}>
        {(provided) => (
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
