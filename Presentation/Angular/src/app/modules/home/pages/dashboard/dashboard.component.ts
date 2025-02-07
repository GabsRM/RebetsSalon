import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { BestSellingProduct, InvoiceService } from 'src/app/api';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  title = 'ng2-charts-demo';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
  ];
  public pieChartDatasets = [
    {
      data: [10, 10],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public lineChartData: ChartConfiguration<'line'>['data'];

  public historicChartData: ChartConfiguration<'line'>['data'];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Producto 1',
      'Producto 2',
      'Producto 3',
      'Producto 4',
      'Producto 5',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: 'Ventas',
        backgroundColor: 'white',
        barThickness: 'flex',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    color: 'white',
    elements: {
      bar: {
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
      },
    },
    plugins: {
      legend: {
        maxHeight: 10,
      },
    },
  };

  public bestSellings: BestSellingProduct[];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.apiInvoicePerMonthGet$Json().subscribe({
      next: ({ data }) => {
        const historicChartData: ChartConfiguration<'line'>['data'] = {
          labels: data.map((x) => `${x.month}/${x.year}`),
          datasets: [
            {
              data: data.map((x) => x.invoiceCount),
              label: 'Series A',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(68, 16, 75, 0.5)',
            },
          ],
        };

        this.historicChartData = historicChartData;

        const currentYearData = data.filter((x) => x.year === moment().year());
        const lineChartData: ChartConfiguration<'line'>['data'] = {
          labels: currentYearData.map((x) => `${x.month}/${x.year}`),
          datasets: [
            {
              data: currentYearData.map((x) => x.invoiceCount),
              label: 'Series A',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(68, 16, 75, 0.5)',
            },
          ],
        };

        this.lineChartData = lineChartData;
      },
    });

    this.invoiceService.apiInvoiceTypePerMonthGet$Json().subscribe({
      next: ({ data }) => {
        this.pieChartDatasets = [{ data: data.map((x) => x.invoiceCount) }];
        this.pieChartLabels = data.map((x) => [x.type]);
      },
    });

    this.invoiceService.apiInvoiceBestSellingsGet$Json().subscribe({
      next: ({ data }) => {
        this.bestSellings = data;
        const barChartData: ChartConfiguration<'bar'>['data'] = {
          labels: [],
          datasets: [
            {
              data: [],
              label: 'Ventas',
              backgroundColor: 'white',
              barThickness: 'flex',
            },
          ],
        };

        data.forEach((x) => {
          barChartData.labels.push(x.productId);
          barChartData.datasets[0].data.push(x.sales);
        });

        this.barChartData = barChartData;
      },
    });
  }
}
