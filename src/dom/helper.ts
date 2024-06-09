import { type ElementConfig } from '../types';

export function createElement({ tag, children, properties }: ElementConfig) {
  const element = Object.entries(properties || []).reduce(
    (e, [prop, value]) => (
      typeof value === 'string' && e.setAttribute(prop, value), e
    ),
    document.createElement(tag),
  );
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    for (const child of children) {
      if ('tag' in child) {
        element.appendChild(createElement(child));
      } else {
        element.appendChild(child);
      }
    }
  }
  return element;
}
