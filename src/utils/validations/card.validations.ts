import Joi from "joi";
import { CardType } from '../../interfaces/ICard';

export const newCardSchema = (data: object): Joi.ValidationResult => {
  const cardRegex = /^(?:\d{4}\s?){4}$/;
  const cvvRegex = /^\d{3}$/;

  const cardTypes = Object.values(CardType);

  const schema = Joi.object({
    type: Joi.string()
      .valid(...cardTypes)
      .required(),
    number: Joi.string()
      .pattern(cardRegex)
      .message(
        `Card bumber must have 16 numeric characters
        Valid patterns: 1111222233334444 / 1111 2222 3333 4444`
      )
      .required(),
    cvv: Joi.string()
      .pattern(cvvRegex)
      .message("CVV must have 3 numeric characters")
      .required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.message);
  return value;
};