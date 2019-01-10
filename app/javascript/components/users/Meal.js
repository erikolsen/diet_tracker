import React from "react"
import Type from "./Type"

const OPEN_ICON = '►'
const CLOSED_ICON = '▼'

class Meal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand(){
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render () {
    let total =  this.props.protein.grams * 4 + this.props.carbs.grams * 4  + this.props.fats.grams * 9  //1940
    let expanded = this.state.expanded ? 'block' : 'hidden'
    let deexpanded = this.state.expanded ? 'hidden' : 'block'

    let expandIcon = this.state.expanded ? OPEN_ICON : CLOSED_ICON

    return (
      <div className='w-full text-2xl px-2'>
        <div className='w-full bg-blue-lighter p-2 flex justify-between'>
          <button onClick={this.toggleExpand} className='h-8 w-8'>
            { expandIcon }
          </button>
          <div className='p-2'>
            { this.props.name }
          </div>
          <div className='p-2'>
            { total || 0 } Calories
          </div>
        </div>

        <div className={deexpanded}>
          <div className={`flex justify-between pb-2`}>
            <label className='p-1 bg-red-light flex justify-between'>
              <span className='p-1'>
                Protein
              </span>
              <input value={this.props.protein.grams} onChange={(e) => this.props.update(this.props.idx, 'protein', 'grams', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-green flex justify-between'>
              <span className='p-1'>
                Carbs
              </span>
              <input value={this.props.carbs.grams} onChange={(e) => this.props.update(this.props.idx, 'carbs', 'grams', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-yellow flex justify-between'>
              <span className='p-1'>
                Fats
              </span>
              <input value={this.props.fats.grams} onChange={(e) => this.props.update(this.props.idx, 'fats', 'grams', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
          </div>
        </div>

        <div className={expanded}>
          <div className=''>
            <Type
              idx={this.props.idx}
              name='Protein'
              color='bg-red-light'
              multiplier='4'
              update={this.props.update}
              low={ 35 }
              high={ 40 }
              current={Math.round(this.props.protein.grams*4/total * 100) || 0}
              grams={this.props.protein.grams}
              notes={this.props.protein.notes}
            />
            <Type
              idx={this.props.idx}
              name='Carbs'
              color='bg-green'
              multiplier='4'
              update={this.props.update}
              low={ 25 }
              high={ 40 }
              current={Math.round(this.props.carbs*4/total * 100) || 0}
              grams={this.props.carbs.grams}
              notes={this.props.carbs.notes}
            />
            <Type
              idx={this.props.idx}
              name='Fats'
              color='bg-yellow'
              multiplier='9'
              update={this.props.update}
              low={ 25 }
              high={ 40 }
              current={Math.round(this.props.fats*9/total * 100) || 0}
              grams={this.props.fats.grams}
              notes={this.props.fats.notes}
            />
          </div>

          <div>
            <div className='border border-black text-center bg-blue-lighter h-8 p-1'>
              { this.props.name } Total Calories
            </div>
            <div className='flex justify-between text-lg'>
              <div className='border border-black w-1/3 p-2'>
                Protein: { this.props.protein.grams * 4}
              </div>
              <div className='border border-black w-1/3 p-2'>
                Carbs: { this.props.carbs.grams * 4}
              </div>
              <div className='border border-black w-1/3 p-2'>
                Fats: { this.props.fats.grams * 9}
              </div>
              <div className='border border-black w-1/3 p-2'>
                Total: { total }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Meal
