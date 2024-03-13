import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Account } from "../database/entity/Account";
import { Card } from "../database/entity/Card";
import { ErrorTypes } from "../errors/catalog";
import { IAccount, IAccountList } from "../interfaces/IAccount";
import { CardType } from "../interfaces/ICard";
import { newAccountSchema } from "../utils/validations/account.validations";
import { newCardSchema } from "../utils/validations/card.validations";

export default class AccountService {
  constructor(
    private accountRepository: Repository<Account>,
    private cardRepository: Repository<Card>
  ) {}

  existsAccount = async (account: string): Promise<boolean> => {
    return await this.accountRepository.exists({ where: { account } });
  };

  existsCard = async (number: string): Promise<boolean> => {
    return await this.cardRepository.exists({ where: { number } });
  };

  createNewAccount = async (
    branch: string,
    account: string,
    document: string
  ): Promise<IAccount> => {
    newAccountSchema({ branch, account });

    const maskedAccount = account.slice(0, 7) + "-" + account.slice(7);

    if (await this.existsAccount(maskedAccount))
      throw new Error(ErrorTypes.AccountConflictError);

    const data = this.accountRepository.create({
      id: randomUUID(),
      branch,
      account: maskedAccount,
      document,
    });

    await this.accountRepository.save(data);

    return {
      id: data.id,
      branch: data.branch,
      account: data.account,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  };

  list = async (document: string): Promise<IAccountList> => {
    return {
      accounts: await this.accountRepository.find({
        where: { document },
        select: ["id", "branch", "account", "createdAt", "updatedAt"],
      }),
    };
  };

  createNewCard = async (
    type: CardType,
    number: string,
    cvv: string,
    accountId: string
  ) => {
    newCardSchema({ type, number, cvv });

    const formattedCard = number.replace(/ /g, "");

    if (await this.existsCard(formattedCard))
      throw new Error(ErrorTypes.CardConflictError);

    if (type === CardType.PHYSICAL) await this.existsPhysicalCard(accountId);

    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new Error("Account not found");
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

    console.log(card);

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
