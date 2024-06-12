import { type Todo } from '../app/domain';

import { createElement } from '.';

export function createTodoElement(todo: Todo) {
  const todoEle = createElement({
    tag: 'article',
    properties: {
      'data-todo-id': todo.id,
      class: 'todo',
    },
    children: [
      {
        tag: 'input',
        properties: {
          type: 'checkbox',
          name: `checkbox-${todo.id}`,
          id: `checkbox-${todo.id}`,
          checked: todo.done ? '' : undefined,
        },
      },
      {
        tag: 'i',
        properties: {
          class: 'check-icon fa-regular fa-lg fa-circle',
        },
      },
      {
        tag: 'i',
        properties: {
          class: 'check-icon fa-regular fa-lg fa-circle-check',
        },
      },
      {
        tag: 'h4',
        properties: {
          class: 'text-overflow-ellipsis',
        },
        children: todo.title,
      },
      {
        tag: 'div',
        properties: {
          class: 'todo-actions',
        },
        children: [
          {
            tag: 'button',
            properties: {
              class: 'icon-button',
              'aria-label': 'See todo info',
              'data-todo-action': 'see-todo',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-eye fa-lg icon',
                },
              },
            ],
          },
          {
            tag: 'button',
            properties: {
              class: 'icon-button',
              'aria-label': 'Edit todo',
              'data-todo-action': 'edit-todo',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-pen-to-square fa-lg icon edit-icon',
                },
              },
            ],
          },
          {
            tag: 'button',
            properties: {
              class: 'icon-button',
              'aria-label': 'Delete todo',
              'data-todo-action': 'delete-todo',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-trash fa-lg icon close-icon',
                },
              },
            ],
          },
        ],
      },
    ],
  });
  todoEle.addEventListener('animationend', function onBlinkEnd(event) {
    const { animationName } = event as AnimationEvent;
    if (animationName !== 'blink') {
      return;
    }
    todoEle.classList.remove('blink');
  });
  return todoEle;
}

export function createTodoSectionElement(title: string, todos?: Todo[]) {
  return createElement({
    tag: 'article',
    properties: {
      class: 'todo-section',
    },
    children: [
      {
        tag: 'h3',
        children: title,
      },
      {
        tag: 'div',
        properties: {
          class: 'todos',
        },
        children: todos ? todos.map(createTodoElement) : undefined,
      },
    ],
  });
}

export function createEmptyTodoSectionElement(
  projectId: string = '@DEFAULT_PROJECT',
) {
  return createElement({
    tag: 'div',
    properties: {
      class: 'empty-todos',
    },
    children: [
      {
        tag: 'h3',
        children: 'You have no todos yet.',
      },
      {
        tag: 'p',
        children: 'Add some maybe?',
      },
      {
        tag: 'button',
        properties: {
          class: 'action-button',
          'data-action': 'add-todo',
          'data-project-id': projectId,
        },
        children: 'Click here to add',
      },
    ],
  });
}
