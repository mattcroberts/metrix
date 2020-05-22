import { Router } from 'express';
import { credential, initializeApp } from 'firebase-admin';
import { verify } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { config } from '../config';
import { User } from '../users/User.model';
import { DeviceRegistration } from './DeviceRegistration.model';
import './scheduler';

export const initialise = () => {
  return initializeApp();
};

export const router = Router();

router.post('/push-reg', async (req, res) => {
  const connection = Container.get<Connection>('connection');
  const userRepo = connection.getRepository(User);
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  const jwt = verify(authToken, config.jwtSecret);

  if (typeof jwt === 'object') {
    const userId = jwt['id'];

    const user = await userRepo.findOne(userId);
    const deviceRegistrationRepo = connection.getRepository(DeviceRegistration);
    deviceRegistrationRepo.save({ user, token: req.body.token });
    res.sendStatus(200);
    return;
  }

  res.sendStatus(500);
});
