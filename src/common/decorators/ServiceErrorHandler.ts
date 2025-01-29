import { Logger } from '@nestjs/common';

const logger = new Logger('Service');

export function ServiceErrorHandler(operation: string): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        logger.error(
          `Error during ${operation}: ${error.message}`,
          error.stack,
        );
        throw new Error(`Failed to ${operation}: ${error.message}`);
      }
    };

    return descriptor;
  };
}
