import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { Person } from "../database/entity/Person";
import { ErrorTypes } from "../errors/catalog";
import { storePassword, validPassword } from "../utils/hashPassword";
import JwtService from "../utils/jwt";
import {
  newPersonSchema,
  validateDocument,
} from "../utils/validations/person.validations";
import { IPerson } from '../interfaces/IPerson';

export default class PersonService {
  constructor(private personRepository: Repository<Person>) {}

  login = async (document: string, password: string): Promise<string> => {
    try {
      const findDocument = await this.personRepository.findOneOrFail({
        where: { document },
      });

      const hashPass = validPassword(password, findDocument.password);
      if (!hashPass) throw new Error(ErrorTypes.UnauthorizedError);

      const token = JwtService.createToken({ document, password });
      return token;
    } catch (error) {
      throw new Error(ErrorTypes.UnauthorizedError);
    }
  };

  create = async (name: string, document: string, password: string): Promise<IPerson> => {
    newPersonSchema({ name, document, password });
    validateDocument(document);

    if (!this.exists(document)) throw new Error(ErrorTypes.DocumentConflictError);

    const hashedPassword = storePassword(password);

    const person = this.personRepository.create({
      id: randomUUID(),
      name,
      document,
      password: hashedPassword,
    });

    await this.personRepository.save(person);

    return {
      id: person.id,
      name: person.name,
      document: person.document,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
  };

  exists = async (document: string): Promise<boolean> => {
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
