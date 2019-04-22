import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { setCalendarAPIs } from 'store/calendar/actions'
import { getEvents } from 'store/events/actions'
import { getFormattedDate } from 'helpers'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { connect } from 'react-redux'
import './Agenda.styl'

class Agenda extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleDays: [
        getFormattedDate(this.props.defaultDate, 'subtract', 'days'),
        this.props.defaultDate,
        getFormattedDate(this.props.defaultDate, 'add', 'days')
      ]
    }
  }
  static getDerivedStateFromProps(props, state) {
    const curPropsDate = moment(props.defaultDate).format('YYYY-MM-DD')
    const midlStateDate = moment(state.visibleDays[1]).format('YYYY-MM-DD')
    const visibleDays = [
      getFormattedDate(curPropsDate, 'subtract', 'days'),
      curPropsDate,
      getFormattedDate(curPropsDate, 'add', 'days')
    ]
    if (curPropsDate === midlStateDate) return null
    else if (curPropsDate !== midlStateDate && !state.refresh) return { visibleDays }
    else return null
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
        // this.props.dispatch(getEvents())
      })
    }
  }

  render () {
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar' className='agenda-view'>
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
                defaultView='agenda'
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
  defaultDate: state.calendar.defaultDate,
  events: state.events.events
})
export default connect(mapStateToProps)(Agenda)
