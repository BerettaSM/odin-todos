import { type Todo } from '../app/domain';
import { type TodoClassification, type TodoClassificationTest } from '../types';

const projectTests: TodoClassificationTest[] = [
  // Tests get evaluated in order.
  {
    title: 'Completed',
    predicate: (todo) => todo.done,
    order: Number.MAX_SAFE_INTEGER,
  },
  {
    title: 'Expired',
    predicate: (todo) => !todo.done && new Date(todo.date) < new Date(),
    order: Number.MIN_SAFE_INTEGER,
  },
  {
    title: 'Today',
    predicate: (todo) =>
      new Date(todo.date).toDateString() === new Date().toDateString(),
    order: 1,
  },
  {
    // Catch-all. Should be the last test.
    title: (todo) => {
      const d = new Date(todo.date);
      return d.toLocaleDateString();
    },
    order: (todo) => new Date(todo.date).getTime(),
  },
];

export function classifyTodos(
  todos: Todo[],
  classificationTests: TodoClassificationTest[] = projectTests,
): TodoClassification[] {
  const classifications: Record<string, TodoClassification> = {};

  for (const todo of todos) {
    for (const test of classificationTests) {
      if (test.predicate && !test.predicate(todo)) {
        continue;
      }

      const title =
        typeof test.title === 'string' ? test.title : test.title(todo);

      classifications[title] = classifications[title] ?? {
        title,
        todos: [],
        order: typeof test.order === 'number' ? test.order : test.order(todo),
      };

      classifications[title].todos.push(todo);
      break;
    }
  }

  return Object.values(classifications).sort((a, b) => a.order - b.order);
}
