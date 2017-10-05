import 'rxjs/add/operator/finally';
import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectionStrategy } from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  options: any;
  data: any;
  realTimeData: any;
  realTimeOptions: any;
  @ViewChild('nvd3') nvd3: any;

  constructor() {
    let x = 0;
    setInterval(() => {
      this.realTimeData[0].values.push({ x: x,	y: Math.random() - 5});
      if (this.realTimeData[0].values.length > 200) {
        this.realTimeData[0].values.shift();
      }
      x++;
      this.nvd3.chart.update();
     }, 1000);
  }

  ngOnInit() {
    this.isLoading = false;
    this.realTimeOptions = {
      chart: {
        type: 'lineChart',
        height: 180,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d: any) { return d.x; },
        y: function (d: any) { return d.y; },
        useInteractiveGuideline: true,
        duration: 500,
        yAxis: {
          tickFormat: function (d: any) {
            return d3.format('.01f')(d);
          }
        }
      }
    };
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d: any) { return d.x; },
        y: function (d: any) { return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (ms)'
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function (d: any) {
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };
    this.data = this.sinAndCos();
    this.realTimeData = [{ values: [], key: 'Random Walk' }];

  }

  sinAndCos() {
    const sin = [], sin2 = [], cos = [];
    // Data is represented as an array of {x,y} pairs.
    for (let i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / 10) });
      sin2.push({ x: i, y: i % 10 === 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
      cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
    }

    // Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      // values - represents the array of {x,y} data points
        key: 'Sine Wave', // key  - the name of the series.
        color: '#ff7f0e'  // color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave',
        color: '#7777ff',
        area: true      // area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }

}
