import {Group} from "./Group";
import {UserAttend} from "./UserAttend";

export interface Lesson{
  id: number;
  group: Group;
  attendance: UserAttend[];
  date: Date;
}
