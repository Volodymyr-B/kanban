import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchIssues } from "../../store/reducers/issuesLoading";

const Form: FC = () => {
  const [url, setUrl] = useState<string>("");
  const dispatch = useAppDispatch();
  const { issues } = useAppSelector((state) => state.issuesReducer);
  const checked = useRef("");
  useEffect(() => {
    checked.current = url;
  }, [issues]);
  const onLoad = () => {
    if (url === checked.current) return;
    dispatch(fetchIssues(url));
  };

  return (
    <div className="px-2 xl:px-0">
      <div className="flex justify-between">
        <input
          className="input w-8/12 md:w-9/12"
          type="text"
          placeholder="enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn  md:w-2/12" onClick={onLoad}>
          Load Issues
        </button>
      </div>
      <div className="mt-2 dark:text-white text-center md:text-left">
        Please enter URL of repository. For example:
        <strong> https://github.com/nodejs/diagnostics</strong>
      </div>
    </div>
  );
};

export default Form;
