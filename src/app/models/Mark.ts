import {Subject} from "./Subject";

export interface Mark{
  id?: number;
  userId?: number;
  correct_answers: number;
  total_questions: number;
  subject?: Subject;
  topic: string;
  createdDate: Date;
}
