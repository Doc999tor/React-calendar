import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { setCalendarAPIs } from 'store/calendar/actions'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { getFormattedDate } from 'helpers'
import { connect } from 'react-redux'

class Calendar extends Component {
  constructor () {
    super()
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedDate(config.calendar.defaultDate, 'subtract', 'days'),
        config.calendar.defaultDate,
        getFormattedDate(config.calendar.defaultDate, 'add', 'days')
      ]
    }
  }

  componentDidMount = () => {
    this.props.dispatch(setCalendarAPIs(this.state.visibleDays))
    this.props.dispatch(getEvents())
  }

  handleEventClick = info => this.setState({ info })

  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'days').format(this.format)
      this.defaultDate = defaultDate
    }
  }

  onSlideChangeEnd = () => {
    if (this.defaultDate && (this.defaultDate !== this.state.visibleDays[1])) {
      const visibleDays = [
        getFormattedDate(this.defaultDate, 'subtract', 'days'),
        this.defaultDate,
        getFormattedDate(this.defaultDate, 'add', 'days')
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
          // ref={node => { if (node) this.swiper = node.swiper }}
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
                refName={this.props.calendarAPIs['ref' + moment(i)]}
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
  calendarAPIs: state.calendar.calendarAPIs,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Calendar)
