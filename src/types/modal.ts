type ModalBaseConfig<T> = {
  type: T;
  onConfirm(payload: unknown): void;
  processInputs?(
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  ): void;
};

export type ModalConfig =
  | ModalBaseConfig<'add-todo' | 'add-project'>
  | (ModalBaseConfig<'delete-confirm'> & { message: string });
