import React from 'react'
import Swiper from 'react-id-swiper'
import { connect } from 'react-redux'
import { getEventInfo, setDefaultDay, setSwiperApi } from '../../store/calendar/actions'
import { getFormattedDate } from '../../helpers'
import { getEvents } from '../../store/events/actions'
import { eventsSort, freeTimeArrCreator } from '../../helpers/event'
import AgendaEvents from '../Agenda/agendaEvents.jsx'
import '../Agenda/Agenda.styl'

const getNext = (index, plus) => {
  let next
  if (plus) {
    next = index + 1
    if (next === 3) {
      next = 0
    }
  } else {
    next = index - 1
    if (next === -1) {
      next = 2
    }
  }

  return next
}

const getNextDay = (day, plus) => {
  return plus ? moment(day).add(1, 'days').format('YYYY-MM-DD') : moment(day).subtract(1, 'days').format('YYYY-MM-DD')
}

const getDatesFromEvents = events => {
  const first = moment(events[0].start).format('YYYY-MM-DD')
  const last = moment(events[events.length - 1].start).format('YYYY-MM-DD')
  return [
    first,
    last
  ]
}

class Agenda extends React.Component {
  state = {
    dates: [
      getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
      moment().format('YYYY-MM-DD'),
      getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days'),
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
    dates[nextIndex] = getNextDay(dates[this.swiper.realIndex], isNext)
    this.setState({ dates }, () => {
      this.swiper.loopCreate()
      this.props.setDefaultDay(today)
      if (getDatesFromEvents(this.props.events).includes(today)) {
        this.props.getEvents()
      }
    })
  }
  renderCalendar = date => {
    const sortedEvent = eventsSort(this.props.events, date)
    const freeTimeArr = sortedEvent.length === 0 ? null : freeTimeArrCreator(sortedEvent, date)
    return (
      <div className="demo-app-calendar" key={date}>
        <AgendaEvents
          events={sortedEvent}
          freeTimeArr={freeTimeArr}
          defaultDate={date}
          key={date}
          eventClick={e => {
            this.props.getEventInfo(e)
            this.props.history.push(`${this.props.match.url}/appointments${this.props.location.search}`)
          }}
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
      <div className={`containerCarousel ${config.calendar.dir.toUpperCase()} agenda-view ${config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'}`}>
        <Swiper {...this.settings}>{
          this.state.dates.map(date => this.renderCalendar(date))
        }</Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  businessHours: state.calendar.businessHours
})

export default connect(mapStateToProps, {
  getEvents,
  setDefaultDay,
  getEventInfo
})(Agenda)
