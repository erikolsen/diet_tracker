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
        text: `<b class='text-4xl'>Total Calories Today: ${this.props.calories}</b>`,
        x: -30,
        y: 30
      }
    }
  }

  percentOfTotal(value, total){
    console.log(value)
    return Math.round((value / total) * 100)
  }

  render () {
    let newTotal = this.props.protein  + this.props.carbs  + this.props.fats
    console.log(newTotal)

    let proteinPercent = this.percentOfTotal(this.props.protein, newTotal)
    let carbPercent = this.percentOfTotal(this.props.carbs, newTotal)
    let fatPercent =this.percentOfTotal(this.props.fats, newTotal)

    let options = this.pieData([
      [`<span class='text-3xl'>Protein ${proteinPercent}%</span>`, proteinPercent],
      [`</span class='text-3xl'>Fats ${fatPercent}%</span>`, fatPercent],
      [`</span class='text-3xl'>Carbs ${carbPercent}%</span>`, carbPercent],
    ])
    return (
      <HighchartsReact highcharts={Highcharts} options={options} />
    );
  }
}

export default PieChart
