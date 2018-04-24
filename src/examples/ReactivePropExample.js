import { BaseChart } from '../BaseCharts'
import { reactiveProp } from '../mixins'

export default {
  extends: BaseChart,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    chartType: 'bar'
  }),

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
