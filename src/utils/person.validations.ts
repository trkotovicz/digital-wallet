import * as Joi from "joi";
const { validate } = require("cpf-cnpj-validator");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const validateDocument = (value: string): boolean => {
  return validate(value);
};

export const newPersonSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    document: Joi.string().custom((value, helpers) => {
      if (!validateDocument(value)) {
        return helpers.error("Document must be a valid CPF or CNPJ");
      }
      return value;
    }),
    name: Joi.string().min(3).max(100),
    password: passwordComplexity(complexityOptions).error(
      new Error(
        "Password must have at least 8 characters, contain 1 uppercase, 1 lowercase, 1 symbol and 1 numeric"
      )
    ),
  }).required();

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};
