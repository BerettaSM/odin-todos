import { Backdrop } from './backdrop';

export class ModalDialog extends HTMLElement {
  private backdrop: Backdrop;
  private container: HTMLDivElement;

  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.backdrop = document.createElement('modal-backdrop') as Backdrop;
    const root = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
        .container {
            z-index: 1;
            position: fixed;
            inset: 0;
            margin: auto;
            height: fit-content;
            width: fit-content;
            border: none;
            border-radius: 6px;
            background-color: #fff;
            padding: 0;
            opacity: 0;
            transform: translateY(-50px);
            transition:
                opacity 275ms ease-out,
                transform 275ms ease-out;
        }

        :host([open]) .container {
            opacity: 1;
            transform: translateY(0);
            transition-duration: 125ms;
        }
    `;
    this.container.innerHTML = '<slot></slot>';
    root.append(style, this.backdrop, this.container);
  }

  static get tag() {
    return 'modal-dialog';
  }

  connectedCallback() {
    // The following line forces the backdrop to update
    // its open value, as well as its inner backdrop,
    // on component mount.
    this.open = !!this.open;
  }

  toggle() {
    this.backdrop.open = !this.backdrop.open;
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
    this.backdrop.open = value;
  }
}
