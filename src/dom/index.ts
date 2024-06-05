import { Project, Todo } from '../app/domain';
import { type ElementConfig } from '../types';

export function createProjectElement(project: Project) {
  // TODO: Create a classify todo function to separate all todos
  //       in a project according to its due date.

  return createElement({
    tag: 'article',
    properties: {
      class: 'project',
      'project-id': project.id,
    },
    children: [
      {
        tag: 'header',
        properties: {
          class: 'project-header',
        },
        children: [
          {
            tag: 'h2',
            children: project.title,
          },
          {
            tag: 'div',
            properties: {
              class: 'project-actions',
            },
            children: [
              {
                tag: 'button',
                properties: {
                  class: 'action-button',
                  'aria-label': 'Delete project',
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
      },
      {
        tag: 'div',
        properties: {
          class: 'todo-sections',
        },
        children: [
          // Create a section here
        ],
      },
    ],
  });
}

export function createTodoElement(todo: Todo) {
  return createElement({
    tag: 'article',
    properties: {
      'todo-id': todo.id,
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
        children: todos
          ? (todos.map(createTodoElement) as unknown as ElementConfig[])
          : undefined,
      },
    ],
  });
}

export function createElement({ tag, children, properties }: ElementConfig) {
  const element = Object.entries(properties || []).reduce(
    (e, [prop, value]) => (
      typeof value === 'string' && e.setAttribute(prop, value), e
    ),
    document.createElement(tag),
  );
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    for (const child of children) {
      element.appendChild(createElement(child));
    }
  }
  return element;
}
