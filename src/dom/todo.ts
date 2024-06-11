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
              class: 'action-button',
              'aria-label': 'See todo info',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-eye fa-lg',
                },
              },
            ],
          },
          {
            tag: 'button',
            properties: {
              class: 'action-button',
              'aria-label': 'Edit todo',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-pen-to-square fa-lg edit-icon',
                },
              },
            ],
          },
          {
            tag: 'button',
            properties: {
              class: 'action-button',
              'aria-label': 'Delete todo',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-trash fa-lg close-icon',
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
