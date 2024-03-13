import PersonController from "../controllers/PersonController";
import { AppDataSource } from "../database/data-source";
import { Person } from "../database/entity/Person";
import PersonService from "../services/PersonService";

const entityManager = AppDataSource.createEntityManager();

const personRepository = entityManager.getRepository(Person);
const personService = new PersonService(personRepository);
const personController = new PersonController(personService);

export { personController };
