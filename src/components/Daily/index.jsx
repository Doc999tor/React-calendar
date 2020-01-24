import React from 'react'
import { getFormattedDate } from '../../helpers'
import Slider from 'react-slick'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import './daily.styl'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { onSwipe, setDefaultDay, setSide, setSwiperApi, setToday } from '../../store/calendar/actions'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'

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
      ],
      midIndex: 1
    }
  }

  componentDidMount () {
    // eslint-disable-next-line react/prop-types
    this.props.getEvents()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.isToday) {
      this.setToday()
    }
    if (this.props.swipeSide === 'next') {
      this.swipeNext()
    } else if (this.props.swipeSide === 'prev') {
      this.swipePrev()
    }
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

  afterChange = index => {
    // eslint-disable-next-line react/prop-types
    const plus = this.side === 'left'
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


    const dates = this.state.dates.slice()
    const today = this.state.dates[index]
    dates[next] = plus ? moment(today).add(1, 'days').format('YYYY-MM-DD') : moment(today).subtract(1, 'days').format('YYYY-MM-DD')
    this.setState({ dates, midIndex: index, refresh: true }, () => {
      this.setState({ refresh: false })
      // eslint-disable-next-line react/prop-types
      this.props.setDefaultDay(today)
      // eslint-disable-next-line react/prop-types
      this.props.getEvents()
    })
  }

  onSwipe = side => {
    this.side = side
  }

  setToday = () => {
    this.setState({
      dates: [
        getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
        moment().format('YYYY-MM-DD'),
        getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days'),
      ],
      refresh: true
    }, () => {
      this.setState({ refresh: false })
      this.slider.slickGoTo(1)
      // eslint-disable-next-line react/prop-types
      this.props.setDefaultDay(moment().format('YYYY-MM-DD'))
    })
    this.props.setToday(false)
  }

  swipeNext = () => {
    let next
    next = this.state.midIndex + 1
    if (next === 3) {
      next = 0
    }
    this.side = 'left'
    this.slider.slickNext()
    this.afterChange(next)
    this.props.onSwipe('none')
  }

  swipePrev = () => {
    let next
    next = this.state.midIndex - 1
    if (next === -1) {
      next = 2
    }
    this.side = 'right'
    this.slider.slickPrev()
    this.afterChange(next)
    this.props.onSwipe('none')
  }

  renderCalendar = (date, index) => {
    const { refresh } = this.state
    return refresh ? null : (
      <div className="demo-app-calendar">
        <FullCalendar
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
    speed: 500,
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
  events: state.events.events,
  side: state.calendar.side,
  isToday: state.calendar.setToday,
  swipeSide: state.calendar.swipeSide,
  businessHours: state.calendar.businessHours
})

export default connect(mapStateToProps, {
  getEvents,
  setDefaultDay,
  setSide,
  setSwiperApi,
  setToday,
  onSwipe
})(Daily)
