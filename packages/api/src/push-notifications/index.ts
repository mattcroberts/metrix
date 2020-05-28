import { initializeApp } from 'firebase-admin';
import './scheduler';

export const initialise = () => {
  return initializeApp();
};

