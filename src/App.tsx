import React from "react";
import Board from "./components/board/Board";
import Form from "./components/form/Form";
import Header from "./components/header/Header";
import Links from "./components/link/Links";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-zinc-800 duration-500 flex justify-center">
      <div className="flex flex-col gap-4 w-fit min-h-screen overflow-hidden">
        <Header />
        <Form />
        <Links />
        <Board />
      </div>
    </div>
  );
}

export default App;
