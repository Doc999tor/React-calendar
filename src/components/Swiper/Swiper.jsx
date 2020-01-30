import React from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import { setDefaultDay, setSwiperApi } from '../../store/calendar/actions'
import { getFormattedDate } from '../../helpers'
import { getEvents } from '../../store/events/actions'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { eventsSort, freeTimeArrCreator } from '../../helpers/event'
import AgendaEvents from '../Agenda/agendaEvents.jsx'
import '../Daily/daily.styl'

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

const getNextDay = (day, plus, range) => {
  return plus ? moment(day).add(1, range).format('YYYY-MM-DD') : moment(day).subtract(1, range).format('YYYY-MM-DD')
}

const getDatesFromEvents = events => {
  const first = moment(events[0].start).format('YYYY-MM-DD')
  const last = moment(events[events.length - 1].start).format('YYYY-MM-DD')
  return [
    first,
    last
  ]
}

class Swiper extends React.Component {
  calendarComponentRef0 = React.createRef()
  calendarComponentRef1 = React.createRef()
  calendarComponentRef2 = React.createRef()


  constructor (props) {
    super(props)
    const range = props.currentView === 'monthly' ? 'months' : 'days'
    this.state = {
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', range),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', range),
      ],
      midIndex: 1
    }
  }

  componentDidMount () {
    this.props.getEvents()
    this.props.setHeaderCallbacks({
      setToday: this.setToday,
      slideToNext: this.slideToNext,
      slideToPrev: this.slideToPrev
    })
  }

  onSwipe = side => {
    this.side = side
  }

  afterChange = midIndex => {
    const range = this.props.currentView === 'monthly' ? 'months' : 'days'
    const plus = this.side === 'left'
    const today = this.state.dates[midIndex]
    const dates = this.state.dates.slice()
    dates[getNext(midIndex, plus)] = getNextDay(today, plus, range)
    this.setState({ dates }, () => {
      this.props.setDefaultDay(today)
      if (this.props.events.length && getDatesFromEvents(this.props.events).includes(today)) {
        this.props.getEvents()
      }
    })
  }

  setToday = () => {
    const range = this.props.currentView === 'monthly' ? 'months' : 'days'
    this.setState({ dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', range),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', range),
      ] }, () => {
      this.slider.slickGoTo(1)
      this.props.setDefaultDay(moment().format('YYYY-MM-DD'))
    })
  }

  slideToNext = () => {
    this.side = 'left'
    this.slider.slickNext()
  }

  slideToPrev = () => {
    this.side = 'right'
    this.slider.slickPrev()
  }

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    arrows: false
  }

  renderCalendar = (date, index) => {
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    const sortedEvent = eventsSort(this.props.events, date)
    const freeTimeArr = sortedEvent.length === 0 ? null : freeTimeArrCreator(sortedEvent, date)
    return this.props.currentView === 'agenda'
      ? (
        <div className="demo-app-calendar" key={index}>
          <AgendaEvents
            events={sortedEvent}
            freeTimeArr={freeTimeArr}
            defaultDate={date}
            key={date}
            // eventClick={this.handleEventClick}
          />
        </div>
      )
      : (
        <div className="demo-app-calendar" key={index}>
          <FullCalendar
            key={date}
            {...config.calendar}
            businessHours={this.props.businessHours}
            columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
            ref={this['calendarComponentRef' + index]}
            defaultView={this.props.currentView}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            defaultDate={date}
            events={this.props.events}
            contentHeight={this.props.currentView === 'monthly' ? calendarHeight : 'auto'}
            // eventRender={(data) => this.eventRender(data)}
            // eventPositioned={(data) => this.eventPositioned(data, this['calendarComponentRef' + index].current?.getApi())}
          />
        </div>
      )
  }

  render () {
    return (
      <div className="containerCarousel" style={{marginTop: '160px', direction: config.calendar.dir}}>
        <Slider ref={c => {
          this.props.setSwiperApi(c)
          this.slider = c
        }} {...this.settings}>{
          this.state.dates.map((date, index) => {
            return this.renderCalendar(date, index)
          })
        }</Slider>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  businessHours: state.calendar.businessHours
})

export default connect(mapStateToProps, {
  setSwiperApi,
  getEvents,
  setDefaultDay
})(Swiper)
