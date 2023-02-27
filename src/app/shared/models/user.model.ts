export interface UserLogin{
  name: string;
  lastName: string;
  email: string;
  password: string;
  dni: string;
  phone: string;
}

export interface UserToken extends Omit<UserLogin, 'password' | 'dni' | 'phone'> {
  id: string;
  iat : number;
  exp : number;
}
