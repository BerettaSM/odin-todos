import { type Todo } from '../app/domain';
import { type Predicate } from './helpers';

export type TodoClassification = {
  title: string;
  todos: Todo[];
  order: number;
};

export type TodoClassificationTest = {
  title: string | ((todo: Todo) => string);
  predicate?: Predicate<Todo>;
  order: number | ((todo: Todo) => number);
};
