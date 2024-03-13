import Joi from "joi";
import { ErrorTypes } from "../../errors/catalog";
const { cpf, cnpj } = require("cpf-cnpj-validator");
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

export const validateDocument = (value: any): boolean => {
  if (value.length === 11) {
    const isValid = cpf.isValid(value);
    if (!isValid) throw new Error(ErrorTypes.InvalidDocument);
    return true;
  }
  if (value.length === 14) {
    const isValid = cnpj.isValid(value);
    if (!isValid) throw new Error(ErrorTypes.InvalidDocument);
    return true;
  } else throw new Error(ErrorTypes.InvalidDocument);
};

export const newPersonSchema = (data: object): Joi.ValidationResult => {
  const schema = Joi.object({
    document: Joi.string().min(11).max(14),
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
