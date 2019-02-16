import React from "react"

class Type extends React.Component {
  render () {
    const withinRange = this.props.current <= this.props.high && this.props.current >= this.props.low
    let visibility = withinRange ? 'block' : 'hidden'
    return (
      <div className='w-full border border-black mt-2'>
        <div className={`w-full text-center border p-8 border-black ${this.props.color} text-5xl`}>
          { this.props.name }({this.props.low}-{this.props.high}%)
        </div>
        <div className='m-2'>
          <textarea
            onChange={(e) => this.props.update(this.props.idx, this.props.name, 'notes', e.target.value) }
            className='w-full border border-grey-light'
            placeholder='Food notes'
            value={this.props.notes}>
          </textarea>
        </div>
        <label className='mt-2 flex justify-between p-4 text-4xl'>
          <span className='flex p-4'>
            Total grams X{this.props.multiplier}
          </span>
          <input
            value={this.props.grams}
            onChange={(e) => this.props.update(this.props.idx, this.props.name, 'grams', e.target.value) }
            className={`w-1/3 flex border border-black`} type="text" name="name"
          />
          <span className={`p-1`}>
            { this.props.current }%
          </span>
          <span className={`p-1 ${'hidden'}`}>
            😀
          </span>
        </label>
      </div>
    )
  }
}
export default Type
