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
        text: 'Macronutrients Daily Percentage'
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
      [`Protein ${proteinPercent}%`, proteinPercent],
      [`Fats ${fatPercent}%`, fatPercent],
      [`Carbs ${carbPercent}%`, carbPercent],
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
        <div className='flex'>
          <div className='w-2/3'>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className='w-1/3 mt-2 mr-2'>
            <div className='border border-black text-center bg-blue-lighter h-8 p-1 text-xl'>
              Daily Targets
            </div>
            <div className='text-lg text-center'>
              <div className='border border-black p-2'>
                Protein Grams(x4): { this.props.targetProteins }
              </div>
              <div className='border border-black p-2'>
                Carbs Grams(x4): { this.props.targetCarbs }
              </div>
              <div className='border border-black p-2'>
                Fats Grams(x9): { this.props.targetFats }
              </div>
              <div className='border border-black p-2'>
                Total Calories: { this.props.targetCalories }
              </div>
            </div>
            <br />

            <div className='border border-black text-center bg-blue-lighter h-8 p-1 text-xl'>
              Daily Totals
            </div>
            <div className='text-lg text-center'>
              <div className='border border-black p-2'>
                Protein Grams: { newProtein }
              </div>
              <div className='border border-black p-2'>
                Carbs Grams: { newCarbs }
              </div>
              <div className='border border-black p-2'>
                Fats Grams: { newFats }
              </div>
              <div className='border border-black p-2'>
                Total Calories: { newTotal }
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className='w-full text-2xl px-2 mb-4'>
          <div className='w-full border border-black mt-2'>
            <div className={`w-full text-center border-b bg-blue-light p-1 border-black h-8`}>
              Exercise on { this.props.day }
            </div>
            <div className='m-2'>
                <textarea
                  onChange={(e) => this.addWorkoutNotes(e.target.value) }
                  className='w-full border border-grey-light'
                  placeholder='Exercise notes'
                  value={this.props.notes}>
                </textarea>
            </div>
            <div className='flex'>
              <label
                onClick={this.addCardio}
                className='m-2 flex justify-between p-1'>
                <span className='flex p-1 text-sm'>
                  Cardio
                </span>
                <i className={`material-icons text-grey ${hasCardio}`}>favorite</i>
              </label>
              <label
                onClick={this.addWeights}
                className='m-2 flex justify-between p-1'>
                <span className='flex p-1 text-sm'>
                  Weights
                </span>
                <i className={`material-icons text-grey ${hasWeights}`}>fitness_center</i>
              </label>
            </div>
          </div>
        </div>


        { meals }

        <div className='w-full h-8 flex justify-between text-center text-2xl bold mt-4 px-2'>
          <button onClick={this.removeMeal} className='bg-grey-light w-1/2'>
            Remove Meal
          </button>
          <button onClick={this.addMeal} className='bg-grey w-1/2'>
            Add Meal
          </button>
        </div>

        <ul>
          <li className='m-2 text-lg'>
            Enter food with unit of measurement in big box.
          </li>
          <li className='m-2 text-lg'>
            Add grams below then times by number and that equals calories for that food.
          </li>
          <li className='m-2 text-lg'>
            Take the grams of each box and add all protein, carb, and fat boxes up at bottom and same with calories.
          </li>
        </ul>

      </div>
    );
  }
}

DailyView.propTypes = {
  firstName: PropTypes.string
};
export default DailyView
