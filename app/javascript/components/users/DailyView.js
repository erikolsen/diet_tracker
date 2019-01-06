import React from "react"
import Meal from "./Meal"

import PropTypes from "prop-types"

class Type extends React.Component {
  render () {
    return (
      <div className='w-full border border-black mt-2'>
        <div className={`w-full text-center border border-black p-1 ${this.props.color}`}>
          { this.props.name }({this.props.estimate} grams)
        </div>
        <div className='m-2'>
          <label>
            <textarea className='w-full border border-grey-light' placeholder='Food notes'>
            </textarea>
          </label>
        </div>
        <label className='mt-2 flex justify-between p-1'>
          <span className='flex p-1'>
            Total grams X{this.props.multiplier}
          </span>
          <input className='flex border border-black' type="text" name="name" />
        </label>
      </div>
    )
  }
}

class DailyView extends React.Component {
  render () {
    let protein = 160
    let carbs = 100
    let fats = 100
    let total =  protein * 4 + carbs * 4 + fats * 9 //1940

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
              Protein:
            </div>
            <div className='border border-black w-1/3 p-2'>
              Carbs:
            </div>
            <div className='border border-black w-1/3 p-2'>
              Fats:
            </div>
            <div className='border border-black w-1/3 p-2'>
              Total:
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
        <Meal name='Meal 1' />
        <br />
        <br />
        <Meal name='Meal 2' />
        <br />
        <br />
        <Meal name='Meal 3' />
        <br />
        <br />
        <Meal name='Meal 4' />

      </div>
    );
  }
}

DailyView.propTypes = {
  firstName: PropTypes.string
};
export default DailyView
