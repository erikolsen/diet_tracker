import React from "react"
import Type from "./Type"

class Meal extends React.Component {
  constructor(props) {
    super(props);
    this.estimate = 1940/4 //props.estimate
    this.state = {
      expanded: false,
      protein: 0,
      carbs: 0,
      fats: 0
    }
    this.update = this.update.bind(this)
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  update(type, value){
    let total =  this.state.protein  + this.state.carbs  + this.state.fats  //1940
    switch (type.toLowerCase()) {
      case 'protein':
        this.setState({protein: value * 4})
        break;
      case 'carbohydrates':
        this.setState({carbs: value * 4})
        break;
      case 'fats':
        this.setState({fats: value * 9})
        break;
      default:
        console.log('default')
        return ''
    }
  }

  toggleExpand(){
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render () {
    let total =  this.state.protein  + this.state.carbs  + this.state.fats  //1940
    let expanded = this.state.expanded ? 'block' : 'hidden'
    let deexpanded = this.state.expanded ? 'hidden' : 'block'

    let expandIcon = this.state.expanded ? '-' : 'X'

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
            { total }
          </div>
        </div>

        <div className={deexpanded}>
          <div className={`flex justify-between pb-2`}>
            <label className='p-1 bg-red-light flex justify-between'>
              <span className='p-1'>
                Protein
              </span>
              <input onChange={(e) => this.update('protein', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-green flex justify-between'>
              <span className='p-1'>
                Carbs
              </span>
              <input onChange={(e) => this.update('carbohydrates', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
            <label className='p-1 bg-yellow flex justify-between'>
              <span className='p-1'>
                Fats
              </span>
              <input onChange={(e) => this.update('fats', e.target.value) } className={`w-1/3 border border-black`} type="text" name="name" />
            </label>
          </div>
        </div>

        <div className={expanded}>
          <div className=''>
            <Type
              name='Protein'
              color='bg-red-light'
              multiplier='4'
              update={this.update}
              low={ 35 }
              high={ 40 }
              current={Math.round(this.state.protein/total * 100) || 0}
              value={this.state.protein}
            />
            <Type
              name='Carbohydrates'
              color='bg-green'
              multiplier='4'
              update={this.update}
              low={ 25 }
              high={ 40 }
              total={total}
              current={Math.round(this.state.carbs/total * 100) || 0}
              value={this.state.carbs}
            />
            <Type
              name='Fats'
              color='bg-yellow'
              multiplier='9'
              update={this.update}
              low={ 25 }
              high={ 40 }
              total={total}
              current={Math.round(this.state.fats/total * 100) || 0}
              value={this.state.fats}
            />
          </div>

          <div>
            <div className='border border-black text-center bg-grey h-8 p-1'>
              { this.props.name } Total Calories
            </div>
            <div className='flex justify-between text-lg'>
              <div className='border border-black w-1/3 p-2'>
                Protein: { this.state.protein }
              </div>
              <div className='border border-black w-1/3 p-2'>
                Carbs: { this.state.carbs }
              </div>
              <div className='border border-black w-1/3 p-2'>
                Fats: { this.state.fats }
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
