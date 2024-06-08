import '../styles/global.css';
import '../components';

import { type SubmittedTodo, type SubmittedProject } from './domain';

import { ModalDialog, Backdrop } from '../components';
import { LocalStorageProjectRepository } from './repositories';
import { ProjectService, TodoService } from './services';
import { ProjectController } from './controllers';
import { createElement } from '../dom';
import { updateLocalDateInput } from '../utils/dom';
import { ValidationError } from './errors';

{
  let shouldRepopulateProjects = true;

  const controlledNode = document.querySelector('main.main') as HTMLElement;
  const repo = new LocalStorageProjectRepository();
  const projectService = new ProjectService(repo);
  const todoService = new TodoService(repo);
  const controller = new ProjectController(
    projectService,
    todoService,
    controlledNode,
  );

  const backdrop = document.getElementById('backdrop') as Backdrop;

  const addTodoButton = document.getElementById(
    'add-todo-action',
  ) as HTMLButtonElement;
  const addTodoModal = document.getElementById(
    'add-todo-dialog',
  ) as ModalDialog;
  const projectDueDateInput = addTodoModal.querySelector(
    'input#todo-due-date',
  ) as HTMLInputElement;
  const projectSelectInput = addTodoModal.querySelector(
    'select#todo-project',
  ) as HTMLSelectElement;
  const addProjectButton = document.getElementById(
    'add-project-action',
  ) as HTMLButtonElement;
  const addProjectModal = document.getElementById(
    'add-project-dialog',
  ) as ModalDialog;

  addTodoButton.addEventListener('click', () => {
    if (shouldRepopulateProjects) {
      repopulateProjectOptions();
      shouldRepopulateProjects = false;
    }
    updateLocalDateInput(projectDueDateInput, 3);
    addTodoModal.open = true;
    backdrop.open = true;
  });

  addTodoModal.addEventListener('modal-confirm', (event) => {
    const { detail: todo } = event as CustomEvent<SubmittedTodo>;

    console.log(todo);

    try {
      controller.addNewTodo(todo);
      closeOverlay();
    } catch (err) {
      if (err instanceof ValidationError) {
        addTodoModal.onValidationError(err.errors);
      } else {
        throw err;
      }
    }
  });

  addTodoModal.addEventListener('modal-cancel', () => {
    closeOverlay();
  });

  addProjectButton.addEventListener('click', () => {
    addProjectModal.open = true;
    backdrop.open = true;
  });

  addProjectModal.addEventListener('modal-confirm', (event) => {
    const { detail: project } = event as CustomEvent<SubmittedProject>;

    try {
      controller.addNewProject(project);
      shouldRepopulateProjects = true;
      closeOverlay();
    } catch (err) {
      if (err instanceof ValidationError) {
        addProjectModal.onValidationError(err.errors);
      } else {
        throw err;
      }
    }
  });

  addProjectModal.addEventListener('modal-cancel', () => {
    closeOverlay();
  });

  backdrop.addEventListener('click', () => {
    closeOverlay();
  });

  controller.renderAll();

  // =============================================================

  function closeOverlay() {
    addTodoModal.open = false;
    addProjectModal.open = false;
    backdrop.open = false;
  }

  function repopulateProjectOptions() {
    projectSelectInput.innerHTML = '';
    projectService.findAll().forEach(({ id, title }) => {
      const optionEle = createElement({
        tag: 'option',
        properties: {
          value: id,
        },
        children: title,
      });
      projectSelectInput.appendChild(optionEle);
    });
  }
}

{
  const footerYearSpan = document.getElementById('footer-year')!;
  const year = new Date().getFullYear();
  footerYearSpan.textContent = year.toString();
}
