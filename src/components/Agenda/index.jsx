import React, { Component } from 'react'
// import DemoCalendar from './DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import { getFormattedDate, getStandardFormat } from 'helpers'
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

  // static getDerivedStateFromProps (props, state) {
  //   const curPropsDate = getStandardFormat(props.defaultDate)
  //   const midlStateDate = getStandardFormat(state.visibleDays[1])
  //   const visibleDays = [
  //     getFormattedDate(curPropsDate, 'subtract', 'days'),
  //     curPropsDate,
  //     getFormattedDate(curPropsDate, 'add', 'days')
  //   ]
  //   return curPropsDate !== midlStateDate && !state.refresh ? { visibleDays } : null
  // }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }

  onSlideChangeEnd = ({ swipeDirection }) => {
    let dd
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      dd = moment(this.props.defaultDate)[action](1, 'days').format(this.format)
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
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar' className='agenda-view'>
        <Swiper
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {/*         columnHeaderText={date => moment(date).format('dddd YYYY-MM-DD')} */}
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
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
  eventsFetching: state.events.eventsFetching,
  calendarApi: state.calendar.calendarApi,
  defaultDate: state.calendar.defaultDate,
  events: state.events.events
})
export default connect(mapStateToProps)(Agenda)
