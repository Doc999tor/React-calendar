import React, { Component } from 'react'
// import '../../../components-lib/lib/prop-types.min'
// import { Swiper } from 'project-components'
import SingleWorker from './components/SingleWorker/SingleWorker.jsx'
import './Workers.styl'

class Workers extends Component {
  render () {
    return (
      <div className='swiper-container' >
        <div className='swiper-wrapper'>
          {config.workers.map(worker => <SingleWorker key={worker.id} id={worker.id} name={worker.name} photo={worker.photo} />)}
        </div>
        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
      </div >
    )
  }
}
export default Workers
