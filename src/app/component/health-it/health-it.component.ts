import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-health-it',
  templateUrl: './health-it.component.html',
  styleUrls: ['./health-it.component.css']
})
export class HealthItComponent implements OnChanges {
  @Input() isToggleSelected: string = 'health-it';

  store: any = {};
  chartSection: any[] = [];
  categoryKeys: string[] = [];
  averages: number[] = [];
  halfScores: { development: any[]; building: any[] } = { development: [], building: [] };

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isToggleSelected']) {
      this.resetData();
      const endPoint = this.isToggleSelected === 'health-it' ? '1/14/2021' : '2/14/2021';
      this.authService.passData(endPoint).subscribe(data => {
        this.store = data;
        console.log(data)
        this.processData('Present Development');
      });
    }
  }

  resetData(): void {
    this.chartSection = [];
    this.averages = [];
    this.halfScores = { development: [], building: [] };
  }

  processData(developmentKey: string): void {
    const developmentData = this.store[developmentKey];
    if (!developmentData) return;

    this.categoryKeys = Object.keys(developmentData).sort();
    const presentData = this.categoryKeys.map(key => developmentData[key]);

    this.calculateScores(presentData);
    this.generateChartSection();
  }

  calculateScores(data: any[]): void {
    data.forEach(category => {
      let totalScore = 0;

      if (Array.isArray(category)) {
        category.forEach((item, index) => {
          const score = Math.round(parseInt(item.score, 10) / 2);
          totalScore += score * 2;

          if (index === 0) this.halfScores.development.push({ score, name: item.ultimate_name });
          if (index === 1) this.halfScores.building.push({ score, name: item.ultimate_name });
        });
      }

      this.averages.push(Math.round(totalScore / 2));
    });
  }

  generateChartSection(): void {
    this.chartSection = this.averages.map((average, index) =>
      this.createPieChart(average, this.halfScores.building[index], this.halfScores.development[index])
    );
  }

  createPieChart(average: number, buildingData: any, developmentData: any): any {
    const remaining = 100 - average;

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '50%'],
          label: {
            show: true,
            position: 'center',
            formatter: `${average}%`,
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333'
          },
          data: [
            { value: buildingData?.score || 0, name: buildingData?.name || 'N/A', itemStyle: { color: '#0073e6' } },
            { value: developmentData?.score || 0, name: developmentData?.name || 'N/A', itemStyle: { color: '#009f7c' } },
            { value: remaining, name: '', itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    };
  }
}
