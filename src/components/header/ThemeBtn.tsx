import React, { FC } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { RiMoonClearFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { themeSwitch } from "../../store/reducers/themeSlice";

const ThemeBtn: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.themeReducer);
  if (theme === null || theme === "light") {
    document.querySelector("html")?.classList.remove("dark");
  } else {
    document.querySelector("html")?.classList.add("dark");
  }
  const onToggle = () => {
    dispatch(themeSwitch());
  };

  return (
    <button
      onClick={onToggle}
      className="absolute right-0 w-16 h-8 rounded-2xl px-1 bg-gray-300 mr-2 xl:mr-0"
    >
      <div className="flex gap-1">
        <BsFillSunFill size={30} color={"#ef810e"} />
        <RiMoonClearFill size={30} color={"#1f2747"} />
      </div>
      <div className="slider"></div>
    </button>
  );
};

export default ThemeBtn;
