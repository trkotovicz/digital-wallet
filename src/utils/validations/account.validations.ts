import Joi from "joi";

export const newAccountSchema = (data: object): Joi.ValidationResult => {
  const branchRegex = /^\d{3}$/;
  const accountRegex = /^\d{8}$/;

  const schema = Joi.object({
    branch: Joi.string()
      .pattern(branchRegex)
      .message("Branch must have 3 numeric characters"),
    account: Joi.string()
      .pattern(accountRegex)
      .message("Branch must have 8 numeric characters"),
  }).required();

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};
