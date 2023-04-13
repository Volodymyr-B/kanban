# Visualizer of issues from GitHub repositories

GitHub repository issues viewer

## Functionality

1. Enter repository URL in the input on top of the page and press "Load". 
2. App loads issues for the repository using Github API.
3. App contains 3 columns:
* OPEN (all new issues)
* IN PROGRESS (opened issues with assignee)
* DONE (closed issues)
4. User able to drag-n-drop between the columns and change the order of issues.
5. Current issue position (column and order) stored between search and browser sessions. When the user loads issues for Repository1 -> Repository2 -> Repository1 he see all changes he did for Repository1.
6. User able to visit the profile of the owner of the repository and visit the repository as well by links under the input.
7. Implemented theme change button

# Technologies and libraries

* [React](https://reactjs.org)
* [Redux-Toolkit](https://redux-toolkit.js.org)
* [Typescript](https://www.typescriptlang.org)
* [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
* [React-Icons](https://react-icons.github.io/react-icons)
* [Tailwind CSS](https://tailwindcss.com)
* [Axios](https://axios-http.com)
