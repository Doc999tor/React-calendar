import React, { Component } from 'react'
import { getEvents } from 'store/events/actions'
import { setDefaultDay } from 'store/calendar/actions'
import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { getFormattedDate } from '../../helpers'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/core/main.css'
import './Weekly.styl'

class Weekly extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days', 8),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days', 4),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days', 4),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days', 8)
      ]
    }
  }

  componentDidMount = () => {
    this.props.setHeaderCallbacks({
      setToday: this.setToday,
      slideToNext: this.swipeNext,
      slideToPrev: this.swipePrev
    })
    this.props.getEvents()
    this.baseCalendarWidth = document.querySelector('.fc.fc-unthemed')?.offsetWidth
    this.singleDayWidth = document.querySelector('.fc-day-header')?.offsetWidth
    this.view = document.getElementById('calendar-weekly')
    this.view.scrollLeft = this.baseCalendarWidth * 2
    this.view.addEventListener('scroll', this.updateCalendars)
  }

  updateCalendars = () => {
    const weeklyClientRect = document.querySelector('.calendar-weekly').getBoundingClientRect()
    let dates = this.state.dates.slice()
    if (weeklyClientRect.right < (this.baseCalendarWidth * 2)) {
      if (config.calendar.dir === 'rtl') {
        const newDay = getFormattedDate(dates[0], 'subtract', 'days', 4)
        dates.unshift(newDay)
        if (dates.length === 11) {
          this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
          dates.pop()
        }
      } else {
        const newDay = getFormattedDate(dates[dates.length - 1], 'add', 'days', 4)
        dates.push(newDay)
        if(dates.length === 11) {
          this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
          dates.shift()
        }
      }
      this.props.getEvents()
    } else if (weeklyClientRect.left >= -this.baseCalendarWidth) {
      if (config.calendar.dir === 'rtl') {
        this.view.scrollLeft = this.view.scrollLeft + this.baseCalendarWidth
        const newDay = getFormattedDate(dates[dates.length - 1], 'add', 'days', 4)
        dates.push(newDay)
        if (dates.length === 11) {
          dates.shift()
        }
      } else {
        this.view.scrollLeft = this.view.scrollLeft + this.baseCalendarWidth
        const newDay = getFormattedDate(dates[0], 'subtract', 'days', 4)
        dates.unshift(newDay)
        if (dates.length === 11) {
          dates.pop()
        }
      }
      this.props.getEvents()
    }

    if(config.calendar.dir === 'rtl') {
      const daysToAdd = Math.floor((weeklyClientRect.right - this.baseCalendarWidth) / this.singleDayWidth)
      this.props.setDefaultDay(getFormattedDate(dates[0], 'add', 'days', daysToAdd))
    } else {
      const daysToAdd = Math.floor((-weeklyClientRect.left) / this.singleDayWidth)
      this.props.setDefaultDay(getFormattedDate(dates[0], 'add', 'days', daysToAdd))
    }

    this.setState({ dates })
  }

  swipeNext = () => {
    if (config.calendar.dir === 'rtl') {
      this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
    } else {
      this.view.scrollLeft = this.view.scrollLeft + this.baseCalendarWidth
    }
  }

  swipePrev = () => {
    if (config.calendar.dir === 'rtl') {
      this.view.scrollLeft = this.view.scrollLeft + this.baseCalendarWidth
    } else {
      this.view.scrollLeft = this.view.scrollLeft - this.baseCalendarWidth
    }
  }

  setToday = () => {
    const dates = [
      getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days', 8),
      getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days', 4),
      moment().format('YYYY-MM-DD'),
      getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days', 4),
      getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days', 8)
    ]
    this.setState({ dates }, () => {
      this.view.scrollLeft = this.baseCalendarWidth * 2
      this.props.setDefaultDay(moment().format('YYYY-MM-DD'))
    })
  }

  renderCalendar = date => {
    return (
      <FullCalendar
        key={date}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        {...config.calendar}
        defaultDate={date}
        defaultView='weekly'
        events={this.props.events}
        eventRender={(data) => renderDailyEvents(data)}
        eventPositioned={(data) => eventPositioned(data, this.props.events)}
        businessHours={this.props.businessHours}
      />
    )
  }

  render () {
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <React.Fragment>
        <div id='calendar-weekly' className={topParam}>
          <div className='calendar-weekly' style={{ width: this.state.dates.length * 100 + '%', direction: config.calendar.dir }}>
            {this.state.dates.map(date => this.renderCalendar(date))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  businessHours: state.calendar.businessHours
})

export default connect(mapStateToProps, {
  setDefaultDay,
  getEvents
})(Weekly)
