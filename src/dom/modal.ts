import { type Todo } from '../app/domain';
import { type ElementConfig, type ModalConfig } from '../types';

import { createElement } from './helper';

export function createModalContent(config: ModalConfig) {
  switch (config.type) {
    case 'add-project':
      return createAddProjectModalContent();
    case 'add-todo':
      return createAddTodoModalContent();
    case 'view-todo':
      return createViewTodoModalContent(config.payload);
  }
  return createDeleteModalContent(config.message);
}

function createAddProjectModalContent() {
  const id = crypto.randomUUID();

  const frag = document.createDocumentFragment();
  frag.append(
    ...[
      createElement({
        tag: 'header',
        properties: {
          class: 'modal-header',
        },
        children: [
          {
            tag: 'h2',
            children: 'Add project',
          },
          {
            tag: 'button',
            properties: {
              type: 'button',
              'aria-label': 'Close modal',
              class: 'icon-button',
              'data-action': 'close',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-xmark fa-lg icon close-icon',
                },
              },
            ],
          },
        ],
      }),
      createElement({
        tag: 'section',
        properties: {
          class: 'modal-body',
        },
        children: [
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'input',
                properties: {
                  type: 'text',
                  name: 'title',
                  id: `project-title-${id}`,
                  placeholder: 'Enter project name',
                },
              },
              {
                tag: 'label',
                properties: {
                  for: `project-title-${id}`,
                },
                children: 'Title',
              },
            ],
          },
        ],
      }),

      createElement({
        tag: 'div',
        properties: {
          class: 'modal-actions',
        },
        children: [
          {
            tag: 'button',
            properties: {
              type: 'button',
              class: 'ghost',
              'data-action': 'close',
            },
            children: 'Cancel',
          },
          {
            tag: 'button',
            properties: {
              class: 'success',
            },
            children: 'Add project',
          },
        ],
      }),
    ],
  );
  return frag;
}

function createAddTodoModalContent() {
  const id = crypto.randomUUID();

  const frag = document.createDocumentFragment();
  frag.append(
    ...[
      createElement({
        tag: 'header',
        properties: {
          class: 'modal-header',
        },
        children: [
          {
            tag: 'h2',
            children: 'Add Todo',
          },
          {
            tag: 'button',
            properties: {
              type: 'button',
              'aria-label': 'Close modal',
              class: 'icon-button',
              'data-action': 'close',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-xmark fa-lg icon close-icon',
                },
              },
            ],
          },
        ],
      }),
      createElement({
        tag: 'section',
        properties: {
          class: 'modal-body',
        },
        children: [
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'input',
                properties: {
                  type: 'text',
                  name: 'title',
                  id: `todo-title-${id}`,
                  placeholder: 'Enter title',
                },
              },
              {
                tag: 'label',
                properties: {
                  for: `todo-title-${id}`,
                },
                children: 'Title',
              },
            ],
          },
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'textarea',
                properties: {
                  name: 'description',
                  id: `todo-description-${id}`,
                  placeholder: 'Enter description',
                },
              },
              {
                tag: 'label',
                properties: {
                  for: `todo-description-${id}`,
                },
                children: 'Description',
              },
            ],
          },
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'input',
                properties: {
                  type: 'datetime-local',
                  name: 'date',
                  id: `todo-date-${id}`,
                },
              },
              {
                tag: 'label',
                properties: {
                  for: `todo-date-${id}`,
                },
                children: 'Due Date',
              },
            ],
          },
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'select',
                properties: {
                  name: 'priority',
                  id: `todo-priority-${id}`,
                },
                children: [
                  {
                    tag: 'option',
                    properties: {
                      value: 'low',
                    },
                    children: 'Low',
                  },
                  {
                    tag: 'option',
                    properties: {
                      value: 'medium',
                    },
                    children: 'Medium',
                  },
                  {
                    tag: 'option',
                    properties: {
                      value: 'high',
                    },
                    children: 'High',
                  },
                ],
              },
              {
                tag: 'label',
                properties: {
                  for: `todo-priority-${id}`,
                },
                children: 'Priority',
              },
            ],
          },
          {
            tag: 'div',
            properties: {
              class: 'form-control',
            },
            children: [
              {
                tag: 'ul',
                properties: {
                  class: 'errors',
                },
              },
              {
                tag: 'select',
                properties: {
                  name: 'projectId',
                  id: `todo-project-${id}`,
                },
              },
              {
                tag: 'label',
                properties: {
                  for: `todo-project-${id}`,
                },
                children: 'Project',
              },
            ],
          },
        ],
      }),
      createElement({
        tag: 'div',
        properties: {
          class: 'modal-actions',
        },
        children: [
          {
            tag: 'button',
            properties: {
              type: 'button',
              class: 'ghost',
              'data-action': 'close',
            },
            children: 'Cancel',
          },
          {
            tag: 'button',
            properties: {
              class: 'success',
            },
            children: 'Add todo',
          },
        ],
      }),
    ],
  );
  return frag;
}

function createDeleteModalContent(message: string) {
  const id = crypto.randomUUID();

  const frag = document.createDocumentFragment();
  frag.append(
    ...[
      createElement({
        tag: 'section',
        properties: {
          class: 'modal-body',
          id,
        },
        children: [
          {
            tag: 'p',
            properties: {
              class: 'delete-message',
            },
            children: message,
          },
        ],
      }),
      createElement({
        tag: 'div',
        properties: {
          class: 'modal-actions',
        },
        children: [
          {
            tag: 'button',
            properties: {
              type: 'button',
              'data-action': 'close',
            },
            children: 'Cancel',
          },
          {
            tag: 'button',
            properties: {
              class: 'danger ghost',
            },
            children: 'Delete',
          },
        ],
      }),
    ],
  );
  return frag;
}

function createViewTodoModalContent(todo: Todo & { projectName: string }) {
  const frag = document.createDocumentFragment();

  const isLate = new Date(todo.date) < new Date();

  const shownFields: ElementConfig[] = [
    {
      tag: 'tr',
      children: [
        {
          tag: 'th',
          children: [
            {
              tag: 'strong',
              children: 'Project:',
            },
          ],
        },
        {
          tag: 'td',
          children: todo.projectName,
        },
      ],
    },
    {
      tag: 'tr',
      children: [
        {
          tag: 'th',
          children: [
            {
              tag: 'strong',
              children: 'Description:',
            },
          ],
        },
        {
          tag: 'td',
          children: todo.description,
        },
      ],
    },
    {
      tag: 'tr',
      children: [
        {
          tag: 'th',
          children: [
            {
              tag: 'strong',
              children: 'Priority:',
            },
          ],
        },
        {
          tag: 'td',
          children:
            todo.priority[0].toUpperCase() +
            todo.priority.slice(1).toLowerCase(),
        },
      ],
    },
    {
      tag: 'tr',
      children: [
        {
          tag: 'th',
          children: [
            {
              tag: 'strong',
              children: 'Due Date:',
            },
          ],
        },
        {
          tag: 'td',
          children: new Date(todo.date).toLocaleString(),
        },
      ],
    },
  ];

  if (todo.description.trim() === '') {
    shownFields.splice(1, 1);
  }

  frag.append(
    ...[
      createElement({
        tag: 'header',
        properties: {
          class: 'modal-header',
        },
        children: [
          {
            tag: 'h2',
            properties: {
              class: 'text-overflow-ellipsis',
            },
            children: todo.title,
          },
          {
            tag: 'button',
            properties: {
              class: 'icon-button',
              type: 'button',
              'aria-label': 'Close modal',
              'data-action': 'close',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: 'fa-solid fa-xmark fa-lg icon close-icon',
                },
              },
            ],
          },
        ],
      }),
      createElement({
        tag: 'section',
        properties: {
          class: 'modal-body',
        },
        children: [
          {
            tag: 'table',
            properties: {
              class: 'todo-view',
            },
            children: [
              {
                tag: 'tbody',
                children: shownFields,
              },
            ],
          },
        ],
      }),
      createElement({
        tag: 'div',
        properties: {
          class: 'modal-actions',
        },
        children: [
          {
            tag: 'div',
            properties: {
              class: 'status',
            },
            children: [
              {
                tag: 'i',
                properties: {
                  class: todo.done
                    ? 'fa-regular fa-thumbs-up fa-2xl icon success'
                    : isLate
                      ? 'fa-regular fa-clock fa-fade fa-2xl icon danger'
                      : 'fa-solid fa-hourglass fa-spin fa-2xl icon attention',
                },
              },
            ],
          },
          {
            tag: 'button',
            properties: {
              'data-action': 'close',
            },
            children: 'Done',
          },
        ],
      }),
    ],
  );
  return frag;
}
