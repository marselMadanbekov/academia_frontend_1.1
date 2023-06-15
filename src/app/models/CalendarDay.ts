export class CalendarDay {
  public date!: Date;
  public title!: string;
  public isPastDate!: boolean;
  public isToday!: boolean;

  constructor(d: Date,title:string) {
    this.date = d;
    this.title = title;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

}
