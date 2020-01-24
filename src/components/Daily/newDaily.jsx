import React from 'react'
import { getFormattedDate } from '../../helpers'
import Slider from 'react-slick'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { onSwipe, setDefaultDay, setSide, setSwiperApi, setToday } from '../../store/calendar/actions'
import './daily.styl'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'

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

class Daily extends React.Component {
  calendarComponentRef0 = React.createRef()
  calendarComponentRef1 = React.createRef()
  calendarComponentRef2 = React.createRef()

  constructor (props) {
    super(props)
    this.state = {
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days'),
      ]
    }
  }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    this.props.getEvents()
  }

  eventRender = data => {
    // eslint-disable-next-line react/prop-types
    if (this.props.events) {
      renderDailyEvents(data)
    }
  }

  eventPositioned = (data, api) => {
    if (api) {
      eventPositioned(data, api)
    }
  }

  onSwipe = side => {
    this.side = side
  }

  afterChange = midIndex => {
    const plus = this.side === 'left'
    const today = this.state.dates[midIndex]
    const dates = this.state.dates.slice()
    dates[getNext(midIndex, plus)] = getNextDay(today, plus)
    // dates[getNext(getNext(midIndex, plus), plus)] = getNextDay(getNextDay(today, plus), plus)
    // dates[getNext(getNext(getNext(midIndex, plus), plus), plus)] = getNextDay(getNextDay(getNextDay(today, plus), plus), plus)
    this.setState({ dates }, () => {
      // eslint-disable-next-line react/prop-types
      this.props.setDefaultDay(today)
    })
  }

  renderCalendar = (date, index) => {
    const { refresh } = this.state
    return refresh ? null : (
      <div className="demo-app-calendar">
        <FullCalendar
          key={date}
          {...config.calendar}
          businessHours={this.props.businessHours}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + index]}
          defaultView='daily'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={date}
          /* eslint-disable-next-line react/prop-types */
          events={this.props.events}
          eventRender={(data) => this.eventRender(data)}
          eventPositioned={(data) => this.eventPositioned(data, this['calendarComponentRef' + index].current?.getApi())}
        />
      </div>
    )
  }

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    speed: 200,
    arrows: false,
  }

  render () {
    return (
      <div className="containerCarousel" style={{marginTop: '160px', direction: config.calendar.dir}}>
        <Slider ref={c => {
          this.slider = c
          // eslint-disable-next-line react/prop-types
          this.props.setSwiperApi(c)
        }} {...this.settings}>
          {this.state.dates.map((date, index) => (
            <div data-index={date} key={date}>
              {this.renderCalendar(date, index)}
            </div>
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
  setSwiperApi,
  getEvents,
  setDefaultDay
})(Daily)
