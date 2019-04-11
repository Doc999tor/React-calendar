import React, { Component } from 'react'

class SingleWorker extends Component {
  onError = e => {
    if (!e.target.src.endsWith(config.urls.defaultWorkerPhoto)) {
      e.target.src = config.urls.defaultPathToWorkerImg + config.defaultWorkerPhoto
    }
  }
  render () {
    const { id, name, photo } = this.props
    return (
      <figure data-index={id} className='swiper-slide'>
        <img className='fit' src={config.urls.imgForWorkers.replace('{worker_id}', photo)} onError={e => { this.onError(e) }} />
        <figcaption className='swiper-title'>{name}</figcaption>
      </figure>
    )
  }
}
export default SingleWorker
