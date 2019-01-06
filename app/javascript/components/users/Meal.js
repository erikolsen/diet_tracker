import React from "react"
import Type from "./Type"


class Totals extends React.Component {
  render () {
    let total =  this.props.protein * 4 + this.props.carbs * 4 + this.props.fats * 9 //1940

    return (
      <div>
        <div className='border border-black text-center bg-grey h-8 p-1'>
          {this.props.name }
        </div>
        <div className='flex justify-between text-lg'>
          <div className='border border-black w-1/3 p-2'>
            Protein: { Math.round(this.props.protein) }
          </div>
          <div className='border border-black w-1/3 p-2'>
            Carbs: { Math.round(this.props.carbs) }
          </div>
          <div className='border border-black w-1/3 p-2'>
            Fats: { Math.round(this.props.fats) }
          </div>
          <div className='border border-black w-1/3 p-2'>
            Total: { Math.round(total)  }
          </div>
        </div>
      </div>
    )
  }
}

class Meal extends React.Component {
  constructor(props) {
    super(props);
    this.estimate = 1940/4 //props.estimate
    this.state = {
      protein: 0,
      carbs: 0,
      fats: 0
    }
    this.update = this.update.bind(this)
  }

  update(type, value){
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

  render () {
    let total =  this.state.protein  + this.state.carbs  + this.state.fats  //1940

    return (
      <div className='w-full text-2xl'>
        <div className=''>
          <Type
            name='Protein'
            color='bg-red-lighter'
            multiplier='4'
            update={this.update}
            low={ 35 }
            high={ 40 }
            current={Math.round(this.state.protein/total * 100) || 0}
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
    )
  }
}

export default Meal
