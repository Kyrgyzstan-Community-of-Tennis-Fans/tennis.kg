import type { Category } from '@/types/categoryTypes';
import type { Reward } from '@/types/reward';

export interface LoginMutation {
  telephone: string;
  password: string;
}

export interface RegisterMutation {
  telephone: string;
  password: string;
  fullName: string;
  gender: string;
  category: string;
  dateOfBirth: string;
  email: string;
}

export interface User {
  _id: string;
  telephone: string;
  rewards: Reward[];
  fullName: string;
  gender: 'male' | 'female';
  category: Category;
  dateOfBirth: string;
  email: string;
  isActive: boolean;
  token: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RedactorForAdmin {
  id: string;
  telephone: string;
  fullName: string;
  gender: string;
  category: string;
  dateOfBirth: string;
  email: string;
}

export type RegisterMutationWithoutCoupleFields = Omit<RegisterMutation, 'password' | 'category'>;

export interface UsersFilter {
  category?: string;
  telephone?: string;
  fullName?: string;
  page: number;
}

export interface UsersResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: User[];
}
