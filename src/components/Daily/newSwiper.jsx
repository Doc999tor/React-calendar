import React, { Component } from 'react'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import Swiper from 'react-id-swiper'
import { connect } from 'react-redux'
import DemoCalendar from '../DemoCalendar/index.jsx'
import { setDefaultDay } from '../../store/calendar/actions'
import { getEvents } from '../../store/events/actions'
import './daily.styl'

class Daily extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleDays: [
        // getFormattedDate(getFormattedDate(props.defaultDate, 'subtract', 'days'), 'subtract', 'days'),
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days'),
        // getFormattedDate(getFormattedDate(props.defaultDate, 'add', 'days'), 'add', 'days')
      ]
    }
  }

  static getDerivedStateFromProps (props) {
    return {
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days')
      ]
    }
  }

  componentDidMount () {
    this.props.getEvents()
  }

  onSlideChangeEnd = ({ swipeDirection }) => {
    const action = swipeDirection === 'next' ? 'add' : 'subtract'
    const dd = getFormattedDate(this.props.defaultDate, action)
    this.props.setDefaultDay(dd)
    this.props.getEvents()

    // const visibleDays = [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]
    // this.setState({ visibleDays })
  }

  render () {
    console.log(this.state.visibleDays, this.props.events)
    let params = {
      on: {
        slideNextTransitionEnd: () => {
          this.onSlideChangeEnd({swipeDirection: 'next'})
          console.log('next')
        },
        slidePrevTransitionEnd: () => {
          this.onSlideChangeEnd({swipeDirection: 'prev'})
          console.log('prev')
        }
      },
      runCallbacksOnInit: false,
      rebuildOnUpdate: true,
      initialSlide: 1,
      loop: true
    }
    return (
      <div id='swiper-calendar' style={{direction: config.calendar.dir}} className={`agenda-view${config.workers.length === 1 ? ' calendar-without-workers' : ' calendar-with-workers'}`}>
        <Swiper {...params} >
          {this.state.visibleDays.map(date => {
            return (
              <div key={date}>
                <DemoCalendar
                  events={this.props.events}
                  columnHeaderText={date => moment(date).format('dddd YYYY-MM-DD')}
                  defaultView='daily'
                  defaultDate={date}
                />
              </div>
            )
          })}
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDate: state.calendar.defaultDate,
  events: state.events.events
})

export default connect(mapStateToProps, {setDefaultDay, getEvents})(Daily)
