import express from 'express';
import { getUsers } from '../controller/exampleController';
const router = express.Router();
router.get('/users', getUsers);
export default router;
