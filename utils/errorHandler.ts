import { FieldError } from '../src/generated/graphql';

export const errorHandler = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};

  errors.map(({ field, message }) => {
    errorMap[field] = message;
  });
  //   console.log(errors, errorMap);
  return errorMap;
};
