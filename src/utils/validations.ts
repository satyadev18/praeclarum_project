import * as Yup from "yup";

export const requiredCharField = (fieldName: string) =>
  Yup.string()
    .trim()
    .min(3, `${fieldName} must be at least 3 characters long`)
    .required(`${fieldName} is required`);
