export class Backdrop extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
        :host {
            position: fixed;
            height: 100%;
            width: 100%;
            inset: 0;
            background-color: rgb(0 0 0 / 0.35);
            backdrop-filter: blur(2px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 275ms ease-out;
        }

        :host([open]) {
            opacity: 1;
            pointer-events: all;
            transition-duration: 125ms;
        }
    `;
    root.append(style);
  }

  static get tag() {
    return 'modal-backdrop';
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
