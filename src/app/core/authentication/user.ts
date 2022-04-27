import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Hejian',
  email: 'h96412j@gmail.com',
  avatar: './assets/images/avatar.png',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar-default.jpg',
};
