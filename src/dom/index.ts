import { type Project, type Todo } from '../app/domain';
import { type ElementConfig } from '../types';
import { classifyTodos } from '../utils';

export function createProjectElement(project: Project) {
  const todoSections = classifyTodos(project.todos);

  return createElement({
    tag: 'article',
    properties: {
      class: 'project',
      'data-project-id': project.id,
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
            children:
              project.id !== '@DEFAULT_PROJECT'
                ? [
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
                  ]
                : undefined,
          },
        ],
      },
      {
        tag: 'div',
        properties: {
          class: 'todo-sections',
        },
        children: todoSections.map(({ title, todos }) => {
          return {
            tag: 'section',
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
                children: todos.map(createTodoElement),
              },
            ],
          };
        }),
      },
    ],
  });
}

export function createTodoElement(todo: Todo) {
  return createElement({
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
      if ('tag' in child) {
        element.appendChild(createElement(child));
      } else {
        element.appendChild(child);
      }
    }
  }
  return element;
}
