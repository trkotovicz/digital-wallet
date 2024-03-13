import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Account } from "../database/entity/Account";
import { Card } from "../database/entity/Card";
import { ErrorTypes } from "../errors/catalog";
import { CardType } from "../interfaces/ICard";
import { newCardSchema } from "../utils/validations/card.validations";

export default class CardService {
  constructor(
    private cardRepository: Repository<Card>,
    private accountRepository: Repository<Account>
  ) {}

  exists = async (number: string): Promise<boolean> => {
    return await this.cardRepository.exists({ where: { number } });
  };

  create = async (
    type: CardType,
    number: string,
    cvv: string,
    accountId: string
  ) => {
    newCardSchema({ type, number, cvv });
    const formattedCard = number.replace(/ /g, "");

    if (await this.exists(formattedCard))
      throw new Error(ErrorTypes.CardConflictError);
    if (type === CardType.PHYSICAL) await this.existsPhysicalCard(accountId);

    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new Error(ErrorTypes.AccountNotFound);
    }

    const card = this.cardRepository.create({
      id: randomUUID(),
      type,
      number: formattedCard,
      cvv,
      accountId: account,
    });
    await this.cardRepository.save(card);

    const maskedCard = card.number.slice(card.number.length - 4);

    return {
      id: card.id,
      type: card.type,
      number: maskedCard,
      cvv: card.cvv,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };
  };

  existsPhysicalCard = async (accountId: string): Promise<void | Error> => {
    const physicalCard = await AppDataSource.getRepository(Card)
      .createQueryBuilder("card")
      .leftJoin("card.accountId", "account")
      .where("account.id = :accountId", { accountId })
      .andWhere("card.type = :type", { type: CardType.PHYSICAL })
      .getOne();

    if (physicalCard) throw new Error(ErrorTypes.PhysicalCardLimitError);
  };
}
