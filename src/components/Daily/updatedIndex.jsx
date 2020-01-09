import React from 'react'
import Swiper from 'react-id-swiper'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { getFormattedDate } from '../../helpers'
import { setDefaultDay } from '../../store/calendar/actions'
import { getEvents } from '../../store/events/actions'
import { connect } from 'react-redux'
import './daily.styl'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'

class Daily extends React.Component {
  // calendarComponentRef0 = React.createRef();
  // calendarComponentRef1 = React.createRef();
  // calendarComponentRef2 = React.createRef();

  state = {
    dates: [
      getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
      moment().format('YYYY-MM-DD'),
      getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days'),
    ],
  }

  componentDidMount () {
    this.props.getEvents()
  }

  afterChange = side => {
    const midIndex = this.swiperRef.realIndex
    const plus = side === 'next'
    this.setNextDate(midIndex, plus)
  }

  setNextDate = (index, plus) => {
    let { dates } = this.state
    const today = dates[index]
    const newToday = plus
      ? moment(dates[dates.length - 1]).add(1, 'days').format('YYYY-MM-DD')
      : moment(dates[0]).subtract(1, 'days').format('YYYY-MM-DD')
    const isSecond = dates.length === 3 ? true : (today === dates[0])
    const isPrelast = dates.length === 3 ? true : (today === dates[dates.length - 1])
    if (dates.length >= 5) {
      if (plus) {
        dates.shift()
        this.swiperRef.activeIndex = this.swiperRef.previousIndex
      } else {
        dates.pop()
        this.swiperRef.activeIndex = this.swiperRef.previousIndex
      }
    }
    if (isSecond || isPrelast) {
      if (plus) {
        dates.push(newToday)
      } else {
        this.swiperRef.activeIndex = this.swiperRef.previousIndex
        dates.unshift(newToday)
      }
      // console.log(dates)
      this.setState({ dates: dates }, () => {
        console.log('get events')
        this.props.getEvents()
      })
    }
    this.props.setDefaultDay(today)
  }

  settings = {
    getSwiper: (e) => {
      this.swiperRef = e
    },
    initialSlide: 1,
    runCallbacksOnInit: false,
    shouldSwiperUpdate: true,
    speed: 500,
    on: {
      slideNextTransitionEnd: () => {
        this.afterChange('next')
      },
      slidePrevTransitionEnd: () => {
        this.afterChange('prev')
      }
    }
  }

  eventRender = data => {
    if(this.props.events) {
      renderDailyEvents(data)
    }
  }

  eventPositioned = (data, api) => {
    if (api) {
      eventPositioned(data, {
        getEvents: () => api
      })
    }
  }

  renderCalendar = date => {
    return (
      <div className="demo-app-calendar">
        <FullCalendar
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          defaultView='daily'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={date}
          events={this.props.events}
          eventRender={(data) => {this.eventRender(data)}}
          eventPositioned={(data) => {this.eventPositioned(data, this.props.events)}}
        />
      </div>
    )
  }

  render() {
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <div id='swiper-calendar' className={topParam}>
        <Swiper {...this.settings}>
          {
            this.state.dates.map(date => (
              <div key={date}>
                {this.renderCalendar(date)}
              </div>
            ))
          }
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps, {
  setDefaultDay,
  getEvents
})(Daily)
