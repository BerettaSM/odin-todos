import { type Todo, type SubmittedTodo } from '../domain';
import { type ProjectRepository } from '../repositories';
import { ObjectNotFoundError } from '../errors';

export class TodoService {
  constructor(private repo: ProjectRepository) {}

  save(todo: SubmittedTodo | Todo) {
    const project = this.repo.findById(todo.projectId);

    let savedTodo: Todo;

    if ('id' in todo) {
      const foundTodoIndex = project.todos.findIndex((t) => t.id === todo.id);
      if (foundTodoIndex === -1) {
        throw new ObjectNotFoundError(
          `Todo with id "${todo.id}" does not exist.`,
        );
      }
      project.todos.splice(foundTodoIndex, 1, todo);
      savedTodo = todo;
    } else {
      const newTodo: Todo = {
        ...todo,
        id: crypto.randomUUID(),
        done: false,
      };
      project.todos.push(newTodo);
      savedTodo = newTodo;
    }

    savedTodo.date = new Date(savedTodo.date).toUTCString();

    this.repo.save(project);

    return savedTodo;
  }

  findAll() {
    return this.repo.findAll().flatMap((project) => project.todos);
  }

  findById(id: string) {
    const foundTodo = this.findAll().find((t) => t.id === id);
    if (!foundTodo) {
      throw new ObjectNotFoundError(`Todo with id "${id}" does not exist.`);
    }
    return foundTodo;
  }

  deleteById(id: string) {
    const foundTodo = this.findById(id);
    const project = this.repo.findById(foundTodo.projectId);
    const todoIndex = project.todos.findIndex((todo) => todo === foundTodo);
    project.todos.splice(todoIndex, 1);
    this.repo.save(project);
  }
}
