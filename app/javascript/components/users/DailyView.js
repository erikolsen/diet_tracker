import React from "react"
import Meal from "./Meal"
import _ from 'lodash'

import PropTypes from "prop-types"

const NEWMEAL = () => { return {protein: 0, carbs: 0, fats: 0, total: 0 } }

class DailyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    }

    this.addMeal = this.addMeal.bind(this)
    this.removeMeal = this.removeMeal.bind(this)
    this.update = this.update.bind(this)
  }

  update(idx, type, value){
    let newMeals = this.state.meals
    newMeals[idx][type] = parseInt(value) || 0
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

  render () {
    let protein = 160
    let carbs = 100
    let fats = 100
    let total =  protein * 4 + carbs * 4 + fats * 9 //1940
    //let newProtein = parseInt(this.state.meals.map((el) => el.protein * 4)) || 0
    //let newProtein = this.state.meals.map((meal) => meal.protein * 4).reduce((a,b) => { a + b }, 0) || 0
    //let newCarbs = this.state.meals.map((el) => el.carbs * 4).reduce((a,b) => { a + b}, 0) || 0
    //let newFats = this.state.meals.map((el) => el.fats * 9).reduce((a,b) => { a + b}, 0) || 0
    let newProtein = _.sum(this.state.meals.map((meal) => parseInt(meal.protein * 4))) || 0
    let newCarbs = _.sum(this.state.meals.map((el) => parseInt(el.carbs * 4))) || 0
    let newFats = _.sum(this.state.meals.map((el) => parseInt(el.fats * 9))) || 0
    let newTotal = newProtein + newCarbs + newFats

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
    console.log("meals", this.state.meals)

    return (
      <div>
        <div>
          <div className='border border-black text-center bg-blue-lighter h-8 p-1 text-2xl'>
            Daily Targets
          </div>
          <div className='flex justify-between text-lg'>
            <div className='border border-black w-1/3 p-2'>
              Protein: 160
            </div>
            <div className='border border-black w-1/3 p-2'>
              Carbs: 100
            </div>
            <div className='border border-black w-1/3 p-2'>
              Fats: 100
            </div>
            <div className='border border-black w-1/3 p-2'>
              Total: { total }
            </div>
          </div>
        </div>

        <div>
          <div className='border border-black text-center bg-blue-lighter h-8 p-1 text-2xl'>
            Daily Totals
          </div>
          <div className='flex justify-between text-lg'>
            <div className='border border-black w-1/3 p-2'>
              Protein: { newProtein }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Carbs: { newCarbs }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Fats: { newFats }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Total: { newTotal }
            </div>
          </div>
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

        <br />

        { meals }

        <div className='w-full h-8 flex justify-between text-center text-2xl bold'>
          <button onClick={this.removeMeal} className='bg-red w-1/2'>
            Remove
          </button>
          <button onClick={this.addMeal} className='bg-green-light w-1/2'>
            Add
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
