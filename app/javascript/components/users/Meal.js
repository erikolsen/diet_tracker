import React from "react"
import Type from "./Type"

class Meal extends React.Component {
  render () {
    let protein = 160
    let carbs = 100
    let fats = 100
    let total =  protein * 4 + carbs * 4 + fats * 9 //1940

    return (
      <div className='w-full text-2xl'>
        <div>
          <div className='border border-black text-center bg-grey h-8 p-1'>
            {this.props.name } Goals
          </div>
          <div className='flex justify-between text-lg'>
            <div className='border border-black w-1/3 p-2'>
              Protein: { protein / 4 }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Carbs: { carbs / 4 }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Fats: { fats / 4 }
            </div>
            <div className='border border-black w-1/3 p-2'>
              Total: { total / 4 }
            </div>
          </div>
        </div>

        <div className=''>
          <Type name='Protein' color='bg-red-lighter' multiplier='4'estimate={protein/4} />
          <Type name='Carbohydrate'color='bg-green' multiplier='4' estimate={carbs/4} />
          <Type name='Fats' color='bg-yellow' multiplier='9' estimate={fats/4} />
        </div>

        <div>
          <div className='border border-black text-center bg-grey h-8 p-1'>
            { this.props.name } Totals
          </div>
          <div className='flex justify-between text-lg'>
            <div className='border border-black w-1/3 p-2'>
              Protein: {}
            </div>
            <div className='border border-black w-1/3 p-2'>
              Carbs: {}
            </div>
            <div className='border border-black w-1/3 p-2'>
              Fats: {}
            </div>
            <div className='border border-black w-1/3 p-2'>
              Total: {}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Meal
