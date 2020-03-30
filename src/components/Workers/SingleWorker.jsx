import React, { Component } from 'react'

class SingleWorker extends Component {
  onError = e => {
    if (!e.target.src.endsWith(config.urls.defaultWorkerPhoto)) {
      e.target.src = config.urls.defaultPathToWorkerImg + config.defaultWorkerPhoto
    }
  }
  render () {
    const { id, name, photo, activeWorkerId } = this.props
    return (
      <figure data-index={id} className={(id === activeWorkerId) ? 'swiper-slide active' : 'swiper-slide'} onClick={() => this.props.changeWorker(id)}>
        <img className='fit' src={config.urls.imgForWorkers.replace('{worker_id}', photo)} onError={e => { this.onError(e) }} />
        <figcaption className='swiper-title'>{name}</figcaption>
      </figure>
    )
  }
}
export default SingleWorker
