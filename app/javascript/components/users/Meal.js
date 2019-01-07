import React from "react"
import Type from "./Type"

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
    let total =  this.props.protein * 4 + this.props.carbs * 4  + this.props.fats * 9  //1940
    let expanded = this.state.expanded ? 'block' : 'hidden'
    let deexpanded = this.state.expanded ? 'hidden' : 'block'

    let expandIcon = this.state.expanded ? '^' : 'v'

    return (
      <div className='w-full text-2xl'>
        <div className='w-full bg-grey-light p-2 flex justify-between'>
          <button onClick={this.toggleExpand} className='border border-black rounded-full h-8 w-8'>
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
              <input value={this.props.protein} onChange={(e) => this.props.update(this.props.idx, 'protein', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-green flex justify-between'>
              <span className='p-1'>
                Carbs
              </span>
              <input value={this.props.carbs} onChange={(e) => this.props.update(this.props.idx, 'carbs', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-yellow flex justify-between'>
              <span className='p-1'>
                Fats
              </span>
              <input value={this.props.fats} onChange={(e) => this.props.update(this.props.idx, 'fats', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
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
              current={Math.round(this.props.protein*4/total * 100) || 0}
              value={this.props.protein}
            />
            <Type
              idx={this.props.idx}
              name='Carbohydrates'
              color='bg-green'
              multiplier='4'
              update={this.props.update}
              low={ 25 }
              high={ 40 }
              current={Math.round(this.props.carbs*4/total * 100) || 0}
              value={this.props.carbs}
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
              value={this.props.fats}
            />
          </div>

          <div>
            <div className='border border-black text-center bg-grey h-8 p-1'>
              { this.props.name } Total Calories
            </div>
            <div className='flex justify-between text-lg'>
              <div className='border border-black w-1/3 p-2'>
                Protein: { this.props.protein * 4}
              </div>
              <div className='border border-black w-1/3 p-2'>
                Carbs: { this.props.carbs * 4}
              </div>
              <div className='border border-black w-1/3 p-2'>
                Fats: { this.props.fats * 9}
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
