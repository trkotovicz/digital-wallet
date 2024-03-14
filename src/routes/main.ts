import AccountController from '../controllers/AccountController';
import CardController from '../controllers/CardController';
import PersonController from "../controllers/PersonController";
import TransactionController from '../controllers/TransactionController';
import { AppDataSource } from "../database/data-source";
import { Account } from '../database/entity/Account';
import { Card } from '../database/entity/Card';
import { Person } from "../database/entity/Person";
import { Transaction } from '../database/entity/Transaction';
import AccountService from '../services/AccountService';
import CardService from '../services/CardService';
import PersonService from "../services/PersonService";
import TransactionService from '../services/Transactions';

const entityManager = AppDataSource.createEntityManager();
const personRepository = entityManager.getRepository(Person);
const accountRepository = entityManager.getRepository(Account);
const cardRepository = entityManager.getRepository(Card);
const transactionRepository = entityManager.getRepository(Transaction);

const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

const cardService = new CardService(cardRepository, accountRepository, accountService);
const cardController = new CardController(cardService);

const transactionService = new TransactionService(transactionRepository, accountService);
const transactionController = new TransactionController(transactionService);

export {
  personController,
  accountController,
  cardController,
  transactionController,
};
