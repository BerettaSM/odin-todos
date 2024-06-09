import { type ModalConfig } from '../../types';

import { ModalDialog, Backdrop } from '../../components';
import { createModalContent } from '../../dom/modal';
import { debounce } from '../../utils';
import { ValidationError } from '../errors';

export class ModalController {
  constructor(private root: HTMLElement) {}

  renderModal(config: ModalConfig) {
    const [backdrop, modal] = this.create(config);
    this.root.append(backdrop, modal);
  }

  private create(config: ModalConfig) {
    const modal = this.createModal(config);
    const backdrop = new Backdrop();
    this.setupListeners(modal, backdrop, config);
    modal.open = true;
    backdrop.open = true;
    return [backdrop, modal] as const;
  }

  private createModal(config: ModalConfig) {
    const modal = document.createElement('form', {
      is: 'modal-dialog',
    }) as ModalDialog;
    modal.setAttribute('is', 'modal-dialog');
    const content = createModalContent(config);
    modal.appendChild(content);
    return modal;
  }

  private setupListeners(
    modal: ModalDialog,
    backdrop: Backdrop,
    { onConfirm }: ModalConfig,
  ) {
    const onClose = () => {
      modal.open = false;
      backdrop.open = false;

      backdrop.removeEventListener('click', onClose);
      modal.removeEventListener(ModalDialog.CANCEL, onClose);
      modal.removeEventListener(ModalDialog.CONFIRM, _onConfirm);

      const unmount = debounce(() => {
        this.root.removeChild(backdrop);
        this.root.removeChild(modal);
        modal.removeEventListener('transitionend', unmount);
        backdrop.removeEventListener('transitionend', unmount);
      }, 1000);

      modal.addEventListener('transitionend', unmount);
      backdrop.addEventListener('transitionend', unmount);

      unmount();
    };

    const _onConfirm = (event: Event) => {
      const payload = 'detail' in event ? event.detail : null;
      try {
        onConfirm(payload);
        close();
      } catch (err) {
        if (err instanceof ValidationError) {
          modal.onValidationError(err.errors);
        } else {
          throw err;
        }
      }
    };

    modal.addEventListener(ModalDialog.CANCEL, onClose);
    backdrop.addEventListener('click', onClose);
    modal.addEventListener(ModalDialog.CONFIRM, _onConfirm);
  }
}
