import React, { Component } from 'react'
import './SingleWorker.styl'

class SingleWorker extends Component {
  render () {
    const { id, name, photo } = this.props
    return (
      <figure data-index={id} className='swiper-slide'>
        <img className='fit' src={config.urls.imgForWorkers.replace('{worker_id}', photo)} />
        <figcaption className='swiper-title'>{name}</figcaption>
      </figure>
    )
  }
}
export default SingleWorker
