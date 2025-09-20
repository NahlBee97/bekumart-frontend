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
  id: number;
  email: string;
  name: string;
  isVerified: boolean;
  role: string;
  image: string;
}
