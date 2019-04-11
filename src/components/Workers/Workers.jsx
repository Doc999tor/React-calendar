import React, { Component } from 'react'
import { Swiper } from 'project-components'
import SingleWorker from './components/SingleWorker/SingleWorker.jsx'
import './Workers.styl'

class Workers extends Component {
  render () {
    const params = {
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return (
      <div className='swiper-container' style={config.calendar.isRTL ? { 'direction': 'rtl' } : { 'direction': 'ltr' }}>
        <div className='swiper-wrapper'>
          <Swiper {...params}>
            {config.workers.map(worker => <SingleWorker key={worker.id} id={worker.id} name={worker.name} photo={worker.photo} />)}
          </Swiper>
        </div>
        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
      </div >
    )
  }
}
export default Workers
