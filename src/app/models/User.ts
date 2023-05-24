export interface User {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  fathersName?: string;
  role: string;
  age?: number;
  balance?: number;
  phoneNumber?: string;
  address?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
