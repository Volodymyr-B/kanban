import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchIssues } from "../../store/issues-slice/issues-actions";

const Form = () => {
  const [url, setUrl] = useState<string>("");
  const dispatch = useAppDispatch();
  const issues = useAppSelector((state) => state.issuesReducer.issues);
  const checked = useRef("");

  // blocking reFetch if url dont change
  useEffect(() => {
    checked.current = url;
  }, [issues]);
  const onLoad = () => {
    if (url === checked.current) return;
    dispatch(fetchIssues(url));
  };

  return (
    <div className="px-2 xl:px-1">
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
