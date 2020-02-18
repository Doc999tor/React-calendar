import React from 'react'
import Swiper from 'react-id-swiper'
import { getFormattedDate } from '../../helpers'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { setDefaultDay } from '../../store/calendar/actions'
import { dayRender } from '../../helpers/dailyEvents'
import './monthly.styl'

const getDates = defaultDate => [
  getFormattedDate(moment(defaultDate).format('YYYY-MM-DD'), 'subtract', 'months'),
  moment(defaultDate).format('YYYY-MM-DD'),
  getFormattedDate(moment(defaultDate).format('YYYY-MM-DD'), 'add', 'months'),
]

const getDeadlinesFromEvents = events => {
  const first = moment(events[0].start).format('YYYY-MM-DD')
  const last = moment(events[events.length - 1].start).format('YYYY-MM-DD')
  return [
    first,
    last
  ]
}

class Daily extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: getDates(moment())
    }
  }
  componentDidMount () {
    this.props.getEvents()
  }
  onChange = isNext => {
    const nextIndex = isNext ? 2 : 0
    const today = this.state.dates[nextIndex]
    this.setState({ dates: getDates(today) }, () => {
      this.props.setDefaultDay(today)
      this.props.getEvents()
    })
    // this.swiper.activeIndex = 1
  }
  settings = {
    // loop: true,
    initialSlide: 1,
    runCallbacksOnInit: false,
    // shouldSwiperUpdate: true,
    rebuildOnUpdate: true,
    getSwiper: swiper => {
      this.swiper = swiper
    },
    on: {
      slideNextTransitionEnd: () => { this.onChange(true) },
      slidePrevTransitionEnd: () => { this.onChange(false) }
    }
  }
  renderCalendar = date => {
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    return (
      <div className="demo-app-calendar" key={date}>
        <FullCalendar key={date}
                      {...config.calendar}
                      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                      defaultDate={date}
                      defaultView='monthly'
                      columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
                      events={this.props.events}
                      businessHours={this.props.businessHours}
                      contentHeight={calendarHeight}
                      dayRender={data => { dayRender(data, this.props.events) }}
        />
      </div>
    )
  }
  render () {
    return (
      <div className={`containerCarousel ${config.calendar.dir.toUpperCase()} monthly-view ${config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'}`} >
        <Swiper {...this.settings} >
          {this.state.dates.map(date => this.renderCalendar(date))}
        </Swiper>
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
  setDefaultDay
})(Daily)
