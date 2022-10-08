import React, { FC } from "react";
import ThemeBtn from "./ThemeBtn";

const Header: FC = () => {
  return (
    <div className="flex-container relative h-14 ">
      <div className="title">kanban board</div>
      <ThemeBtn />
    </div>
  );
};

export default Header;
