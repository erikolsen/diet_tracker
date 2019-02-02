import React from "react"
import Highcharts from 'highcharts'
require('highcharts/highcharts-3d')(Highcharts);
import HighchartsReact from 'highcharts-react-official'

class PieChart extends React.Component {
  pieData(data){
    return {
      chart: {
        type: 'pie',
      },
      credits: {
        enabled: false
      },
      colors: ['#ef5753', '#ffed4a', '#38c172'],
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
          type: 'pie',
          name: 'Percent of Diet',
          data: data
      }],
      title: {
        text: 'Macronutrients Daily Percentage<br/>Total Calories Today: ' + this.props.calories
      }
    }
  }


  render () {
    let options = this.pieData([
      [`Protein ${this.props.protein}%`, this.props.protein],
      [`Fats ${this.props.fats}%`, this.props.fats],
      [`Carbs ${this.props.carbs}%`, this.props.carbs],
    ])
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    );
  }
}

export default PieChart
