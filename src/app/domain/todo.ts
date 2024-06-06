export type TodoPriority = 'low' | 'medium' | 'high';

export interface SubmittedTodo {
  title: string;
  description: string;
  date: string;
  priority: TodoPriority;
  projectId: string;
}

export interface Todo extends SubmittedTodo {
  id: string;
  done: boolean;
}
