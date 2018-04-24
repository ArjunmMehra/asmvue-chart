import mixins from './mixins/index.js'

import { BaseChart, generateChart } from './BaseCharts'

const VueCharts = {
  BaseChart,
  mixins,
  generateChart
}

export default VueCharts

export {
  VueCharts,
  BaseChart,
  mixins,
  generateChart
}
