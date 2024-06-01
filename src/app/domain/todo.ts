export type TodoPriority = 'low' | 'medium' | 'high';

export interface SubmittedTodo {
  title: string;
  description: string;
  date: string;
  priority: TodoPriority;
}

export interface Todo extends Omit<SubmittedTodo, 'date'> {
  date: Date;
  done?: boolean;
}
