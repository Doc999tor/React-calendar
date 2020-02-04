import React from 'react'
import Swiper from 'react-id-swiper'
import { getFormattedDate } from '../../helpers'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

class Monthly extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'months'),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'months'),
      ]
    }
  }

  afterChange = side => {
    const plus = side === 'next'
    const today = this.state.dates[this.swiperRef.realIndex]

  }

  renderCalendar = (date, index) => {
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    return (
      <div className="demo-app-calendar" key={index}>
        <FullCalendar
          key={date}
          {...config.calendar}
          businessHours={this.props.businessHours}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + index]}
          defaultView={'monthly'}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={date}
          events={this.props.events}
          contentHeight={calendarHeight}
          eventClick={this.eventClick}
          dayRender={date => console.log('i')}
        />
      </div>
    )
  }

  settings = {
    getSwiper: (e) => {
      this.swiperRef = e
    },
    initialSlide: 1,
    runCallbacksOnInit: false,
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

  render () {
    return (
      <div className={`containerCarousel ${config.calendar.dir.toUpperCase()} monthly-view ${config.workers.length === 1 
          ? 'calendar-without-workers' 
          : 'calendar-with-workers'}`}>
        <Swiper {...this.settings}>{
          this.state.dates.map((date, index) => this.renderCalendar(date, index))
        }</Swiper>
      </div>
    )
  }
}

export default Monthly
