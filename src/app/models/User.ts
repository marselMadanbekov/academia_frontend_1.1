import {Group} from "./Group";

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  age?: number;
  balance?: number;
  phone_number?: string;
  address?: string;
  email?: string;
  password?: string;
  groups?: Group[];
  confirm_password?: string;
  branchId?: number;
}
