import express from 'express';
import authHandler from './auth-handler';
import asyncHandler from 'express-async-handler';

const authRouter = express.Router();

authRouter.get('/:username&:password', asyncHandler(authHandler.tryLogin));
authRouter.post('/', asyncHandler(authHandler.create));

export default authRouter;