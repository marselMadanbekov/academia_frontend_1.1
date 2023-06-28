import {Component, HostListener, Input, OnInit, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';
import { Mark } from '../../../models/Mark';
import { MarkService } from '../../../service/entityServices/mark.service';
import { LanguageService } from '../../../service/translations/language.service';
import { TranslationService } from '../../../service/translations/translation.service';

@Component({
  selector: 'app-day-stat',
  templateUrl: './day-stat.component.html',
  styleUrls: ['./day-stat.component.scss']
})
export class DayStatComponent implements OnInit {
  @Input() userId!: number;
  @Input() subjectId!: number;
  public chart: any;
  marks!: Mark[];
  correctAns!: number[];
  incorrectAns!: number[];
  dateLabel!: string[];
  correctAnsLabel: string = '';
  incorrectAnsLabel: string = '';
  lang!: string;

  constructor(
    private markService: MarkService,
    private languageService: LanguageService,
    private translation: TranslationService
  ) {
    this.correctAns = [];
    this.incorrectAns = [];
    this.dateLabel = [];
  }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.lang = lang;
      this.updateChartLabels();
    });
    this.markService.getMarksByDays(this.userId, this.subjectId).subscribe(data => {
      this.marks = data;
      this.marks.forEach(value => {
        this.correctAns.push(value.correct_answers);
        this.incorrectAns.push(value.total_questions - value.correct_answers);
        this.dateLabel.push(value.created_date + '');
      });
      this.createChart();
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['userId'] &&
      !changes['userId'].firstChange &&
      !changes['userId'].isFirstChange()
    ) {
      this.updateChart();
    }

    if (
      changes['subjectId'] &&
      !changes['subjectId'].firstChange &&
      !changes['subjectId'].isFirstChange()
    ) {
      this.updateChart();
    }
  }
  private updateChart() {
    // Обновление диаграммы на основе новых значений userId и subjectId
    this.markService.getMarksByDays(this.userId, this.subjectId).subscribe(data => {
      // Обновление данных для диаграммы
      this.marks = data;
      this.correctAns = [];
      this.incorrectAns = [];
      this.dateLabel = [];
      this.marks.forEach(value => {
        this.correctAns.push(value.correct_answers);
        this.incorrectAns.push(value.total_questions - value.correct_answers);
        this.dateLabel.push(value.created_date + '');
      });

      // Обновление меток на диаграмме
      this.updateChartLabels();

      // Пересоздание диаграммы
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();

      console.log(data);
    }, error => {
      console.log(error);
    });
  }


  private updateChartLabels() {
    this.correctAnsLabel = this.translation.translate('CORRECT', this.lang);
    this.incorrectAnsLabel = this.translation.translate('INCORRECT', this.lang);

    this.chart.data.labels = this.dateLabel;
    this.chart.data.datasets[0].label = this.correctAnsLabel;
    this.chart.data.datasets[1].label = this.incorrectAnsLabel;
    this.chart.update();
  }

  createChart() {
    this.correctAnsLabel = this.translation.translate('CORRECT', this.lang);
    this.incorrectAnsLabel = this.translation.translate('INCORRECT', this.lang);

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.dateLabel,
        datasets: [
          {
            label: this.correctAnsLabel,
            data: this.correctAns,
            backgroundColor: 'limegreen'
          },
          {
            label: this.incorrectAnsLabel,
            data: this.incorrectAns,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio: 3
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }
}
