# Highchart / Block Layout Wrapper

![CI](https://github.com/cpayneHH/Highchart-wrapper/actions/workflows/ci.yml/badge.svg)

A lightweight Vue 3 component that simplifies the integration of Highcharts into your page layouts. It supports dynamic
data sources, including remote APIs, and allows for conditional loading of Highcharts modules to optimize performance.

## 🚀 Features

- **Vue 3 Compatible**: Seamlessly integrates with Vue 3 applications.
- **Dynamic Data Loading**: Fetch chart data from remote APIs using the `endpoint` prop.
- **Modular Architecture**: Conditionally load Highcharts modules (e.g., exporting, accessibility, pattern fills) to
  reduce bundle size.
- **Flexible Configuration**: Easily customize chart types and options through props.

## 📦 Installation

Install the package via npm:

```bash
yarn add ../Highchart-wrapper
```

## 🛠️ Usage

Import and register the component in your Vue application:

```javascript
import {createApp} from 'vue';
import HighchartWrapper from 'highchart-wrapper';

const app = createApp(App);
app.component('HighchartWrapper', HighchartWrapper);
```

Use the component in your templates:

```html

<HighchartWrapper
        title="Sales Overview"
        endpoint="https://api.example.com/data"
/>
```

Or raw items using this prop.

```html

<HighchartWrapper
        title="Sales Overview"
        items="[{...}, {...}]"
/>
```

Both the api or raw items need to following the following object shapes.

```javascript
const data = {
  "id": 1, // Any unique id for the instance of the chart. ( this is used for :key values in vue3 )
  "type": "chart",  // One of the three types of blocks chart, callout, Tile block
  "options": {} // The object that defines the chart or a simple object for callout and tile block 
}
```

For example, here is a simple Highcharts options definition:
See here for additional [documentation](https://www.highcharts.com/docs/chart-and-series-types/chart-types)

```javascript
const options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Corn vs wheat estimated production for 2023'
  },
  subtitle: {
    text:
        'Source: <a target="_blank" ' +
        'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
  },
  xAxis: {
    categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
    crosshair:
        true,
    accessibility:
        {
          description: 'Countries'
        }
  },
  yAxis: {
    min: 0,
    title:
        {
          text: '1000 metric tons (MT)'
        }
  },
  tooltip: {
    valueSuffix: ' (1000 MT)'
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth:
          0
    }
  },
  series: [
    {
      name: 'Corn',
      data: [387749, 280000, 129000, 64300, 54000, 34300]
    },
    {
      name: 'Wheat',
      data: [45321, 140000, 10000, 140500, 19500, 113500]
    }
  ]
}
```

And here are the two alternative blocks currently supported

```javascript
const options = {
  title: 'Fantastic Layout and Charts',
  description: 'Three block types, grid based layout system.'
}
```

## ⚙️ Props

| Name       | Type     | Required | Default   | Description                             |
|------------|----------|----------|-----------|-----------------------------------------|
| `title`    | `string` | No       | `"Chart"` | The title displayed above the chart.    |
| `items`    | `array`  | Yes      | `[]`      | Data series to be plotted on the chart. |
| `endpoint` | `string` | No       | `null`    | API endpoint to fetch chart data.       |
| `layout`   | `array`  | No       | `null`    | Layout grid span column array.          |

## 📁 Project Structure

```
Highchart-wrapper/
src/
├── __tests__/                 # Unit tests
│   └── HighchartWrapper.spec.ts
├── blocks/                   # Layout-ready content blocks
│   ├── CalloutBlock.vue
│   ├── HighchartBlock.vue
│   └── TitleBlock.vue
├── components/               # General UI layout components
│   ├── BlockRenderer.vue     # Dynamic Block renderer
│   └── GridLayout.vue        # Layout handler
├── services/                 # Core services and utilities
│   └── api.ts                # API util
├── App.vue                   # App entry point
├── HighchartWrapper.vue
├── main.ts                   # Mounts the Vue app
├── style.scss                # Global styles
└── types.ts
```

## 🧪 Development & Testing

To start the development server:

```bash
yarn run dev
```

To run tests:

```bash
yarn run test
```

## Build

```bash
yarn run build
```

## 📄 License

See the [LICENSE](./LICENSE) file for details.
