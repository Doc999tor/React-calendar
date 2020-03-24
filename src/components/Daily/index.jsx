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
import { setDefaultDay } from '../../store/calendar/actions'
import { getNext, getNextDay, getDatesFromEvents } from '../../helpers/days'
import eventRender, { eventPositioned } from '../../helpers/eventsCustomization'
import './daily.styl'

class Daily extends React.Component {
  state = {
    dates: [
      getFormattedDate(moment(this.props.currentDate).format('YYYY-MM-DD'), 'subtract', 'days'),
      moment(this.props.currentDate).format('YYYY-MM-DD'),
      getFormattedDate(moment(this.props.currentDate).format('YYYY-MM-DD'), 'add', 'days'),
    ]
  }
  componentDidMount () {
    this.props.getEvents()
    this.props.setHeaderCallbacks({
      setToday: this.setToday,
      slideToNext: this.swipeNext,
      slideToPrev: this.swipePrev
    })
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
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days')
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
    dates[nextIndex] = getNextDay(dates[this.swiper.realIndex], isNext, 'days')
    this.setState({ dates }, () => {
      this.swiper.loopCreate()
      this.props.setDefaultDay(today)
      if (getDatesFromEvents(this.props.events).includes(today)) {
        this.props.getEvents()
      }
    })
  }
  renderCalendar = date => {
    return (
      <div className="demo-app-calendar" key={date}>
        <FullCalendar
          key={date}
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          defaultView='daily'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={date}
          events={this.props.events}
          businessHours={config.workers.filter(worker => worker.id === this.props.activeWorkerId)[0].businessHours}
          eventRender={eventRender}
          eventPositioned={eventPositioned}
          dateClick={() => {window.location = config.urls.creatingAppointmentLink}}
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
    return(
      <div className={`containerCarousel ${config.calendar.dir.toUpperCase()} daily-view ${config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'}`}>
        <Swiper {...this.settings}>{
          this.state.dates.map(date => this.renderCalendar(date))
        }</Swiper>
      </div>
      )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  currentDate: state.calendar.currentDate
})

export default connect(mapStateToProps, {
  getEvents,
  setDefaultDay
})(Daily)
