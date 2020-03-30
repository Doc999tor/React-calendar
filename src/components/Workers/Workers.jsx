import React, { Component } from 'react'
import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import SingleWorker from './SingleWorker.jsx'
import { connect } from 'react-redux'
import './Workers.styl'

class Workers extends Component {
  componentDidMount () {
    config.activeWorkerId = this.props.activeWorkerId
  }

  handleChangeWorker = id => {
    config.activeWorkerId = id
    const qs = new URLSearchParams(this.props.location.search)
    qs.set('worker_id', id)
    this.props.history.replace({
      search: qs.toString()
    })
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
                  activeWorkerId={this.props.activeWorkerId}
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
export default connect(mapStateToProps)(Workers)
