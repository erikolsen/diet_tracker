import React from "react"

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
export default Type
