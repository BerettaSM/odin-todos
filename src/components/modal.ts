import './modal-style.css';
import { extractFormData } from '../utils';

export class ModalDialog extends HTMLFormElement {
  static get CONFIRM() {
    return 'modal-confirm';
  }

  static get CANCEL() {
    return 'modal-cancel';
  }

  static get tag() {
    return 'modal-dialog';
  }

  connectedCallback() {
    this.addEventListener('submit', this.onConfirm);
    this.addEventListener('click', this.onCloseClick);
  }

  disconnectedCallback() {
    this.removeEventListener('submit', this.onConfirm);
    this.removeEventListener('click', this.onCloseClick);
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

  private isCloseButton(target: EventTarget): target is HTMLButtonElement {
    return (
      'dataset' in target &&
      target.dataset instanceof DOMStringMap &&
      target.dataset.action === 'close'
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
    }
  }
}
