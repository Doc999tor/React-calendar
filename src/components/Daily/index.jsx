import React, { Component } from 'react'
import { setDefaultDay, setSwiperApi, setSwiperDirection } from 'store/calendar/actions'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
// import { getFormattedDate, getStandardFormat } from 'helpers'
import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import { connect } from 'react-redux'
import { setCalendarAPI, setVisibleDays } from '../../store/calendar/actions'
import './daily.styl'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      swiper: null,
      activeSlide: 1,
      activeSlideIndex: null,
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days')
      ]
    }
    this.swiperRef = this.swiperRef.bind(this)
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
    this.props.dispatch(setVisibleDays(this.props.defaultDate))
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.visibleDays[1] === this.state.visibleDays[1]) return false
    this.props.dispatch(getEvents())
  }
  swiperRef = ref => {
    // console.log('ref', ref)
    if (ref) {
      this.setState({ swiper: ref.swiper })
    }
  }
  onSlideChangeEnd = o => {
    // console.log('onSlideChangeEnd', o.swipeDirection)
    const sd = o.swipeDirection // || this.props.swipeDirection
    let dd
    if (sd) {
      const action = sd === 'next' ? 'add' : 'subtract'
      dd = getFormattedDate(this.props.defaultDate, action)
      this.props.dispatch(setDefaultDay(dd))
    }
    //
    if (dd && (dd !== this.state.visibleDays[1])) {
      const visibleDays = [getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days')]
      //   // this.setState({ visibleDays, refresh: true }, () => {
      //   //   this.setState({ refresh: false })
      //   // })

      // this.setState({visibleDays: visibleDays})

      // this.props.dispatch(setVisibleDays())
      this.props.dispatch(setVisibleDays(dd))
    }

    this.props.dispatch(setSwiperDirection(sd))
  }

  render () {
    if (!this.props.visibleDays) return null
    if (this.props.events.length === 0) return null
    const swiperParams = {
      rebuildOnUpdate: true,

      // shouldSwiperUpdate: true
      // initialSlide: 1,
      // loop: true,
      // onSlideChangeEnd:
      //   e => {
      //    // console.log('swipe', e)
      //     this.state.swiper && this.onSlideChangeEnd(e)
      //   }
    }
    return (
      <div id='swiper-calendar' style={{direction: config.calendar.dir}} className={config.workers.length === 1 ? ' calendar-without-workers' : ' calendar-with-workers'}>
        <Swiper
          {...swiperParams}
          // ref={this.swiperRef}
          ref={node => this.props.dispatch(setSwiperApi(node))}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop
        >{this.props.visibleDays.map((i, index) => (
          <div key={i}>
            <DemoCalendar
              columnHeaderText={date => moment(date).format('dddd YYYY-MM-DD')}
              events={this.props.events}
              defaultView='daily'
              defaultDate={i}/>
          </div>
        ))}
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDayRefresh: state.calendar.defaultDayRefresh,
  swipeDirection: state.calendar.swipeDirection,
  eventsFetching: state.events.eventsFetching,
  defaultDate: state.calendar.defaultDate,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events,
  visibleDays: state.calendar.visibleDays
})
export default connect(mapStateToProps)(Calendar)
