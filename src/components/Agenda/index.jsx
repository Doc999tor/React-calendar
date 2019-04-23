import React, { Component } from 'react'
// import DemoCalendar from './DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import { getFormattedDate } from 'helpers'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { setDefaultDay } from 'store/calendar/actions'
import { Swiper } from 'project-components'
import { connect } from 'react-redux'
import './Agenda.styl'

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

  onSlideChangeEnd = ({ swipeDirection }) => {
    let dd
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      dd = getFormattedDate(this.props.defaultDate, action)
      this.props.dispatch(setDefaultDay(dd))
    }
    if (dd && (dd !== this.state.visibleDays[1])) {
      const visibleDays = [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
      })
    }
  }

  render () {
    if (this.state.refresh || this.props.defaultDayRefresh) return null
    return (
      <div id='swiper-calendar' className='agenda-view'>
        <Swiper
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                columnHeaderText={date => moment(date).format('dddd YYYY-MM-DD')}
                events={this.props.events}
                defaultView='agenda'
                defaultDate={i} />
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
  events: state.events.events
})
export default connect(mapStateToProps)(Agenda)
