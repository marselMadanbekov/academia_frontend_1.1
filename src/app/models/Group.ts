import {User} from "./User";
import {Timetable} from "./Timetable";

export interface Group{
  id: number;
  name: string;
  subjectName: string;
  pupils?: User[];
  teacher?: User;
  timetable?: Timetable;
}
