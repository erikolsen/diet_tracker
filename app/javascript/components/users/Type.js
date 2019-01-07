import React from "react"

class Type extends React.Component {
  render () {
    const withinRange = this.props.current <= this.props.high && this.props.current >= this.props.low
    let visibility = withinRange ? 'block' : 'hidden'
    return (
      <div className='w-full border border-black mt-2'>
        <div className={`w-full text-center border p-1 border-black ${this.props.color}`}>
          { this.props.name }({this.props.low}-{this.props.high}%)
        </div>
        <div className='m-2'>
          <label>
            <textarea className='w-full border border-grey-light' placeholder='Food notes'>
            </textarea>
          </label>
        </div>
        <label className='mt-2 flex justify-between p-1'>
          <span className='flex p-1 text-sm'>
            Total grams X{this.props.multiplier}
          </span>
          <input
            value={this.props.value}
            onChange={(e) => this.props.update(this.props.idx, this.props.name, e.target.value) }
            className={`w-1/3 flex border border-black`} type="text" name="name"
          />
          <span className={`p-1`}>
            { this.props.current }%
          </span>
          <span className={`p-1 ${visibility}`}>
            😀
          </span>
        </label>
      </div>
    )
  }
}
export default Type
