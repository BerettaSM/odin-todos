import { type Validations } from '../../types';
import { type SubmittedProject, type SubmittedTodo } from '../domain';
import { hasLength, isValidDate, validate } from './helpers';

const projectValidations: Validations<SubmittedProject> = {
  title: [hasLength({ min: 4 })],
};

export function validateProject(project: SubmittedProject) {
  validate(project, projectValidations);
}

const todoValidations: Validations<SubmittedTodo> = {
  title: [hasLength({ min: 4 })],
  date: [isValidDate()],
};

export function validateTodo(todo: SubmittedTodo) {
  validate(todo, todoValidations);
}
