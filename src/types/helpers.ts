export type Nullable<T> = T | null | undefined;

export type Predicate<T> = {
  (t: T): boolean;
};
