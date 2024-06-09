type ModalBaseConfig<T> = {
  type: T;
  onConfirm(payload: unknown): void;
};

export type ModalConfig =
  | ModalBaseConfig<'add-todo' | 'add-project'>
  | (ModalBaseConfig<'delete-confirm'> & { message: string });
