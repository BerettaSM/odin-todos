import '../styles/global.css';
import '../components';

import { type SubmittedTodo, type SubmittedProject } from './domain';

import { LocalStorageProjectRepository } from './repositories';
import { ProjectService, TodoService } from './services';
import { ModalController, ProjectController } from './controllers';
import { createElement } from '../dom';
import { updateLocalDateInput } from '../utils/dom';

{
  //   let shouldRepopulateProjects = true;

  const controlledNode = document.querySelector('main.main') as HTMLElement;
  const repo = new LocalStorageProjectRepository();
  const projectService = new ProjectService(repo);
  const todoService = new TodoService(repo);
  const projectController = new ProjectController(
    projectService,
    todoService,
    controlledNode,
  );

  projectController.renderAll();

  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;
  const modalController = new ModalController(modalRoot);

  const addTodoButton = document.getElementById(
    'add-todo-action',
  ) as HTMLButtonElement;
  const addProjectButton = document.getElementById(
    'add-project-action',
  ) as HTMLButtonElement;

  addTodoButton.addEventListener('click', () => {
    modalController.renderModal({
      type: 'add-todo',
      onConfirm(payload: SubmittedTodo) {
        const todo = projectController.addNewTodo(payload);
        const ele = document.querySelector(
          `[data-todo-id="${todo.id}"]`,
        ) as HTMLElement;
        ele.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
        ele.classList.add('blink');
      },
      processInputs(input) {
        switch (input.name) {
          case 'date':
            updateLocalDateInput(input as HTMLInputElement, 3);
            break;
          case 'projectId':
            populateProjectOptions(input as HTMLInputElement);
            break;
        }
      },
    });
  });

  addProjectButton.addEventListener('click', () => {
    modalController.renderModal({
      type: 'add-project',
      onConfirm(payload: SubmittedProject) {
        const project = projectController.addNewProject(payload);
        const ele = document.querySelector(
          `[data-project-id="${project.id}"]`,
        ) as HTMLElement;
        ele.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
      },
    });
  });

  // =============================================================

  function populateProjectOptions(input: HTMLInputElement) {
    input.innerHTML = '';
    projectService.findAll().forEach(({ id, title }) => {
      const optionEle = createElement({
        tag: 'option',
        properties: {
          value: id,
        },
        children: title,
      });
      input.appendChild(optionEle);
    });
  }
}

{
  //   window.addEventListener('contextmenu', (e) => e.preventDefault());
  const footerYearSpan = document.getElementById('footer-year')!;
  const year = new Date().getFullYear();
  footerYearSpan.textContent = year.toString();
}
