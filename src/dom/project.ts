import { type Project } from '../app/domain';
import { ElementConfig } from '../types';

import { classifyTodos } from '../utils';
import { createElement } from './helper';
import { createEmptyTodoSectionElement, createTodoElement } from './todo';

export function createProjectElement(project: Project) {
  const todoSections = classifyTodos(project.todos);

  const actionButtonsDescriptions = [
    {
      tag: 'button',
      properties: {
        class: 'icon-button',
        'aria-label': 'Add project',
        'data-action': 'add-todo',
        'data-project-id': project.id,
      },
      children: [
        {
          tag: 'i',
          properties: {
            class: 'fa-solid fa-plus fa-lg icon',
          },
        },
      ],
    },
    {
      tag: 'button',
      properties: {
        class: 'icon-button',
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
  ].slice(0, project.id !== '@DEFAULT_PROJECT' ? 2 : 1) as ElementConfig[];

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
            children: actionButtonsDescriptions,
          },
        ],
      },
      {
        tag: 'div',
        properties: {
          class: 'todo-sections',
        },
        children:
          project.todos.length !== 0
            ? todoSections.map(({ title, todos }) => {
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
              })
            : [createEmptyTodoSectionElement(project.id)],
      },
    ],
  });
}
