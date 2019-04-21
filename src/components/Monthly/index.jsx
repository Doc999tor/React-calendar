import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { setCalendarAPIs } from 'store/calendar/actions'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { getFormattedMonth } from 'helpers'
import { connect } from 'react-redux'

class Monthly extends Component {
  constructor () {
    super()
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedMonth(config.calendar.defaultDate, 'subtract'),
        config.calendar.defaultDate,
        getFormattedMonth(config.calendar.defaultDate, 'add')
      ]
    }
  }

  componentDidMount = () => {
    this.props.dispatch(setCalendarAPIs(this.state.visibleDays))
    // this.props.dispatch(getEvents())
  }

  handleEventClick = info => this.setState({ info })

  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'months').format(this.format)
      this.defaultDate = defaultDate
    }
  }

  onSlideChangeEnd = () => {
    if (this.defaultDate && (this.defaultDate !== this.state.visibleDays[1])) {
      const visibleDays = [
        getFormattedMonth(this.defaultDate, 'subtract'),
        this.defaultDate,
        getFormattedMonth(this.defaultDate, 'add')
      ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
        this.props.dispatch(setCalendarAPIs(visibleDays))
      })
    }
  }

  render () {
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar'>
        <Swiper
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
                events={this.props.events}
                defaultView='monthly'
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
  calendarAPIs: state.calendar.calendarAPIs,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Monthly)
