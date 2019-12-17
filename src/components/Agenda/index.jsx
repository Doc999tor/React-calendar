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
import EmptyPage from './EmptyPage.jsx'

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
    // this.props.dispatch(getEvents())
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.visibleDays[1] === this.state.visibleDays[1]) return false
    // this.props.dispatch(getEvents())
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
    return (
      <div id='swiper-calendar' className={`agenda-view${config.workers.length === 1 ? ' calendar-without-workers' : ' calendar-with-workers'}`}>
        <Swiper
          // rebuildOnUpdate
          // onSlideChangeEnd={this.onSlideChangeEnd}
          {...params}
          // initialSlide={1}
          // loop
        >
          {this.state.visibleDays.map(i => {
            console.log(this.props.events)
            let sortedEvent = eventsSort(this.props.events[i], i)
            let freeTimeArr = sortedEvent.length === 0 ? null : freeTimeArrCreator(sortedEvent, i)
            return (
              <div key={i}>
                <AgendaEvents events={sortedEvent}
                              freeTimeArr={freeTimeArr}
                              defaultDate={i}
                              eventClick={this.handleEventClick}
                />
              </div>
            )
          })}
        </Swiper>
        <div className={`preloader${config.calendar.dir === 'rtl' ? ' styleLoaderRTL' : ' styleLoaderLTR'}`} style={{display: this.props.eventsFetching ? 'flex' : 'none'}}>
          <img className='loader' src={config.urls.staticImg + '/preloader.svg'} />
        </div>
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
