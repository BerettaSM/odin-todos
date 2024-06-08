import { type Todo } from '../app/domain';
import { getRandomNumber, randomChoice } from './helpers';

export function generateDummyTodos(qty: number) {
  const daysOffset = 15;
  const todos: Todo[] = [];

  for (let i = 0; i < qty; i++) {
    const d = new Date();
    d.setDate(d.getDate() - getRandomNumber(-daysOffset, daysOffset + 1));

    todos.push({
      id: crypto.randomUUID(),
      title: `A title ${i}`,
      priority: randomChoice(['low', 'medium', 'high']),
      description: 'Some random description',
      date: d.toUTCString(),
      projectId: '@DEFAULT_PROJECT',
      done: getRandomNumber(0, 3) === 1,
    });
  }

  return todos;
}
