import React, { Component } from 'react'
import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import SingleWorker from './SingleWorker.jsx'
import { connect } from 'react-redux'
import './Workers.styl'
import { setBusinessHours } from '../../store/calendar/actions'

class Workers extends Component {
  handleChangeWorker = id => {
    config.activeWorkerId = id
    let chosenWorker = config.workers.find(worker => worker.id == id)
    // let calendarApi = this.props.calendarApi
    // calendarApi.setOption('businessHours', chosenWorker.businessHours)
    this.props.setBusinessHours(chosenWorker.businessHours)
    this.forceUpdate()
  }
  render () {
    const params = {
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return (
      <div className='swiper-background'>
        <div id='workers' className='swiper-container' style={config.calendar.dir === 'rtl'? { 'direction': 'rtl' } : { 'direction': 'ltr' }}>
          <div className='swiper-wrapper'>
            <Swiper {...params}>
              {config.workers.map(worker => (
                <SingleWorker
                  key={worker.id}
                  id={worker.id}
                  name={worker.name}
                  photo={worker.photo}
                  changeWorker={this.handleChangeWorker} />))
              }
            </Swiper>
          </div>
          <div className='swiper-button-next' />
          <div className='swiper-button-prev' />
        </div >
      </div>
    )
  }
}
const mapStateToProps = state => ({ calendarApi: state.calendar.calendarApi })
export default connect(mapStateToProps, {
  setBusinessHours
})(Workers)
