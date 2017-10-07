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
  historyData: any;
  historyOptions: any;
  @ViewChild('nvd3') nvd3: any;

  constructor() {
    let x = 0;
    setInterval(() => {
      this.realTimeData[0].values.push({ x: x, y: Math.random() - 5 });
      if (this.realTimeData[0].values.length > 200) {
        this.realTimeData[0].values.shift();
      }
      x++;
      this.nvd3.chart.update();
    }, 1000);
  }

  ngOnInit() {
    this.isLoading = false;
    this.historyOptions = {
      chart: {
        type: 'candlestickBarChart',
        height: 200,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 60
        },
        x: function (d: any) { return d['date']; },
        y: function (d: any) { return d['close']; },
        duration: 100,

        xAxis: {
          axisLabel: 'Dates',
          tickFormat: function (d: any) {
            return d3.time.format('%x')(new Date((20000 * 86400000) + (d * 86400000)));
          },
          showMaxMin: false
        },

        yAxis: {
          axisLabel: 'Stock Price',
          tickFormat: function (d: any) {
            return '$' + d3.format(',.1f')(d);
          },
          showMaxMin: false
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };
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

    this.historyData = [{
      values: [
        {
          'date': 15854,
          'open': 165.42,
          'high': 165.8,
          'low': 164.34,
          'close': 165.22,
          'volume': 160363400,
          'adjusted': 164.35
        },
        {
          'date': 15855,
          'open': 165.35,
          'high': 166.59,
          'low': 165.22,
          'close': 165.83,
          'volume': 107793800,
          'adjusted': 164.96
        },
        {
          'date': 15856,
          'open': 165.37,
          'high': 166.31,
          'low': 163.13,
          'close': 163.45,
          'volume': 176850100,
          'adjusted': 162.59
        },
        {
          'date': 15859,
          'open': 163.83,
          'high': 164.46,
          'low': 162.66,
          'close': 164.35,
          'volume': 168390700,
          'adjusted': 163.48
        },
        {
          'date': 15860,
          'open': 164.44,
          'high': 165.1,
          'low': 162.73,
          'close': 163.56,
          'volume': 157631500,
          'adjusted': 162.7
        },
        {
          'date': 15861,
          'open': 163.09,
          'high': 163.42,
          'low': 161.13,
          'close': 161.27,
          'volume': 211737800,
          'adjusted': 160.42
        },
        {
          'date': 15862,
          'open': 161.2,
          'high': 162.74,
          'low': 160.25,
          'close': 162.73,
          'volume': 200225500,
          'adjusted': 161.87
        },
        {
          'date': 15863,
          'open': 163.85,
          'high': 164.95,
          'low': 163.14,
          'close': 164.8,
          'volume': 188337800,
          'adjusted': 163.93
        },
        {
          'date': 15866,
          'open': 165.31,
          'high': 165.4,
          'low': 164.37,
          'close': 164.8,
          'volume': 105667100,
          'adjusted': 163.93
        },
        {
          'date': 15867,
          'open': 163.3,
          'high': 164.54,
          'low': 162.74,
          'close': 163.1,
          'volume': 159505400,
          'adjusted': 162.24
        },
        {
          'date': 15868,
          'open': 164.22,
          'high': 164.39,
          'low': 161.6,
          'close': 161.75,
          'volume': 177361500,
          'adjusted': 160.9
        },
        {
          'date': 15869,
          'open': 161.66,
          'high': 164.5,
          'low': 161.3,
          'close': 164.21,
          'volume': 163587800,
          'adjusted': 163.35
        },
        {
          'date': 15870,
          'open': 164.03,
          'high': 164.67,
          'low': 162.91,
          'close': 163.18,
          'volume': 141197500,
          'adjusted': 162.32
        },
        {
          'date': 15873,
          'open': 164.29,
          'high': 165.22,
          'low': 163.22,
          'close': 164.44,
          'volume': 136295600,
          'adjusted': 163.57
        },
        {
          'date': 15874,
          'open': 164.53,
          'high': 165.99,
          'low': 164.52,
          'close': 165.74,
          'volume': 114695600,
          'adjusted': 164.87
        },
        {
          'date': 15875,
          'open': 165.6,
          'high': 165.89,
          'low': 163.38,
          'close': 163.45,
          'volume': 206149500,
          'adjusted': 162.59
        }]
    }];

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
