import React, { Component } from 'react'
import { getEvents } from 'store/events/actions'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import { setDefaultDay } from 'store/calendar/actions'
// import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import Swiper from 'react-id-swiper'
import { connect } from 'react-redux'
import './Agenda.styl'
import AgendaEvents from './agendaEvents.jsx'
import { eventsSort, freeTimeArrCreator } from '../../helpers/event'
import { getEventInfo } from '../../store/calendar/actions'

class Agenda extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days')
      ]
    }
  }

  static getDerivedStateFromProps (props) {
    return props.defaultDayRefresh
      ? {
        visibleDays: [
          getFormattedDate(props.defaultDate, 'subtract', 'days'),
          props.defaultDate,
          getFormattedDate(props.defaultDate, 'add', 'days')
        ]
      }
      : null
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.visibleDays[1] === this.state.visibleDays[1]) return false
    this.props.dispatch(getEvents())
  }
  onSlideChangeEnd = ({ swipeDirection }) => {
    let dd
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      dd = getFormattedDate(this.props.defaultDate, action)
      this.props.dispatch(setDefaultDay(dd))
    }
    if (dd && (dd !== this.state.visibleDays[1])) {
      const visibleDays = [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]
      this.setState({visibleDays: visibleDays})
    }
  }

  handleEventClick = eventInfo => {
    let obj = {event: {extendedProps: eventInfo}}
    this.props.dispatch(getEventInfo(obj))
  }

  render () {
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
    let sortedEvent = eventsSort(this.props.events, this.props.defaultDate)
    let freeTimeArr = sortedEvent.length === 0 ? null : freeTimeArrCreator(sortedEvent, this.props.defaultDate)
    return (
      <div id='swiper-calendar' className='agenda-view'>
        <Swiper
          // rebuildOnUpdate
          // onSlideChangeEnd={this.onSlideChangeEnd}
          {...params}
          // initialSlide={1}
          // loop
        >
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <AgendaEvents events={sortedEvent}
                            freeTimeArr={freeTimeArr}
                            defaultDate={this.props.defaultDate}
                            eventClick={this.handleEventClick}
              />
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDayRefresh: state.calendar.defaultDayRefresh,
  eventsFetching: state.events.eventsFetching,
  calendarApi: state.calendar.calendarApi,
  defaultDate: state.calendar.defaultDate,
  events: state.events.events,
})

export default connect(mapStateToProps)(Agenda)
