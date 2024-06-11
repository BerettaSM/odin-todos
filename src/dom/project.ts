import { type Project } from '../app/domain';

import { classifyTodos } from '../utils';
import { createElement } from './helper';
import { createTodoElement } from './todo';

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
            properties: {
              class: 'project-title',
            },
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
                        'data-project-action': 'delete-project',
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
