import React from "react"
import Meal from "./Meal"
import _ from 'lodash'

import PropTypes from "prop-types"
import Highcharts from 'highcharts'
require('highcharts/highcharts-3d')(Highcharts);
import HighchartsReact from 'highcharts-react-official'

const NEWMEAL = () => { return {
  protein: { grams: 0, notes: ''},
  carbs: { grams: 0, notes: ''},
  fats: { grams: 0, notes: ''},
  total: 0 }
}
class DailyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: this.props.meals || [],
      workoutNotes: '',
      cardio: false,
      weights: false
    }

    this.addMeal = this.addMeal.bind(this)
    this.removeMeal = this.removeMeal.bind(this)
    this.update = this.update.bind(this)
    this.addCardio = this.addCardio.bind(this)
    this.addWeights = this.addWeights.bind(this)
    this.addWorkoutNotes = this.addWorkoutNotes.bind(this)
  }

  addWorkoutNotes(notes){
    this.setState({workoutNotes: notes})
  }

  addCardio(){
    this.setState(prevState => ({
      cardio: !prevState.cardio
    }))
  }

  addWeights(){
    this.setState(prevState => ({
      weights: !prevState.weights
    }))
  }


  update(idx, type, attribute, value){
    const HEADERS = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    let newMeals = this.state.meals
    newMeals[idx][type.toLowerCase()][attribute] = value || ''
    fetch(this.props.updatePath,{
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({meals: newMeals})
    });
    this.setState({meals: newMeals})
  }


  addMeal(){
    this.setState(prevState => ({
      meals: [...prevState.meals, NEWMEAL()]
    }))
  }

  removeMeal(){
    let newMeals = this.state.meals
    newMeals.pop()
    this.setState(prevState => ({
      meals: newMeals
    }))
  }

  pieData(data){
    return {
      chart: {
        height: '70%',
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
      },
      credits: {
        enabled: false
      },
      colors: ['#ef5753', '#ffed4a', '#38c172'],
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                  enabled: true,
                  format: '{point.name}'
              }
          }
      },
      series: [{
          type: 'pie',
          name: 'Percent of Diet',
          data: data
      }],
      title: {
        text: `<b class='text-5xl'>Macro Breakdowns</b>`,
        x: -30,
        y: 30
      }
    }
  }

  percentOfTotal(value, total){
    return Math.round((value / total) * 100)
  }

  render () {
    let hasCardio = this.state.cardio ? 'text-blue' : ''
    let hasWeights = this.state.weights ? 'text-blue' : ''
    let newProtein = _.sum(this.state.meals.map((meal) => parseInt(meal.protein.grams ))) || 1
    let newCarbs = _.sum(this.state.meals.map((el) => parseInt(el.carbs.grams ))) || 1
    let newFats = _.sum(this.state.meals.map((el) => parseInt(el.fats.grams ))) || 1
    let newTotal = newProtein * 4 + newCarbs * 4  + newFats * 9

    let totalPercent = newProtein + newCarbs + newFats
    let proteinPercent = this.percentOfTotal(newProtein, totalPercent)
    let carbPercent = this.percentOfTotal(newCarbs, totalPercent)
    let fatPercent =this.percentOfTotal(newFats, totalPercent)

    let options = this.pieData([
      [`<span class='text-4xl'>Protein ${proteinPercent}%</span>`, proteinPercent],
      [`</span class='text-4xl'>Fats ${fatPercent}%</span>`, fatPercent],
      [`</span class='text-4xl'>Carbs ${carbPercent}%</span>`, carbPercent],
    ])

    let meals = this.state.meals.map((meal, idx) => { return <Meal
        key={idx}
        idx={idx}
        name={'Meal ' + (idx + 1)}
        update={this.update}
        protein={meal.protein}
        carbs={meal.carbs}
        fats={meal.fats}
      />
    })

    return (
      <div>
        <div className=''>
          <div className='pt-8'>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>

          <div className='flex'>
            <div className='mx-2 w-1/2'>
              <div className='border border-black text-center bg-blue-lighter p-4 text-4xl'>
                Daily Targets
              </div>
              <div className='text-3xl text-center'>
                <div className='border border-black p-4'>
                  Protein Grams(x4): { this.props.targetProteins }
                </div>
                <div className='border border-black p-4'>
                  Carbs Grams(x4): { this.props.targetCarbs }
                </div>
                <div className='border border-black p-4'>
                  Fats Grams(x9): { this.props.targetFats }
                </div>
                <div className='border border-black p-4'>
                  Total Calories: { this.props.targetCalories }
                </div>
              </div>
            </div>

            <div className='mx-2 w-1/2'>
              <div className='border border-black text-center bg-blue-lighter p-4 text-4xl'>
                Daily Totals
              </div>
              <div className='text-3xl text-center'>
                <div className='border border-black p-4'>
                  Protein Grams: { newProtein }
                </div>
                <div className='border border-black p-4'>
                  Carbs Grams: { newCarbs }
                </div>
                <div className='border border-black p-4'>
                  Fats Grams: { newFats }
                </div>
                <div className='border border-black p-4'>
                  Total Calories: { newTotal }
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className='w-full text-5xl px-2 mb-4'>
          <div className='w-full border border-black mt-2'>
            <div className={`w-full text-center border-b bg-blue-light p-8 border-black`}>
              Exercise Today
            </div>
            <div className='m-2'>
                <textarea
                  onChange={(e) => this.addWorkoutNotes(e.target.value) }
                  className='w-full border border-grey-light'
                  placeholder='Exercise notes'
                  value={this.props.notes}>
                </textarea>
            </div>
            <div className='flex justify-between'>
              <label
                onClick={this.addCardio}
                className='m-2 flex justify-between'>
                <span className='flex p-4 text-6xl'>
                  Cardio
                </span>
                <i className={`material-icons text-grey text-6xl ${hasCardio}`}>favorite</i>
              </label>
              <label
                onClick={this.addWeights}
                className='m-2 flex justify-between'>
                <span className='flex p-4 text-6xl'>
                  Weights
                </span>
                <i className={`material-icons text-grey text-6xl ${hasWeights}`}>fitness_center</i>
              </label>
            </div>
          </div>
        </div>


        { meals }

        <div className='w-full flex justify-between text-center text-5xl bold mt-4 px-2'>
          <button onClick={this.removeMeal} className='bg-grey-light w-1/2 py-4'>
            Remove Meal
          </button>
          <button onClick={this.addMeal} className='bg-grey w-1/2'>
            Add Meal
          </button>
        </div>

      </div>
    );
  }
}

DailyView.propTypes = {
  firstName: PropTypes.string
};
export default DailyView
