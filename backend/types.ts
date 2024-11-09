import type { Model } from 'mongoose';

export interface UserFields {
  fullName: string;
  telephone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  category: string;
  avatar: string | null;
  password: string;
  token: string;
  role: 'user' | 'admin';
  email: string;
  createdAt: Date;
  resetPasswordToken: string | null;
  resetPasswordExpires: number | null;
}

export interface LinksMediaFields {
  name: string;
  value: string;
}

export interface FooterFields {
  socialNetwork: LinksMediaFields[];
  menuPosition: LinksMediaFields[];
  publicOffer: string;
  mainPartnerImage: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface CategoryFields {
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
