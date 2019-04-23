import React, { Component } from 'react'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
// import { getEvents } from 'store/events/actions'
import { getFormattedDate } from 'helpers'
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
    if (weeklyClientRect.right < (this.baseCalendarWidth * 2)) {
      const { visibleDays: vd } = this.state
      const defaultDate = vd[vd.length - 1]
      const visibleDays = [ ...vd, ...this.getVisibleDays(getFormattedDate(defaultDate, 'add', 'days', 12)) ].splice(1, 11)
      this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
      this.setState({ visibleDays })
    } else if (weeklyClientRect.left >= -this.baseCalendarWidth * 2) {
      this.view.scrollLeft = this.view.scrollLeft + (this.baseCalendarWidth * 5)
      const defaultDate = getFormattedDate(this.state.visibleDays[0], 'subtract', 'days', 12)
      const leftDates = this.getVisibleDays(defaultDate)
      const visibleDays = [ ...leftDates, ...this.state.visibleDays ].splice(0, 9)
      this.setState({ visibleDays })
    }
  }

  render () {
    return (
      <React.Fragment>
        <div id='calendar-weekly'>
          <div className='calendar-weekly'
            style={{ width: this.state.visibleDays.length * 100 + '%' }}>
            {this.state.visibleDays.map(i => (
              <DemoCalendar key={i} defaultDate={i} eventClick={this.handleEventClick} events={this.props.events} />
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
