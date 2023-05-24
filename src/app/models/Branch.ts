import {User} from "./User";
import {Group} from "./Group";

export interface Branch{
  id: number;
  name: string;
  town: string;
  owner: User;
  admin: User;
  groups?: Group[];
  teachers?: User[];
  pupils?: User[];
}
