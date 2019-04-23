import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { getFormattedDate } from 'helpers'
import { connect } from 'react-redux'

class Monthly extends Component {
  constructor () {
    super()
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedDate(config.calendar.defaultDate, 'subtract', 'months'),
        config.calendar.defaultDate,
        getFormattedDate(config.calendar.defaultDate, 'add', 'months')
      ]
    }
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
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
        getFormattedDate(this.defaultDate, 'subtract', 'months'),
        this.defaultDate,
        getFormattedDate(this.defaultDate, 'add', 'months')
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
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Monthly)
