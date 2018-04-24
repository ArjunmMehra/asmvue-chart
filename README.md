
# asmvue-chart

**asmvue-chart** is a wrapper for [Chart.js](https://github.com/chartjs/Chart.js) in vue. You can easily create reuseable chart components.

### Compatibility

- v1 later `@legacy`
  - Vue.js 1.x
- v2 later
  - Vue.js 2.x

## Install

- **yarn** install: `yarn add asmvue-chart chart.js`
- **npm** install: `npm install asmvue-chart chart.js --save`


You can then simply register your component:

```js
Vue.component('chart', {
   extends: BaseChart,
  data () {
    return {
      chartType: 'bar'
    }
  },
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
```

## How to use

You need to import the component and then either use `extends` or `mixins` and add it.

You can import the whole package.

```javascript
import VueCharts from 'AsmVueChart'
```

Just create your own component.

```javascript
// CommitChart.js
import VueCharts from 'AsmVueChart'

export default {
  extends: VueCharts.BaseChart,
  props: {
    chartType: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
}
```

Then simply import and use your own extended component and use it like a normal vue component


## Reactivity

Chart.js does not update or re-render the chart if new data is passed.
However, you can simply implement this on your own or use one of the two mixins which are included.

- `reactiveProp`
- `reactiveData`

Both are included in the `mixins` module.

The mixins automatically create `chartData` as a prop or data. And add a watcher. If data has changed, the chart will update.
However, keep in mind the limitations of vue and javascript for mutations on arrays and objects.
**It is important that you pass your options in a local variable named `options`!**
The reason is that if the mixin re-renders the chart it calls `this.renderChart(this.chartData, this.options`)` so don't pass in the options object directly or it will be ignored.

```javascript
// MonthlyIncome.js
import VueCharts from 'AsmVueChart'

export default {
  extends: VueCharts.BaseChart,
   props: {
    chartType: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  mixins: [VueCharts.mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}

// Load speperate modules with destructure assign
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
```

## Single File Components

You can create your components in Vues single file components. However it is important that you **do not** have the `<template></template>` included. Because Vue can't merge templates. And the template is included in the mixin. If you leave the template tag in your component, it will overwrite the one which comes from the base chart and you will have a blank screen.

