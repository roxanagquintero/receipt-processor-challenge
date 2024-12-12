import { Request, Response } from 'express';
import { User } from '../models/exampleModel';
const users: User[] = [
  { id: 1, name: 'Roxana Quintero' },
  { id: 2, name: 'Daniela Quintero' },
];
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};
