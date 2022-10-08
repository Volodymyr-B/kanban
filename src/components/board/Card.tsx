import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface ICard {
  color: string;
  index: number;
  issue: {
    id: number;
    title: string;
    number: number;
    created_at: string;
    comments: number;
    user: { login: string };
  };
}

const Column: FC<ICard> = ({ issue, index, color }) => {
  const { title, number, created_at, user, comments } = issue;
  const opened: any = new Date(created_at);
  const daysPassed: number = Math.ceil((Date.now() - opened) / 86400000);
  const styles = { backgroundColor: color };

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card text-xs sm:text-base w-24 xs:w-auto">
            <div style={styles} className="card-top"></div>
            <div>{title}</div>
            <div className="text-gray-500">
              <span>#{number}</span>
              <span> opened {daysPassed} days ago</span>
              <span> by {user.login}</span>
            </div>
            <div>{comments} comments</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
