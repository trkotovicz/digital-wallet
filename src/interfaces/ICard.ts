export enum CardType {
  PHYSICAL = "physical",
  VIRTUAL = "virtual"
}

export interface ICard {
  id: string;
  type: CardType,
  number: string;
  cvv: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICardList {
  cards: ICard[];
}
