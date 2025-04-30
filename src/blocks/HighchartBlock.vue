<!-- src/blocks/HighchartBlock.vue -->
<template>
  <Chart :highcharts="Highcharts" :options="options" class="dashboard-tile-shadow"></Chart>
</template>

<script setup lang="ts">
import {defineProps, onMounted} from 'vue';
import {Chart} from 'highcharts-vue';
import type {Options as HighchartsOptions} from 'highcharts';
import Highcharts from 'highcharts';
import PatternFill from 'highcharts/modules/pattern-fill';
import Exporting from 'highcharts/modules/exporting';
import Accessibility from 'highcharts/modules/accessibility';
import Sankey from 'highcharts/modules/sankey';
import Funnel from 'highcharts/modules/funnel';

onMounted(() => {
  PatternFill(Highcharts);
  Exporting(Highcharts);
  Accessibility(Highcharts);
  Sankey(Highcharts);
  Funnel(Highcharts);

  // Highcharts Global Options
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: ''
      }
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          style: {
            fontSize: '1.25rem',
            textOutline: 'none',
            opacity: 1
          }
        }
      }
    },
    colors: ["#78356A", "#DDA9D2", "#241E45", "#CF7E0C", "#006C95", "#3F357A"],
    accessibility: {
      enabled: true,
      point: {
        valueDescriptionFormat:
            'On {xDescription}, there were {point.y}'
      }
    }
  });

  (function (H) {
    H.wrap(H.Series.types["sankey"].prototype, 'pointAttribs', function (proceed, point, state) {
      let opacity = this.options.linkOpacity,
          color = point.color;

      if (state && this.options.states[state]) {
        opacity = this.options.states[state].linkOpacity || opacity;
        color = this.options.states[state].color || point.color;
      }

      return {
        fill: point.isNode
            ? color
            : {
              linearGradient: {
                x1: 0,
                x2: 1,
                y1: 0,
                y2: 0,
              },
              stops: [
                [0, H.color(color).setOpacity(opacity).get()],
                [1, H.color(point.toNode.color).setOpacity(opacity).get()],
              ],
            },
      };
    });
  })(Highcharts);
});

// Just grab whatever props the story gives you
const options = defineProps<HighchartsOptions>();
</script>

<style scoped></style>
