import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import Chart from 'chart.js/auto';

@Component({
  selector: "app-day-stat",
  templateUrl: "./day-stat.component.html",
  styleUrls: ["./day-stat.component.scss"]
})
export class DayStatComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: Chart<"bar", number[], unknown> | undefined;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: "Sales",
            data: [467, 576, 572, 79, 92, 574, 573, 576],
            backgroundColor: 'red'
          },
          {
            label: "Profit",
            data: [542, 542, 536, 327, 17, 0.00, 538, 541],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
}
