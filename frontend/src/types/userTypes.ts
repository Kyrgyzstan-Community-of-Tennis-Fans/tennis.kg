export interface LoginMutation {
  telephone: string;
  password: string;
}

export interface RegisterMutation {
  telephone: string;
  password: string;
  fullName: string;
  gender: string;
  avatar: File | null;
  rank: string;
  dateOfBirth: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  avatar: string;
  token: string;
  role: 'admin' | 'user';
  googleId?: string;
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
