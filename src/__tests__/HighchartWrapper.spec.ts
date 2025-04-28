import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import HighchartWrapper from '../HighchartWrapper.vue';
import { BlockItem } from '../types';

const APIResponse = {
  status: 'SUCCESS',
  message: 'success',
  attributes: [
    { name: 'system-version', value: '@BUILDNUMBER@' },
    { name: 'response-timestamp', value: 1745860813 },
    { name: 'requester-ip', value: '::1' },
  ],
  payload: [
    {
      id: 1,
      type: 'chart',
      options: {
        chart: { type: 'column' },
        title: { text: 'Symptom Severity Change' },
        xAxis: { title: { text: 'Percent' } },
        yAxis: { title: { text: 'Percent' } },
        plotOptions: {
          column: {
            stacking: 'percent',
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f}%',
              filter: { operator: '\u003E', property: 'percentage', value: 10 },
            },
          },
        },
        colors: ['#006C95', '#241E45', '#3F357A', '#B31166', '#F7F6F7'],
        series: [
          {
            name: 'Moderately severe depression symptoms',
            data: [434, 290, 37],
          },
          { name: 'Significant weight loss', data: [272, 153, 156] },
          {
            name: 'Psychomotor retardation',
            data: [13, 7, 22],
          },
          { name: 'Fatigue or loss of energy', data: [55, 35, 41] },
        ],
        responsive: {
          rules: [
            {
              condition: { maxWidth: 576 },
              chartOptions: { plotOptions: { column: { dataLabels: { enabled: false } } } },
            },
          ],
        },
      },
    },
    {
      id: 2,
      type: 'callout',
      options: {
        title: 'Addiction Medicine Program',
        description:
          'Combines 24\/7 medical care with a highly structured program using proven therapies for behavioural change over six weeks',
      },
    },
    { id: 3, type: 'title', options: { title: '-35%', description: 'Average Score Improvement' } },
    {
      type: 'title',
      options: { title: '8', description: '# of Patient that Complete Assessment' },
    },
    {
      id: 4,
      type: 'chart',
      options: {
        title: { text: 'Assessment Scores by Assessment Number' },
        xAxis: { title: { text: 'Percent' }, categories: ['Jan', 'Feb', 'Mar'] },
        yAxis: [
          { title: { text: 'Percent' } },
          { title: { text: 'Assessments Completed' }, opposite: true },
        ],
        series: [
          {
            type: 'column',
            name: 'Moderately severe depression symptoms',
            data: [45.7, 37, 28.9],
          },
          { fillColor: 'url(#custom-pattern)', name: 'Clinical Symptoms', data: [12, 22, 55] },
        ],
      },
    },
    {
      id: 5,
      type: 'chart',
      options: {
        chart: { type: 'pie' },
        title: { text: 'Patient by # of Assessment Completed' },
        plotOptions: {
          series: {
            dataLabels: {
              distance: -50,
              format: '{point.percentage:.1f}%',
              filter: { operator: '\u003E', property: 'percentage', value: 10 },
            },
          },
        },
        series: [
          {
            name: 'Percentage',
            data: [
              { name: '1', y: 55.02 },
              { name: '2', y: 26.71 },
              { name: '3', y: 1.09 },
              {
                name: '4',
                sliced: true,
                selected: true,
                y: 22.41,
              },
              { name: '5', y: 17.29 },
              { name: '6', y: 2.37 },
            ],
          },
        ],
      },
    },
    {
      id: 6,
      type: 'callout',
      options: {
        title: 'Addiction Medicine Program \u2013 Substance Use',
        description:
          '\u003Cp\u003EThis concurrent (co-occurring) program allows individuals time to fully explore the intersection of their mental health and substance use issues while learning skills they need for lasting recovery.\u003C\/p\u003E\u003Cp\u003EThe connections between mental health and substance use can be complex, and both issues deserve and require evidence-based therapies to support recovery and wellness.\u003C\/p\u003E',
      },
    },
    {
      id: 7,
      type: 'chart',
      options: {
        chart: { type: 'area' },
        title: { text: 'Patient by # of Assessment Completed' },
        yAxis: { title: { text: 'Percent' } },
        plotOptions: {
          series: { pointStart: 3 },
          area: { stacking: 'normal', lineColor: '#666666', lineWidth: 1 },
        },
        series: [
          {
            name: 'First Assessment',
            data: [66, 65, 63, 63, 62, 57, 56, 50, 59, 58, 88],
          },
          {
            name: 'Severe depression symptoms',
            data: [42, 42, 41, 51, 70, 55, 55, 54, 15, 76, 35],
          },
          {
            name: 'Moderately severe depression symptoms',
            data: [13, 12, 11, 17, 10, 12, 15, 16, 15, 13, 13],
          },
        ],
      },
    },
    {
      id: 8,
      type: 'chart',
      options: {
        chart: { type: 'funnel' },
        title: { text: 'Recovery' },
        plotOptions: {
          series: {
            dataLabels: { inside: true, format: '{point.percentage:.1f}%' },
            showInLegend: true,
          },
        },
        colors: ['#006C95', '#241E45', '#3F357A', '#B31166'],
        series: [
          {
            name: 'Percentage',
            data: [
              {
                name: 'Patients with casennes on first assignment',
                y: 3799,
              },
              { name: 'Patients recovered on most recent assessment', y: 1749 },
            ],
          },
        ],
      },
    },
    {
      id: 9,
      type: 'chart',
      options: {
        chart: { type: 'sankey' },
        title: { text: 'Symptom Severity Flow' },
        legend: { enabled: true },
        series: [
          {
            dataLabels: {
              style: {
                color: '#000000',
                fontSize: '1rem',
                textOutline: 'none',
                opacity: 1,
              },
              padding: 30,
            },
            data: [
              { from: 'L1', to: 'R1', weight: 16560 },
              {
                from: 'L2',
                to: 'R1',
                weight: 43422,
              },
              { from: 'L3', to: 'R3', weight: 63636 },
              {
                from: 'L1',
                to: 'R3',
                weight: 54252,
              },
              { from: 'L3', to: 'R2', weight: 25255 },
            ],
            nodes: [
              { id: 'L1', name: 'Minimal or no depression symptoms', color: '#78356A' },
              {
                id: 'R1',
                name: 'Minimal or no depression symptoms',
                color: '#78356A',
              },
              { id: 'L2', name: 'Mild depression symptoms', color: '#006C95' },
              {
                id: 'R2',
                name: 'Mild depression symptoms',
                color: '#006C95',
              },
              { id: 'L3', name: 'Severe depression symptoms', color: '#CF7E0C' },
              {
                id: 'R3',
                name: 'Severe depression symptoms',
                color: '#CF7E0C',
              },
            ],
          },
        ],
        responsive: {
          rules: [
            {
              condition: { maxWidth: 768 },
              chartOptions: {
                series: [
                  { dataLabels: { style: { opacity: '0' } } },
                  {
                    colorByPoint: false,
                    type: 'sankey',
                    showInLegend: true,
                    color: '#78356A',
                    name: 'Minimal or no depression symptoms',
                  },
                  {
                    colorByPoint: false,
                    type: 'sankey',
                    showInLegend: true,
                    color: '#006C95',
                    name: 'Mild depression symptoms',
                  },
                  {
                    colorByPoint: false,
                    type: 'sankey',
                    showInLegend: true,
                    color: '#CF7E0C',
                    name: 'Severe depression symptoms',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
};

describe('HighchartWrapper', () => {
  it("Renders fallback when items, or api endpoint isn't provided", () => {
    render(HighchartWrapper, {
      props: { title: null, endpoint: null, items: null, layout: null },
    });
    expect(
      screen.getByText('Please provide an items object or API endpoint to obtain data from.')
    ).toBeTruthy();
  });

  it('Renders items', () => {
    render(HighchartWrapper, {
      props: {
        title: 'Clinical Outcomes Dashboard',
        items: APIResponse.payload.slice(0, 1) as BlockItem[],
      },
    });

    expect(screen.getByText('Clinical Outcomes Dashboard')).toBeTruthy();
  });
});
