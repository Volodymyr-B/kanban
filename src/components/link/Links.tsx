import { useAppSelector } from "../../hooks/redux-hooks";

const Links = () => {
  const { user, project } = useAppSelector(
    (state) => state.issuesReducer.issues
  );
  const userUrl = `https://github.com/${user}`;
  const projectUrl = `https://github.com/${user}/${project}`;

  if (!user) return null;
  return (
    <div className="link flex gap-4 px-2 xl:px-0">
      <a href={userUrl}>{user}</a>
      <a href={projectUrl}>{project}</a>
    </div>
  );
};

export default Links;
