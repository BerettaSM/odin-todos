import { type HasLength, type Validations } from '../../types';
import { ValidationError } from '../errors';

export function hasLength({ min, max }: HasLength) {
  if (min === undefined && max === undefined) {
    throw new Error('Either "min", "max" or both must be specified.');
  }

  return function validate(str: string) {
    const len = str.trim().length;
    if (min !== undefined && max !== undefined && (len < min || len > max)) {
      throw new Error(`Must have between ${min} and ${max} characters.`);
    }
    if (min !== undefined && len < min) {
      throw new Error(`Must have at least ${min} characters.`);
    }
    if (max !== undefined && len < max) {
      throw new Error(`Must have at most ${max} characters.`);
    }
  };
}

export function isValidDate() {
  return function validate(str: string) {
    if (new Date(str).toString() === 'Invalid Date') {
      throw new Error('Must be a valid date.');
    }
  };
}

export function validate<T>(entity: T, validations: Validations<T>) {
  const errors = {} as Record<keyof T, string[]>;

  const entries = Object.entries(validations) as [
    keyof T,
    (typeof validations)[keyof T],
  ][];

  for (const [key, fns] of entries) {
    for (const fn of fns!) {
      try {
        fn(entity[key]);
      } catch (err) {
        if (!(err instanceof Error)) {
          throw err;
        }
        errors[key] ??= [];
        errors[key].push(err.message);
      }
    }
  }

  if (Object.values(errors).length > 0) {
    throw new ValidationError(errors);
  }
}
