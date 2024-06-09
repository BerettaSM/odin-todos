import { type ModalConfig } from '../types';

import { createElement } from './helper';

export function createModalContent(config: ModalConfig) {
  switch (config.type) {
    case 'add-project':
      return createAddProjectModalContent();
    case 'add-todo':
      return createAddTodoModalContent();
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
              class: 'action-button',
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
              class: 'action-button',
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
