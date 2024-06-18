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

let lastFocusedElement: HTMLElement = document.body;

window.addEventListener(
  'focusin',
  function updateLastFocused(event: FocusEvent) {
    lastFocusedElement = event.target as HTMLElement;
  },
);

export function retainFocus(element: HTMLElement) {
  const focusedElement = lastFocusedElement;

  // Find out what elements can receive focus inside the target element.
  // There's probably more elements than can receive focus than specified
  // in the selector, but for our purposes, this will do.
  const focusableElements = element.querySelectorAll(
    'a,button,input,textarea,select',
  ) as NodeListOf<HTMLElement>;

  // If there are elements inside the target that can receive focus
  if (focusableElements.length > 0) {
    // Attach the listener
    window.addEventListener('focusin', onFocusChange);
    // And set focus to first focusable element within target
    focusableElements[0].focus();
  }

  // Return a cleanup function that should be called
  // to restore proper focus functionality when the
  // target element is dismissed/unmounted from dom.
  return function cleanUpFunction() {
    window.removeEventListener('focusin', onFocusChange);
    focusedElement.focus();
  };

  // ==========================================

  function onFocusChange(event: FocusEvent) {
    const from = event.relatedTarget;
    const to = event.target;

    // Find out if the new focused element is a child of the target element
    const isFocusedElementWithinTarget =
      Array.prototype.indexOf.call(focusableElements, to) !== -1;

    if (isFocusedElementWithinTarget) {
      // Focused element is within the element that is retaining focus, allow it.
      return;
    }

    // The focus went to an element outside the target element.
    // Find out if focus was lost when it was on the first, or last element,
    // so we can make it loop around to beginning/end of the element appropriately.
    const hasFirstElementLostFocus =
      Array.prototype.indexOf.call(focusableElements, from) === 0;

    if (hasFirstElementLostFocus) {
      // Put focus back on last focusable element within the element.
      focusableElements[focusableElements.length - 1].focus();
    } else {
      // For all other cases of focus loss, put focus on first focusable element;
      focusableElements[0].focus();
    }
  }
}
