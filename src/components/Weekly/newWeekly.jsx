import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { getFormattedDate } from '../../helpers'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/core/main.css'
import './Weekly.styl'
import renderDailyEvents, { eventPositioned } from '../../helpers/eventsCustomization'
import { connect } from 'react-redux'
import { getEventInfo, setDefaultDay, setDataLoading } from '../../store/calendar/actions'
import { getEvents } from '../../store/events/actions'
import { getDatesFromEvents } from '../../helpers/days'

const getWeeklyState = date => ([
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'subtract', 'days', 16),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'subtract', 'days', 12),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'subtract', 'days', 8),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'subtract', 'days', 4),
  moment(date).format('YYYY-MM-DD'),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'add', 'days', 4),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'add', 'days', 8),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'add', 'days', 12),
  getFormattedDate(moment(date).format('YYYY-MM-DD'), 'add', 'days', 16)
])

class Weekly extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: getWeeklyState(this.props.currentDate)
    }
  }

  componentDidMount = () => {
    this.props.getEvents()
    this.newEventsLoaded = false
    this.oldEventLoaded = false
    this.singleDayWidth = document.querySelector('.fc-day-header')?.offsetWidth
    this.baseCalendarWidth = document.querySelector('.fc.fc-unthemed')?.offsetWidth
    this.view = document.getElementById('calendar-weekly')
    this.view.scrollLeft = this.baseCalendarWidth * 4
    this.view.style.marginTop = document.getElementById('header').offsetHeight + document.querySelector('.swiper-background').offsetHeight + 'px'
    this.view.addEventListener('scroll', this.updateCalendars)
  }

  updateCalendars = () => {
    const weeklyClientRect = document.querySelector('.calendar-weekly').getBoundingClientRect()
    if (weeklyClientRect.right - 1 <= this.baseCalendarWidth) {
      let index = config.calendar.dir === 'ltr' ? (this.state.dates.length - 1) : 0
      let newDay = this.state.dates[index]
      this.props.setDataLoading(true)
      this.setState({ dates: getWeeklyState(newDay) }, () => {
        this.props.getEvents()
        this.props.setDefaultDay(newDay)
      })
      this.view.scrollLeft = this.baseCalendarWidth * 4
    } else if (weeklyClientRect.left === 0) {
      let index = config.calendar.dir === 'ltr' ? 0 : (this.state.dates.length - 1)
      let newDay = this.state.dates[index]
      this.props.setDataLoading(true)
      this.setState({ dates: getWeeklyState(newDay) }, () => {
        this.props.getEvents()
        this.props.setDefaultDay(newDay)
      })
      this.view.scrollLeft = this.baseCalendarWidth * 4
    }

    // if (this.props.events.length) {
    //   const dates = getDatesFromEvents(this.props.events)
    //   const first = document.querySelector(`[data-date="${dates[0]}"]`)
    //   const second = document.querySelector(`[data-date="${dates[1]}"]`)
    //   if (config.calendar.dir === 'rtl') {
    //     if (!this.newEventsLoaded && second.getBoundingClientRect().x > 0) {
    //       this.newEventsLoaded = true
    //       this.props.getEvents()
    //       console.log('get events')
    //     }
    //
    //     if (!this.oldEventLoaded && first.getBoundingClientRect().x - this.baseCalendarWidth < 0) {
    //       this.oldEventLoaded = true
    //       this.props.getEvents()
    //       console.log('get events')
    //     }
    //   } else {
    //     if (!this.oldEventLoaded && first.getBoundingClientRect().x > 0) {
    //       this.oldEventLoaded = true
    //       this.props.getEvents()
    //       console.log('get events')
    //     }
    //
    //     if (!this.newEventsLoaded && second.getBoundingClientRect().x - this.baseCalendarWidth < 0) {
    //       this.newEventsLoaded = true
    //       this.props.getEvents()
    //       console.log('get events')
    //     }
    //   }
    // }
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
        businessHours={config.workers.filter(worker => worker.id === this.props.activeWorkerId)[0].businessHours}
      />
    )
  }

  render () {
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <React.Fragment>
        <div id='calendar-weekly' className={topParam}>
          <div className='calendar-weekly' style={{ width: this.state.dates.length * 100 + '%', direction: config.calendar.dir }}>
            {this.state.dates.map(date => <div className='calendar-wrap' key={date}>
              {this.renderCalendar(date)}
            </div>)}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  currentDate: state.calendar.currentDate
})

export default connect(mapStateToProps, {
  setDefaultDay,
  getEvents,
  getEventInfo,
  setDataLoading
})(Weekly)
