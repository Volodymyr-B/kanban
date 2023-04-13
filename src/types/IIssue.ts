export interface IIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  assignees: [];
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
}

export interface IIssuesState {
  user: string;
  project: string;
  open: IIssue[];
  process: IIssue[];
  closed: IIssue[];
}
