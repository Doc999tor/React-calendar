import React, { Component } from 'react'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import { connect } from 'react-redux'
import { setDefaultDay } from '../../store/calendar/actions'
import './monthly.styl'

class Monthly extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'months'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'months')
      ]
    }
  }

  static getDerivedStateFromProps (props) {
    return props.defaultDayRefresh
      ? {
        visibleDays: [
          getFormattedDate(props.defaultDate, 'subtract', 'months'),
          props.defaultDate,
          getFormattedDate(props.defaultDate, 'add', 'months')
        ]
      }
      : null
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }
  componentDidUpdate = (prevProps, prevState) => {
    // console.log(prevState.visibleDays[1])
    // console.log(this.state.visibleDays[1])
    if (prevState.visibleDays[1] === this.state.visibleDays[1]) return false

    // this.props.dispatch(getEvents())
  }
  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'months').format(this.format)
      this.defaultDate = defaultDate
    }
  }

  onSlideChangeEnd = (o) => {
    let sd = o.swipeDirection
    let dd
    if(sd) {
      const action = sd === 'next' ? 'add' : 'subtract'
      dd = getFormattedDate(this.defaultDate, action)
      this.props.dispatch(setDefaultDay(dd))
    }
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
    if (this.state.refresh || this.props.defaultDayRefresh) return null
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <div id='swiper-calendar' className={topParam}>
        <Swiper
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => {
            return (
              <div key={i}>
                <DemoCalendar
                  events={this.props.events}
                  defaultView='monthly'
                  defaultDate={i}
                />
              </div>
            )
          })}
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDayRefresh: state.calendar.defaultDayRefresh,
  eventsFetching: state.events.eventsFetching,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events,
  defaultDate: state.calendar.defaultDate,
})
export default connect(mapStateToProps)(Monthly)
