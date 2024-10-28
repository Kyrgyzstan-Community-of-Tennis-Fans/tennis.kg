import type { Model } from 'mongoose';

export interface UserFields {
  fullName: string;
  telephone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  rank: string;
  avatar: string | null;
  password: string;
  token: string;
  role: 'user' | 'admin';
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface RankFields {
  name: string;
}

export interface NewsFields {
  title: string;
  subtitle?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  newsCover?: string;
  images?: string[];
}
