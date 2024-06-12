import '../styles/global.css';
import '../components';

import { type SubmittedTodo, type SubmittedProject } from './domain';

import { LocalStorageProjectRepository } from './repositories';
import { ProjectService, TodoService } from './services';
import { ModalController, ProjectController } from './controllers';
import { createElement } from '../dom';
import { updateLocalDateInput } from '../utils/dom';

{
  const mainSection = document.querySelector('main.main') as HTMLElement;
  const repo = new LocalStorageProjectRepository();
  const projectService = new ProjectService(repo);
  const todoService = new TodoService(repo);
  const projectController = new ProjectController(
    projectService,
    todoService,
    mainSection,
  );

  projectController.renderAll();

  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;
  const modalController = new ModalController(modalRoot);

  const addProjectButton = document.getElementById(
    'add-project-action',
  ) as HTMLButtonElement;

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

  mainSection.addEventListener('click', onProjectDelete, { capture: true });

  mainSection.addEventListener('click', onTodoClick, { capture: true });

  mainSection.addEventListener('click', onTodoAction, { capture: true });

  window.addEventListener('click', onAddTodoClick, { capture: true });

  // =============================================================

  function onAddTodoClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!('action' in target.dataset && target.dataset.action === 'add-todo')) {
      return;
    }
    event.stopImmediatePropagation();

    const projectId = target.dataset.projectId ?? '@DEFAULT_PROJECT';

    modalController.renderModal({
      type: 'add-todo',
      onConfirm(payload: SubmittedTodo) {
        const todo = projectController.addNewTodo(payload);
        const ele = document.querySelector(
          `[data-todo-id="${todo.id}"]`,
        ) as HTMLElement;
        ele.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
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
            populateProjectOptions(input as HTMLInputElement, projectId);
            break;
        }
      },
    });
  }

  function onTodoAction(event: Event) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-todo-action');
    if (!action) {
      return;
    }
    event.stopImmediatePropagation();
    const todoEle = target.closest('.todo') as HTMLElement;
    const todoId = todoEle.dataset.todoId!;

    console.log({ todoId });
  }

  function onTodoClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('todo')) {
      return;
    }
    event.stopImmediatePropagation();
    const todoId = target.dataset.todoId!;

    projectController.toggleTodo(todoId);
  }

  function onProjectDelete(event: Event) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-project-action');
    if (action !== 'delete-project') {
      return;
    }
    event.stopImmediatePropagation();
    const projectEle = target.closest('.project') as HTMLElement;
    const projectId = projectEle.dataset.projectId!;
    const project = projectService.findById(projectId);
    const totalTodos = project.todos.length;

    let message = `Delete "${project.title}" project?`;
    if (totalTodos > 0) {
      const noun = totalTodos === 1 ? 'todo' : 'todos';
      message += ` A total of ${totalTodos} ${noun} will be deleted alongside it.`;
    }

    modalController.renderModal({
      type: 'delete-confirm',
      message,
      onConfirm() {
        projectController.deleteProject(projectId);
      },
    });
  }

  function populateProjectOptions(
    input: HTMLInputElement,
    selectedProjectId: string = '@DEFAULT_PROJECT',
  ) {
    input.innerHTML = '';
    projectService.findAll().forEach(({ id, title }) => {
      const optionEle = createElement({
        tag: 'option',
        properties: {
          value: id,
          selected: selectedProjectId === id ? '' : undefined,
        },
        children: title,
      });
      input.appendChild(optionEle);
    });
  }
}

{
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  const footerYearSpan = document.getElementById('footer-year')!;
  const year = new Date().getFullYear();
  footerYearSpan.textContent = year.toString();
}
