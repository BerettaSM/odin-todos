export interface SubmittedTodo {
  title: string;
  description: string;
  date: string;
  priority: string;
  projectId: string;
}

export interface Todo extends SubmittedTodo {
  id: string;
  done: boolean;
}
