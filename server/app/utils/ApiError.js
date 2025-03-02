export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call the super constructor (Error) first, before setting 'this'
    super(message);

    // Now you can access 'this' properties
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    // Set stack trace, either from argument or captured
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Maintain the prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
