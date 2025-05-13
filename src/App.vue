<template>
  <HighchartWrapper
      title="Highcharts Wrapper Example"
      :layout="layout"
      :items="items"
  />
</template>

<script setup lang="ts">
import HighchartWrapper from './components/HighchartWrapper.vue';
import {BlockItem, LayoutGrid} from "./types";

const layout: LayoutGrid = [[2, 1], [1, 1, 1], [1, 2], [2, 1], [3]];
const items: BlockItem[] = [
  {
    id: 1,
    type: 'chart',
    title: 'Symptom Severity Change',
    options: {
      chart: {type: 'column'},
      title: {text: 'Symptom Severity Change'},
      xAxis: {title: {text: 'Percent'}},
      yAxis: {title: {text: 'Percent'}},
      plotOptions: {
        column: {
          stacking: 'percent',
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f}%',
            filter: {operator: '>', property: 'percentage', value: 10}
          }
        }
      },
      colors: ['#006C95', '#241E45', '#3F357A', '#B31166', '#F7F6F7'],
      series: [
        {type: 'column', name: 'Moderately severe depression symptoms', data: [434, 290, 37]},
        {type: 'column', name: 'Significant weight loss', data: [272, 153, 156]},
        {type: 'column', name: 'Psychomotor retardation', data: [13, 7, 22]},
        {type: 'column', name: 'Fatigue or loss of energy', data: [55, 35, 41]}
      ],
      responsive: {
        rules: [{
          condition: {maxWidth: 576},
          chartOptions: {plotOptions: {column: {dataLabels: {enabled: false}}}}
        }]
      }
    }
  },
  {
    id: 2,
    type: 'callout',
    title: 'Addiction Medicine Program',
    options: {
      title: 'Addiction Medicine Program',
      description: 'Combines 24/7 medical care with a highly structured program using proven therapies for behavioural change over six weeks'
    }
  },
  {
    id: 3,
    type: 'title',
    title: 'Average Score Improvement',
    options: {title: '-35%', description: 'Average Score Improvement'}
  },
  {
    id: 4,
    type: 'title',
    title: '# of Patient that Complete Assessment',
    options: {title: '8', description: '# of Patient that Complete Assessment'}
  },
  {
    id: 5,
    type: 'chart',
    title: 'Assessment Scores by Assessment Number',
    options: {
      title: {text: 'Assessment Scores by Assessment Number'},
      xAxis: {title: {text: 'Percent'}, categories: ['Jan', 'Feb', 'Mar']},
      yAxis: [{title: {text: 'Percent'}}, {title: {text: 'Assessments Completed'}, opposite: true}],
      series: [
        {type: 'column', name: 'Moderately severe depression symptoms', data: [45.7, 37, 28.9]},
        {type: 'column', name: 'Clinical Symptoms', data: [12, 22, 55]}
      ]
    }
  },
  {
    id: 6,
    type: 'chart',
    title: 'Patient by # of Assessment Completed',
    options: {
      chart: {type: 'pie'},
      title: {text: 'Patient by # of Assessment Completed'},
      plotOptions: {
        series: {
          dataLabels: {
            format: '{point.percentage:.1f}%',
            filter: {operator: '>', property: 'percentage', value: 10}
          }
        }
      },
      series: [
        {
          type: 'pie',
          name: 'Percentage',
          data: [
            {name: '1', y: 55.02},
            {name: '2', y: 26.71},
            {name: '3', y: 1.09},
            {name: '4', sliced: true, selected: true, y: 22.41},
            {name: '5', y: 17.29},
            {name: '6', y: 2.37}
          ]
        }
      ]
    }
  },
  {
    id: 7,
    type: 'callout',
    title: 'Addiction Medicine Program – Substance Use',
    options: {
      title: 'Addiction Medicine Program – Substance Use',
      description: 'This concurrent (co-occurring) program allows individuals time to fully explore the intersection of their mental health and substance use issues while learning skills they need for lasting recovery. The connections between mental health and substance use can be complex, and both issues deserve and require evidence-based therapies to support recovery and wellness.'
    }
  },
  {
    id: 8,
    type: 'chart',
    title: 'Patient by # of Assessment Completed',
    options: {
      chart: {type: 'area'},
      title: {text: 'Patient by # of Assessment Completed'},
      yAxis: {title: {text: 'Percent'}},
      plotOptions: {series: {pointStart: 3}, area: {stacking: 'normal', lineColor: '#666', lineWidth: 1}},
      series: [
        {type: 'area', name: 'First Assessment', data: [66, 65, 63, 63, 62, 57, 56, 50, 59, 58, 88]},
        {type: 'area', name: 'Severe depression symptoms', data: [42, 42, 41, 51, 70, 55, 55, 54, 15, 76, 35]},
        {
          type: 'area',
          name: 'Moderately severe depression symptoms',
          data: [13, 12, 11, 17, 10, 12, 15, 16, 15, 13, 13]
        }
      ]
    }
  },
  {
    id: 9,
    type: 'chart',
    title: 'Recovery',
    options: {
      chart: {type: 'funnel'},
      title: {text: 'Recovery'},
      plotOptions: {series: {dataLabels: {inside: true, format: '{point.percentage:.1f}%'}, showInLegend: true}},
      colors: ['#006C95', '#241E45', '#3F357A', '#B31166'],
      series: [
        {
          type: 'funnel',
          name: 'Percentage',
          data: [
            {name: 'Patients with casennes on first assignment', y: 3799},
            {name: 'Patients recovered on most recent assessment', y: 1749}
          ]
        }
      ]
    }
  },
  {
    id: 10,
    type: 'chart',
    title: 'Symptom Severity Flow',
    options: {
      chart: {type: 'sankey'},
      title: {text: 'Symptom Severity Flow'},
      legend: {enabled: true},
      series: [
        {
          type: 'sankey',
          dataLabels: {
            style: {
              color: '#000',
              fontSize: '1rem',
              textOutline: 'none',
              opacity: 1
            },
            padding: 30
          },
          data: [
            {from: 'L1', to: 'R1', weight: 16560},
            {from: 'L2', to: 'R1', weight: 43422},
            {from: 'L3', to: 'R3', weight: 63636},
            {from: 'L1', to: 'R3', weight: 54252},
            {from: 'L3', to: 'R2', weight: 25255}
          ],
          nodes: [
            {id: 'L1', name: 'Minimal or no depression symptoms', color: '#78356A'},
            {id: 'R1', name: 'Minimal or no depression symptoms', color: '#78356A'},
            {id: 'L2', name: 'Mild depression symptoms', color: '#006C95'},
            {id: 'R2', name: 'Mild depression symptoms', color: '#006C95'},
            {id: 'L3', name: 'Severe depression symptoms', color: '#CF7E0C'},
            {id: 'R3', name: 'Severe depression symptoms', color: '#CF7E0C'}
          ]
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 768
            },
            chartOptions: {
              series: [
                {
                  type: 'sankey',
                  dataLabels: {
                    style: {
                      opacity: 0
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
];
</script>
