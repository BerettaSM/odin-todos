import '../styles/global.css';
import '../components';

import { type SubmittedTodo, type SubmittedProject } from './domain';

import { LocalStorageProjectRepository } from './repositories';
import { ProjectService, TodoService } from './services';
import { ModalController, ProjectController } from './controllers';
import { createElement } from '../dom';
import { updateLocalDateInput } from '../utils/dom';
import { Backdrop } from '../components';
import { throttle } from '../utils';

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
  const sidebarBackdrop = document.getElementById(
    'sidebar-backdrop',
  ) as Backdrop;
  const sidebarToggleButton = document.getElementById(
    'sidebar-toggle-button',
  ) as HTMLButtonElement;

  addProjectButton.addEventListener('click', onAddProjectClick);

  mainSection.addEventListener('click', onProjectDelete, { capture: true });

  mainSection.addEventListener('click', onTodoClick, { capture: true });

  mainSection.addEventListener('click', onTodoAction, { capture: true });

  window.addEventListener('click', onAddTodoClick, { capture: true });

  sidebarToggleButton.addEventListener('click', toggleSidebar);

  sidebarBackdrop.addEventListener('click', closeSidebar);

  window.addEventListener('resize', throttle(closeSidebar));

  // =============================================================

  function onAddProjectClick() {
    modalController.renderModal({
      type: 'add-project',
      onConfirm(payload: SubmittedProject) {
        const project = projectController.addNewProject(payload);
        closeSidebar();
        const ele = document.querySelector(
          `[data-project-id="${project.id}"]`,
        ) as HTMLElement;
        setTimeout(() => {
          ele.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center',
          });
        }, 500);
      },
    });
  }

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
        closeSidebar();
        const ele = document.querySelector(
          `[data-todo-id="${todo.id}"]`,
        ) as HTMLElement;
        setTimeout(() => {
          ele.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
          ele.classList.add('blink');
        }, 500);
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

    if (action === 'view-todo') {
      const todo = todoService.findById(todoId);
      const projectName = projectService.findById(todo.projectId).title;
      modalController.renderModal({
        type: 'view-todo',
        payload: { ...todo, projectName },
        onConfirm() {},
      });
    } else if (action === 'delete-todo') {
      modalController.renderModal({
        type: 'delete-confirm',
        message: 'Delete todo?',
        onConfirm() {
          projectController.deleteTodo(todoId);
        },
      });
    }
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

  function toggleSidebar() {
    if (document.body.classList.contains('mobile-sidebar-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function closeSidebar() {
    sidebarBackdrop.open = false;
    document.body.classList.remove('mobile-sidebar-open');
  }

  function openSidebar() {
    sidebarBackdrop.open = true;
    document.body.classList.add('mobile-sidebar-open');
  }
}

{
  //   window.addEventListener('contextmenu', (e) => e.preventDefault());
  const footerYearSpan = document.getElementById('footer-year')!;
  const year = new Date().getFullYear();
  footerYearSpan.textContent = year.toString();
}
