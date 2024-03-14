import { randomUUID } from "crypto";
import { In, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Account } from "../database/entity/Account";
import { Card } from "../database/entity/Card";
import { ErrorTypes } from "../errors/catalog";
import { CardType, ICard, ICardList } from "../interfaces/ICard";
import { newCardSchema } from "../utils/validations/card.validations";
import AccountService from './AccountService';

export default class CardService {
  constructor(
    private cardRepository: Repository<Card>,
    private accountRepository: Repository<Account>,
    private accountService: AccountService
  ) {}

  exists = async (number: string): Promise<boolean> => {
    return await this.cardRepository.exists({ where: { number } });
  };

  formatCardNumber = async (cards: ICard[]) => {
    let cardsMasked = [];
    cards.forEach((card) => {
      // const data = {
      //   id: card.id,
      //   type: card.type,
      //   number: card.number.slice(card.number.length - 4),
      //   cvv: card.cvv,
      //   createdAt: card.createdAt,
      //   updatedAt: card.updatedAt,
      // };
      // cardsMasked.push(data);
      card.number = card.number.slice(card.number.length - 4);
      cardsMasked.push(card);
    });
    return cardsMasked;
  };

  create = async (
    type: CardType,
    number: string,
    cvv: string,
    accountId: string
  ): Promise<ICard> => {
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

  list = async (document: string): Promise<ICardList> => {
    const accounts = await this.accountService.list(document);
    const ids = accounts.accounts.map((account) => account.id);

    const data = await this.cardRepository.find({ where: { accountId: In(ids) } });
    
    const cards = await this.formatCardNumber(data);
    return { cards };
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
