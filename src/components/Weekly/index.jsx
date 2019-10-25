import React, { Component } from 'react'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
// import { getEvents } from 'store/events/actions'
import { setDefaultDay } from 'store/calendar/actions'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import { connect } from 'react-redux'
import './Weekly.styl'

class Weekly extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleDays: this.getVisibleDays(props.defaultDate)
    }
  }

  componentDidMount = () => {
    this.view = document.getElementById('calendar-weekly')
    this.baseCalendarWidth = document.querySelector('.fc.fc-ltr.fc-unthemed').offsetWidth
    this.view.scrollLeft = this.baseCalendarWidth * 3
    this.view.addEventListener('scroll', this.updateCalendars)
  }

  componentWillUnmount () { this.view.removeEventListener('scroll', this.updateCalendars) }

  getVisibleDays = defaultDate => [
    getFormattedDate(defaultDate, 'subtract', 'days', 8),
    getFormattedDate(defaultDate, 'subtract', 'days', 4),
    defaultDate,
    getFormattedDate(defaultDate, 'add', 'days', 4),
    getFormattedDate(defaultDate, 'add', 'days', 8)
  ]

  updateCalendars = () => {
    const weeklyClientRect = document.querySelector('.calendar-weekly').getBoundingClientRect()
    let visibleDays
    if (weeklyClientRect.right < (this.baseCalendarWidth * 2)) {
      this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
      const { visibleDays: vd } = this.state
      const defaultDate = vd[vd.length - 1]
      visibleDays = [ ...vd, ...this.getVisibleDays(getFormattedDate(defaultDate, 'add', 'days', 12)) ].splice(1, 11)
    } else if (weeklyClientRect.left >= -this.baseCalendarWidth * 2) {
      this.view.scrollLeft = this.view.scrollLeft + (this.baseCalendarWidth * 5)
      const defaultDate = getFormattedDate(this.state.visibleDays[0], 'subtract', 'days', 12)
      const leftDates = this.getVisibleDays(defaultDate)
      visibleDays = [ ...leftDates, ...this.state.visibleDays ].splice(0, 9)
    }
    if (visibleDays) {
      this.setState({ visibleDays })
      const newIndex = Math.floor(weeklyClientRect.left / -this.baseCalendarWidth)
      if (this.currentIndex !== newIndex) {
        this.currentIndex = newIndex
        // console.log(newIndex)
        this.props.dispatch(setDefaultDay(visibleDays[newIndex]))
      }
    }
  }

  render () {
    // console.log('this.state.visibleDays', this.state.visibleDays)
    // console.log('this.props.default', this.props.defaultDate)
    return (
      <React.Fragment>
        <div id='calendar-weekly'>
          <div className='calendar-weekly'
            style={{ width: this.state.visibleDays.length * 100 + '%' }}>
            {this.state.visibleDays.map(i => (
              <DemoCalendar eventClick={this.handleEventClick} events={this.props.events} defaultDate={i} defaultView='weekly' key={i} />
            ))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events,
  defaultDate: state.calendar.defaultDate
})
export default connect(mapStateToProps)(Weekly)
