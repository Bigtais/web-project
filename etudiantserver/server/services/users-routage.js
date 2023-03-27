import express from "express";
import usersHandler from './users-handler';
import asyncHandler from 'express-async-handler';

const usersRouter = express.Router();

usersRouter.get('/', asyncHandler(usersHandler.getUsers));
usersRouter.post('/', asyncHandler(usersHandler.create));

usersRouter.delete('/:id', asyncHandler(usersHandler.userDelete));


export default usersRouter;