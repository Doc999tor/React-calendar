import React from 'react'
import Swiper from 'react-id-swiper'
import { getFormattedDate } from '../../helpers'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { setDefaultDay, setDayCapacity } from '../../store/calendar/actions'
import { dayRender, eventPositioned } from '../../helpers/eventsCustomization.js'
import { getNext, getNextDay } from '../../helpers/days.js'
import './monthly.styl'
import { addHolidays } from '../../helpers/eventsCustomization'

class Daily extends React.Component {
  state = {
    dates: [
      getFormattedDate(moment(this.props.currentDate).format('YYYY-MM-DD'), 'subtract', 'months'),
      moment(this.props.currentDate).format('YYYY-MM-DD'),
      getFormattedDate(moment(this.props.currentDate).format('YYYY-MM-DD'), 'add', 'months'),
    ]
  }
  componentDidMount () {
    console.log(this.props.holidays)
    this.props.getEvents()
    this.props.setHeaderCallbacks({
      setToday: this.setToday,
      slideToNext: this.swipeNext,
      slideToPrev: this.swipePrev
    })
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    addHolidays(this.props.holidays)

    if (prevProps.events.length !== this.props.events.length || prevProps.activeWorkerId !== this.props.activeWorkerId) {
      const businessHours = config.workers.filter(worker => worker.id === this.props.activeWorkerId)[0].businessHours
      const days = document.querySelectorAll('.demo-app-calendar .fc-day')
      const obj = {}
      for (let i = 0; i < days.length; i++) {
        let day = days[i]
        obj[day.dataset.date] = dayRender(day.dataset.date, day, this.props.events, businessHours)
      }
      this.props.setDayCapacity(obj)
    }
  }

  swipeNext = () => {
    this.swiper.slideNext()
  }
  swipePrev = () => {
    this.swiper.slidePrev()
  }
  setToday = () => {
    this.setState({
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'months'),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'months')
      ]
    }, () => {
      this.swiper.loopCreate()
      this.swiper.slideToLoop(1)
      this.props.setDefaultDay(moment().format('YYYY-MM-DD'))
    })
  }
  onChange = isNext => {
    const nextIndex = getNext(this.swiper.realIndex, isNext)
    const dates = this.state.dates.slice()
    const today = dates[this.swiper.realIndex]
    dates[nextIndex] = getNextDay(dates[this.swiper.realIndex], isNext, 'months')
    this.setState({ swipeDirection: isNext, dates }, () => {
      this.props.setDefaultDay(today)
      this.props.getEvents()
      this.swiper.loopCreate()
    })
  }
  renderCalendar = date => {
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    const businessHours = config.workers.filter(worker => worker.id === this.props.activeWorkerId)[0].businessHours
    return (
      <div className="demo-app-calendar" key={date}>
        <FullCalendar
          key={date}
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          defaultView='monthly'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={date}
          events={this.props.events}
          businessHours={businessHours}
          contentHeight={calendarHeight}
          eventPositioned={eventPositioned}
          dayRender={data => { data.el.classList.add(this.props.dayCapacity[data.el.dataset.date]) }}
        />
      </div>
    )
  }
  settings = {
    loop: true,
    initialSlide: 1,
    runCallbacksOnInit: false,
    getSwiper: swiper => {
      this.swiper = swiper
    },
    on: {
      slideNextTransitionEnd: () => { this.onChange(true) },
      slidePrevTransitionEnd: () => { this.onChange(false) }
    }
  }
  render () {
    return (
      <div className={`containerCarousel ${config.calendar.dir.toUpperCase()} monthly-view ${config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'}`}>
        <Swiper {...this.settings}>{
          this.state.dates.map(date => this.renderCalendar(date))
        }</Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  currentDate: state.calendar.currentDate,
  dayCapacity: state.calendar.dayCapacity
})

export default connect(mapStateToProps, {
  getEvents,
  setDefaultDay,
  setDayCapacity
})(Daily)
