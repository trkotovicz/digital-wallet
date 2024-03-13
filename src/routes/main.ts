import AccountController from '../controllers/AccountController';
import PersonController from "../controllers/PersonController";
import { AppDataSource } from "../database/data-source";
import { Account } from '../database/entity/Account';
import { Card } from '../database/entity/Card';
import { Person } from "../database/entity/Person";
import AccountService from '../services/AccountService';
import PersonService from "../services/PersonService";

const entityManager = AppDataSource.createEntityManager();

const personRepository = entityManager.getRepository(Person);
const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

const accountRepository = entityManager.getRepository(Account);
const cardRepository = entityManager.getRepository(Card);
const accountService = new AccountService(accountRepository, cardRepository);
const accountController = new AccountController(accountService);

export { personController, accountController };
