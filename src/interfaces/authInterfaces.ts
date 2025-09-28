export interface IRegister {
    name: string;
    email: string;
    password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  role: string;
  imageUrl: string;
}

export interface IPasswordChange {
  newPassword: string;
  confirmPassword: string;
}
