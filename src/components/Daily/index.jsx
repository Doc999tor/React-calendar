import React, { Component } from 'react'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
// import { getFormattedDate, getStandardFormat } from 'helpers'
import { setDefaultDay } from 'store/calendar/actions'
import { Swiper } from 'project-components'
import { getFormattedDate } from 'helpers'
import { connect } from 'react-redux'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days')
      ]
    }
  }

  // static getDerivedStateFromProps (props, state) {
  //   const visibleDays = [
  //     getFormattedDate(props.defaultDate, 'subtract', 'days'),
  //     props.defaultDate,
  //     getFormattedDate(props.defaultDate, 'add', 'days')
  //   ]
  //   return props.defaultDate !== state.visibleDays[1] && !state.refresh ? { visibleDays } : null
  // }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }

  onSlideChangeEnd = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'days').format(this.format)
      this.defaultDate = defaultDate
      this.props.dispatch(setDefaultDay(defaultDate))
    }
    if (this.defaultDate && (this.defaultDate !== this.state.visibleDays[1])) {
      const visibleDays = [
        getFormattedDate(this.defaultDate, 'subtract', 'days'),
        this.defaultDate,
        getFormattedDate(this.defaultDate, 'add', 'days')
      ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
      })
    }
  }

  render () {
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar'>
        <Swiper
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
                events={this.props.events}
                defaultView='daily'
                defaultDate={i} />
            </div>
          ))}
        </Swiper>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  calendarApi: state.calendar.calendarApi,
  defaultDate: state.calendar.defaultDate,
  events: state.events.events
})
export default connect(mapStateToProps)(Calendar)
