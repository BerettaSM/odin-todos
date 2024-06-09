import './modal-style.css';

import { extractFormData } from '../utils';

export class ModalDialog extends HTMLFormElement {
  static get CONFIRM() {
    return 'modal-confirm';
  }

  static get CANCEL() {
    return 'modal-cancel';
  }

  static get VALIDATION_ERROR() {
    return 'modal-validation-error';
  }

  static get tag() {
    return 'modal-dialog';
  }

  connectedCallback() {
    this.addEventListener('submit', this.onConfirm);
    this.addEventListener('click', this.onCloseClick);
    this.addEventListener('input', this.onInputChange);
  }

  disconnectedCallback() {
    this.removeEventListener('submit', this.onConfirm);
    this.removeEventListener('click', this.onCloseClick);
    this.removeEventListener('input', this.onInputChange);
  }

  onValidationError = (errors: Record<string, string[]>) => {
    for (const [name, arr] of Object.entries(errors)) {
      const input: HTMLInputElement | null = this.querySelector(
        `[name="${name}"]`,
      );
      if (!input) continue;
      input.classList.add('invalid');
      const errorsList = input.parentElement!.querySelector(
        'ul.errors',
      ) as HTMLUListElement;
      errorsList.innerHTML = '';
      for (const err of arr) {
        const li = document.createElement('li');
        li.textContent = err;
        errorsList.appendChild(li);
      }
    }
  };

  private clearErrors() {
    const inputs = this.querySelectorAll(
      'input[name]',
    ) as NodeListOf<HTMLInputElement>;
    for (const input of inputs) {
      this.clearInputError(input);
    }
  }

  private clearInputError(input: HTMLInputElement) {
    input.classList.remove('invalid');
    const errorsList = input.parentElement!.querySelector('ul.errors');
    errorsList && (errorsList.innerHTML = '');
  }

  private onConfirm = (event: SubmitEvent) => {
    event.preventDefault();
    const data = extractFormData(this);
    this.dispatchEvent(
      new CustomEvent(ModalDialog.CONFIRM, {
        detail: data,
      }),
    );
  };

  private onCancel = () => {
    this.dispatchEvent(new CustomEvent(ModalDialog.CANCEL));
  };

  private onCloseClick = (event: MouseEvent) => {
    if (!event.target || !this.isCloseButton(event.target)) {
      return;
    }
    event.stopImmediatePropagation();

    this.onCancel();
  };

  private onInputChange = (event: Event) => {
    if (!event.target || !this.isInput(event.target)) {
      return;
    }
    this.clearInputError(event.target);
  };

  private isCloseButton(target: EventTarget): target is HTMLButtonElement {
    return (
      'dataset' in target &&
      target.dataset instanceof DOMStringMap &&
      target.dataset.action === 'close'
    );
  }

  private isInput(target: EventTarget): target is HTMLInputElement {
    return (
      'tagName' in target &&
      typeof target.tagName === 'string' &&
      ['INPUT', 'TEXTAREA'].includes(target.tagName)
    );
  }

  get open() {
    return this.getAttribute('open') !== null;
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
      this.clearErrors();
    }
  }
}
