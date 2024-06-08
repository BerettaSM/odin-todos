export class ApplicationError extends Error {}

export class ValidationError extends ApplicationError {
  constructor(public errors: Record<string, string[]>) {
    super('Validation error');
  }
}

export class ObjectNotFoundError extends ApplicationError {}
