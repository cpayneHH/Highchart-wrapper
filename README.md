# Highchart / Block Layout Wrapper

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
        :items="chartData"
        endpoint="https://api.example.com/data"
/>
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
