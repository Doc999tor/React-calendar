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
import { dayRender } from '../../helpers/dailyEvents'
import './monthly.styl'

class Monthly extends React.Component {
  calendarComponentRef0 = React.createRef();
  calendarComponentRef1 = React.createRef();
  calendarComponentRef2 = React.createRef();

  state = {
    pages: [0, 1, 2]
  }

  componentDidMount () {
    this.props.getEvents()
  }

  dates = [
    getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'months'),
    moment().format('YYYY-MM-DD'),
    getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'months'),
  ]

  afterChange = side => {
    const midIndex = this.swiperRef.realIndex
    const plus = side === 'next'
    this.setNextDate(midIndex, plus)
    this.setState({ midIndex, refresh: true }, () => {
      this.setState({ refresh: false })
    })
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

  settings = {
    getSwiper: (e) => {
      this.swiperRef = e
    },
    initialSlide: 1,
    loop: true,
    runCallbacksOnInit: false,
    on: {
      slideNextTransitionEnd: () => {
        this.afterChange('next')
      },
      slidePrevTransitionEnd: () => {
        this.afterChange('prev')
      }
    }
  }

  renderCalendar = item => {
    const { midIndex, refresh } = this.state
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    return item !== midIndex && refresh ? null : (
      <div className="demo-app-calendar">
        {this.dates[item]}
        <FullCalendar
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + item]}
          defaultView='monthly'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={this.dates[item]}
          eventSources={[{events: this.props.events}]}
          contentHeight={calendarHeight}
          // dayRender={data => {dayRender(data, this.props.events)}}
        />
      </div>
    )
  }

  render() {
    console.log(this.state.refresh)
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <div id='swiper-calendar' className={topParam}>
        <Swiper {...this.settings}>
          {
            [0, 1, 2].map(item => (
              <div key={item}>
                {this.renderCalendar(item)}
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
})(Monthly)