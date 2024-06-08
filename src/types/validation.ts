export type HasLength = {
  min?: number;
  max?: number;
};

export type Validations<T> = {
  [K in keyof T]?: ((input: T[K]) => void)[];
};
