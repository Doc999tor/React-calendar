import React from 'react'
import Slider from 'react-slick'
import FullCalendar from '@fullcalendar/react'
import { getFormattedDate } from '../../helpers'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { setDefaultDay } from '../../store/calendar/actions'

class Monthly extends React.Component {
  calendarComponentRef0 = React.createRef();
  calendarComponentRef1 = React.createRef();
  calendarComponentRef2 = React.createRef();

  constructor (props) {
    super(props)
    this.state = {
      slides: [0, 1, 2],
    }
  }

  componentDidMount () {
    this.props.getEvents()
  }

  setNextDate = (index, plus) => {
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

    let prevApi = this['calendarComponentRef' + index].current.getApi()
    const today = prevApi.getDate()
    this.props.setDefaultDay(moment(today).format('YYYY-MM-DD'))
    this.props.getEvents()
    const newToday = plus ? moment(today).add(1, 'months').format('YYYY-MM-DD') : moment(today).subtract(1, 'months').format('YYYY-MM-DD')
    this.dates[next] = newToday
  }

  afterChange = midIndex => {
    this.setNextDate(midIndex, this.side === 'left')
    this.setState({ midIndex, refresh: true }, () => {
      this.setState({ refresh: false })
    })
  }

  onSwipe = side => {
    this.side = side
  }

  dates = [
    getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'months'),
    moment().format('YYYY-MM-DD'),
    getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'months'),
  ]

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    speed: 100,
    arrows: false,
  }

  renderCalendar = slideIndex => {
    if (this.state.refresh) return null
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    return (
      <div id='calendar' key={this.dates[slideIndex]}>
        {this.dates[slideIndex]}
        <FullCalendar
          {...config.calendar}
          defaultView='monthly'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + slideIndex]}
          defaultDate={this.dates[slideIndex]}
          contentHeight={calendarHeight}
          events={this.props.events}
        />
      </div>
    )
  }

  render() {
    const topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <div id='swiper-calendar' className={topParam}>
        <Slider {...this.settings}>
          {this.state.slides.map(slideIndex => (
           this.renderCalendar(slideIndex)
          ))}
        </Slider>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps, {
  getEvents,
  setDefaultDay
})(Monthly)
