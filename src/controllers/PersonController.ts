import { Request, Response } from 'express';
import PersonService from '../services/PersonService';
import { StatusCodes } from 'http-status-codes';

export default class PersonController {
  constructor (private personService: PersonService) { }
  
  create = async (req: Request, res: Response) => {
    const { name, document, password } = req.body;
    const person = await this.personService.create(name, document, password);
    res.status(StatusCodes.CREATED).json(person);
  }
}