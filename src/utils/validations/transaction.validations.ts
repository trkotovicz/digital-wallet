import Joi from "joi";
import { TransactionType } from '../../database/entity/Transaction';

export const newTransactionSchema = (data: object): Joi.ValidationResult => {
  const transactionTypes = Object.values(TransactionType);

  const schema = Joi.object({
    value: Joi.number().precision(2).required(),
    description: Joi.string().max(60),
    type: Joi.string().valid(...transactionTypes).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};
