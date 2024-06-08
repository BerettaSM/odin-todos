import { type Nullable } from './helpers';

export type ElementConfig = {
  tag: keyof HTMLElementTagNameMap;
  properties?: {
    [K: string]: Nullable<string>;
  };
  children?: ElementConfig[] | HTMLElement[] | string | undefined;
};
