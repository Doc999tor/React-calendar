import React, { Component } from 'react'
import { setDefaultDay, setSwiperApi, setSwiperDirection } from 'store/calendar/actions'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
// import { getFormattedDate, getStandardFormat } from 'helpers'
import { default as Swiper } from 'project-components/Swiper/Swiper.js'
import { default as getFormattedDate } from 'helpers/getFormattedDate.js'
import { connect } from 'react-redux'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      swiper: null,
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
  static getDerivedStateFromProps (props) {
    return props.defaultDayRefresh
      ? {
        visibleDays: [
          getFormattedDate(props.defaultDate, 'subtract', 'days'),
          props.defaultDate,
          getFormattedDate(props.defaultDate, 'add', 'days')
        ]
      }
      : null
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.visibleDays[1] === this.state.visibleDays[1]) return false
    this.props.dispatch(getEvents())
  }
  swiperRef = ref => {
    // console.log('ref', ref)
    this.setState({ swiper: ref.swiper })
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
    if (dd && (dd !== this.state.visibleDays[1])) {
      const visibleDays = [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
      })
    }
    // if (this.props.swipeDirection) this.props.dispatch(setSwiperDirection())
  }

  render () {
    if (this.state.refresh || this.props.defaultDayRefresh) return null
    const swiperParams = {
      initialSlide: 1,
      loop: true,
      onSlideChangeEnd:
        e => {
          // console.log('swipe', e)
          this.state.swiper && this.onSlideChangeEnd()
        }

    }
    return (
      <div id='swiper-calendar'>
        <Swiper
        // {...swiperParams} ref={this.swiperRef}
        // ref={node => this.props.dispatch(setSwiperApi(node))}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop
          >
          {this.state.visibleDays.map(i => (
            // <div key={i} className='custom-slide'>
            //   <p>{i}</p>
            // </div>
            <div key={i}>
              <DemoCalendar
                columnHeaderText={date => moment(date).format('dddd YYYY-MM-DD')}
                events={this.props.events}
                defaultView='daily'
                defaultDate={i} />
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDayRefresh: state.calendar.defaultDayRefresh,
  // swipeDirection: state.calendar.swipeDirection,
  eventsFetching: state.events.eventsFetching,
  defaultDate: state.calendar.defaultDate,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Calendar)
