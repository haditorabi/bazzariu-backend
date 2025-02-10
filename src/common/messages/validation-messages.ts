// validation-messages.ts
export class ValidationMessages {
  // Common Validation Decorators
  static readonly IS_NOT_EMPTY = '$property should not be empty.';
  static readonly IS_OPTIONAL = '$property is optional.';
  static readonly EQUALS = '$property must equal $constraint1.';

  // String Validation
  static readonly IS_STRING = '$property must be a string.';
  static readonly LENGTH =
    '$property must be between $constraint1 and $constraint2 characters.';
  static readonly MIN_LENGTH =
    '$property must be at least $constraint1 characters long.';
  static readonly MAX_LENGTH =
    '$property must be at most $constraint1 characters long.';

  // Number Validation
  static readonly IS_NUMBER = '$property must be a number.';
  static readonly IS_INT = '$property must be an integer.';
  static readonly MIN = '$property must be at least $constraint1.';
  static readonly MAX = '$property must be at most $constraint1.';
  static readonly IS_POSITIVE = '$property must be a positive number.';
  static readonly IS_DECIMAL = '$property must be a decimal number.';

  // Boolean Validation
  static readonly IS_BOOLEAN = '$property must be a boolean.';
  static readonly IS_TRUE = '$property must be true.';
  static readonly IS_FALSE = '$property must be false.';

  // Date Validation
  static readonly IS_DATE = '$property must be a valid date.';
  static readonly MIN_DATE = '$property must be after $constraint1.';
  static readonly MAX_DATE = '$property must be before $constraint1.';

  // Array Validation
  static readonly IS_ARRAY = '$property must be an array.';
  static readonly ARRAY_NOT_EMPTY = '$property should not be an empty array.';
  static readonly IS_ENUM = '$property must be a valid enum value.';

  // ID Validation
  static readonly IS_MONGO_ID = '$property must be a valid Mongo ID.';

  // Email, URL, and Miscellaneous Validation
  static readonly IS_EMAIL = '$property must be a valid email address.';
  static readonly IS_URL = '$property must be a valid URL.';
  static readonly IS_PHONE_NUMBER = '$property must be a valid phone number.';
  static readonly IS_IP = '$property must be a valid IP address.';
}
