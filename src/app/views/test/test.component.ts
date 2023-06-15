import {Component, OnInit} from '@angular/core';
import {CalendarDay} from "../../models/CalendarDay";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  month1: number = 0;
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  ngOnInit(): void {
    // here we initialize the calendar
    this.generateCalendarDays();
  }

  prevMonth(): void {
    this.month1 = this.month1 - 30;
    this.generateCalendarDays();
  }

  nextMonth(): void {
    this.month1 = this.month1 + 30;
    this.generateCalendarDays();
  }

  private generateCalendarDays(): void {
    // we reset our calendar every time
    this.calendar = [];

    // we set the date
    let day: Date = new Date();

    // here we find the first day that our calendar will start from
    // it would be the last Monday of the previous month
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    // dateToAdd is an intermediate variable that will get increased
    // in the following for loop
    let dateToAdd = startingDateOfCalendar;

    // ok since we have our starting date then we get the next 41 days
    // that we need to add in our calendar array
    // 41 cause our calendar will show 6 weeks and MATH say that
    // 6 weeks * 7 days = 42!!
    for (var i = 0; i < 42; i++) {
      if (i%7 === 0) {
        this.calendar.push(new CalendarDay(new Date(dateToAdd),'Mental'));
      }else{
        this.calendar.push(new CalendarDay(new Date(dateToAdd),''));
      }
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date) {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(this.month1));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }
}
