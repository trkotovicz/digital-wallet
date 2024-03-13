import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { Person } from "../database/entity/Person";
import { ErrorTypes } from "../errors/catalog";
import { newPersonSchema, validateDocument } from "../utils/person.validations";
import { setPassword } from '../utils/hashPassword';

export default class PersonService {
  constructor(private personRepository: Repository<Person>) {}

  create = async (name: string, document: string, password: string) => {
    newPersonSchema({ name, document, password });
    validateDocument(document);

    if (!this.exists(document)) throw new Error(ErrorTypes.ConflictError);

    password = setPassword(password);

    const person = this.personRepository.create({
      id: randomUUID(),
      name,
      document,
      password,
    });

    await this.personRepository.save(person);

    return {
      id: person.id,
      name: person.name,
      document: person.document,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt
    };
  };

  exists = async (document: string) => {
    if (
      !(await this.personRepository.exists({
        where: { document },
      }))
    ) {
      return true;
    }
    return false;
  };
}
