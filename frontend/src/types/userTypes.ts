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
  fullName: string;
  gender: 'male' | 'female';
  category: string;
  dateOfBirth: string;
  email: string;
  token: string;
  role: 'admin' | 'user';
  createdAt: string;
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
