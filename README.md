# HomewoodHealth-Highchart-wrapper

## Installation

```bash
npm install @your-scope/your-component-name
```

## Usage

```javascript
import YourComponent from '@your-scope/your-component-name'
app.component('YourComponent', YourComponent)
```

## Props

| Name      | Type     | Required | Default   | Description                      |
|-----------|----------|----------|-----------|----------------------------------|
| `title`   | `string` | No       | `"Chart"` | Chart title                      |
| `items`   | `array`  | Yes      | `[]`      | Items to plot                    |
| `endpoint`| `string` | No       | `null`    | API endpoint for remote data     |
