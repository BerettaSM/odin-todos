import { type Todo } from './todo';

export interface SubmittedProject {
  title: string;
}

export interface Project extends SubmittedProject {
  id: string;
  todos: Todo[];
}
