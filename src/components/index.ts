import { Backdrop } from './backdrop';
import { ModalDialog } from './modal';

customElements.define(Backdrop.tag, Backdrop);
customElements.define(ModalDialog.tag, ModalDialog, { extends: 'form' });

export * from './backdrop';
export * from './modal';
