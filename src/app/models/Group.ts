import {User} from "./User";
import {Timetable} from "./Timetable";
import {Subject} from "./Subject";

export interface Group{
  id: number;
  name: string;
  subject?: Subject;
  pupils?: User[];
  teacher?: User;
  timetableDTO?: Timetable;
  branchId?: number;
}
