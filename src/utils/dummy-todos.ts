import { type Todo } from '../app/domain';
import { getRandomNumber, randomChoice } from './helpers';

const DUMMY_TITLES = [
  'Do something nice for someone you care about',
  'Memorize a poem',
  'Watch a classic movie',
  'Watch a documentary',
  'Invest in cryptocurrency',
  'Contribute code or a monetary donation to an open-source software project',
  "Solve a Rubik's cube",
  'Bake pastries for yourself and neighbor',
  'Go see a Broadway production',
  'Write a thank you letter to an influential person in your life',
  'Invite some friends over for a game night',
  'Have a football scrimmage with some friends',
  "Text a friend you haven't talked to in a long time",
  'Organize pantry',
  'Buy a new house decoration',
  "Plan a vacation you've always wanted to take",
  'Clean out car',
  'Draw and color a Mandala',
  'Create a cookbook with favorite recipes',
  'Bake a pie with some friends',
  'Create a compost pile',
  'Take a hike at a local park',
  'Take a class at local community center that interests you',
  'Research a topic interested in',
  'Plan a trip to another country',
  'Improve touch typing',
  'Learn Express.js',
  'Learn calligraphy',
  'Have a photo session with some friends',
  'Go to the gym',
];

export function generateDummyTodos(qty: number) {
  const daysOffset = 15;
  const todos: Todo[] = [];

  for (let i = 0; i < qty; i++) {
    const d = new Date();
    d.setDate(d.getDate() - getRandomNumber(-daysOffset, daysOffset + 1));

    todos.push({
      id: crypto.randomUUID(),
      title: randomChoice(DUMMY_TITLES),
      priority: randomChoice(['low', 'medium', 'high']),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: d.toUTCString(),
      projectId: '@DEFAULT_PROJECT',
      done: getRandomNumber(0, 3) === 1,
    });
  }

  return todos;
}
