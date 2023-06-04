import {User} from "./User";
import {Group} from "./Group";

export interface Branch{
  id: number;
  name: string;
  town: string;
  owner: User;
  admin: User;
  total_pupils?: number;
  total_subjects?: number;
  total_teachers?: number;
  total_groups?:number;
  groups?: Group[];
  teachers?: User[];
  pupils?: User[];
}
