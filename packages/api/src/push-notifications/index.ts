import { initializeApp, credential, messaging } from 'firebase-admin';
import * as firebaseCredentials from '../../firebase-credentials.json';
import { Router } from 'express';
import Container from 'typedi';
import { Connection } from 'typeorm';
import { User } from '../users/User.model';
import { DeviceRegistration } from './DeviceRegistration.model';
import * as passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { verify } from 'jsonwebtoken';
import { config } from '../config';

export const initialise = () => {
  return initializeApp({
    credential: credential.cert('/home/matt/dev/metrix/packages/api/firebase-credentials.json'),
    databaseURL: 'https://metrix-1587646391040.firebaseio.com',
  });
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
