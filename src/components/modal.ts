import './modal-style.css';
import { extractFormData } from '../utils/form';

export class ModalDialog extends HTMLFormElement {
  static get tag() {
    return 'modal-dialog';
  }

  connectedCallback() {
    const closeButton = this.querySelectorAll(
      'button[data-action="close"]',
    ) as NodeListOf<HTMLButtonElement>;

    closeButton.forEach((button) => {
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('modal-cancel'));
      });
    });

    this.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = extractFormData(this);
      this.dispatchEvent(
        new CustomEvent('modal-confirm', {
          detail: data,
        }),
      );
    });
  }

  get open() {
    return this.getAttribute('open') !== null;
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}
