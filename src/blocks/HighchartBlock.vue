<template>
  <div class="highcharts-block dashboard-tile-shadow"
       role="region"
       :aria-label="sanitizedOptions?.title?.text || sanitizedOptions?.title"
       data-testid="chart-region">

    <Chart :highcharts="Highcharts"
           :options="sanitizedOptions"
           data-testid="chart"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {Chart} from 'highcharts-vue';
import type {Options as HighchartsOptions} from 'highcharts';
import Highcharts from 'highcharts';

import PatternFill from 'highcharts/modules/pattern-fill';
import Exporting from 'highcharts/modules/exporting';
import Accessibility from 'highcharts/modules/accessibility';
import Sankey from 'highcharts/modules/sankey';
import Funnel from 'highcharts/modules/funnel';

// Initialize modules before anything renders
PatternFill(Highcharts);
Exporting(Highcharts);
Accessibility(Highcharts);
Sankey(Highcharts);
Funnel(Highcharts);

// Global Highcharts options
Highcharts.setOptions({
  chart: {style: {fontFamily: ''}},
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        style: {fontSize: '1.25rem', textOutline: 'none', opacity: 1}
      }
    }
  },
  colors: ["#78356A", "#DDA9D2", "#241E45", "#CF7E0C", "#006C95", "#3F357A"],
  accessibility: {
    enabled: true,
    point: {
      valueDescriptionFormat: 'On {xDescription}, there were {point.y}'
    }
  }
});

// Sankey gradient override
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
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 0},
            stops: [
              [0, H.color(color).setOpacity(opacity).get()],
              [1, H.color(point.toNode ? point.toNode.color : color).setOpacity(opacity).get()],
            ]
          }
    };
  });
})(Highcharts);

// Props
const rawOptions = defineProps<HighchartsOptions>();

// Computed sanitized options based on chart type
const sanitizedOptions = computed<HighchartsOptions>(() => {
  const options = JSON.parse(JSON.stringify(rawOptions)); // deep clone to avoid mutation
  const chartType = options.chart?.type || '';

  const axisBased = ['line', 'column', 'bar', 'area'];

  if (!axisBased.includes(chartType)) {
    delete options.xAxis;
    delete options.yAxis;
    if (options.plotOptions?.series?.pointStart) {
      delete options.plotOptions.series.pointStart;
    }
  }

  // Explicitly disable crosshair unless specified
  if (axisBased.includes(chartType) && options.xAxis) {
    if (Array.isArray(options.xAxis)) {
      options.xAxis = options.xAxis.map(x => ({...x, crosshair: false}));
    } else {
      options.xAxis.crosshair = false;
    }
  }

  return options;
});
</script>

<style scoped></style>
