import { BadRequestException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Validates an input object against a class-validator DTO.
 * @param dtoClass The DTO class to validate against.
 * @param data The input data to validate.
 * @throws BadRequestException if validation fails.
 */
export async function validateInput<T extends object>(
  dtoClass: new () => T,
  data: any,
): Promise<void> {
  const instance = plainToInstance(dtoClass, data);
  await validateOrReject(instance).catch((errors) => {
    throw new BadRequestException(errors);
  });
}
// Example code
// @ServiceErrorHandler('create amenity')
// async create(data: CreateAmenityInput): Promise<Amenity> {
//   await validateInput(CreateAmenityInput, data);
//   return this.prisma.amenity.create({ data });
// }
