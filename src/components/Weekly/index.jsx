import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
// TODO: make alias
import { getEvents } from '../../store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import ReactDOMServer from 'react-dom/server'
import { Swiper } from 'project-components'
import { connect } from 'react-redux'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'

class Weekly extends Component {
  state = {
    defaultView: this.props.view,
    defaultDate: config.calendar.defaultDate,
    middleDay: [],
    leftDay: [],
    rightDay: []
  }

  swiper = React.createRef()

  format = 'YYYY-MM-DD'

  getFormatedDate = (s, action) => (action ? moment(s)[action](1, 'days') : moment(s)).format(this.format)

  componentDidMount = async () => {
    await this.props.dispatch(getEvents())
    this.setEvents()
  }

  handleEventClick = info => this.setState({ info })

  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.state.defaultDate)[action](1, 'days').format(this.format)
      this.setState({ defaultDate }, () => { this.setEvents(swipeDirection) })
    }
  }

  setEvents = swipeDirection => {
    // WIP
    const f = this.getFormatedDate
    const { events } = this.props
    let res = {}
    if (swipeDirection === 'next') {
      // const defaultAttr = {
      //   defaultView: this.state.defaultView,
      //   eventClick: this.handleEventClick
      // }
      // this.swiper.appendSlide(ReactDOMServer.renderToStaticMarkup(
      //   <DemoCalendar
      //     defaultDate={this.getFormatedDate(this.state.defaultDate, 'add')}
      //     events={this.state.middleDay}
      //     {...defaultAttr} />
      // ))
      // this.swiper.removeSlide('0')
      res = {
        leftDay: this.state.middleDay,
        middleDay: this.state.rightDay,
        rightDay: events.filter(i => f(i.start) === f(this.state.defaultDate, 'add'))
      }
    } else if (swipeDirection === 'prev') {
      res = {
        leftDay: events.filter(i => f(i.start) === f(this.state.defaultDate, 'subtract')),
        middleDay: this.state.leftDay,
        rightDay: this.state.middleDay
      }
    } else {
      res = {
        leftDay: events.filter(i => f(i.start) === f(this.state.defaultDate, 'subtract')),
        middleDay: events.filter(i => f(i.start) === f(this.state.defaultDate)),
        rightDay: events.filter(i => f(i.start) === f(this.state.defaultDate, 'add'))
      }
    }

    this.setState(res)
  }

  render () {
    const defaultAttr = {
      defaultView: this.state.defaultView,
      eventClick: this.handleEventClick
    }
    // console.log(this.props)
    // slidesPerView={1} loopedSlides={0} loopAdditionalSlides={0} loop
    return (
      <div>
        <div id='swiper-calendar'>
          <Swiper
            onSlideChangeStart={this.onSlideChangeStart}
            ref={node => { if (node) this.swiper = node.swiper }}
            initialSlide={1} >
            <div>
              <DemoCalendar
                defaultView={this.props.view}
                refName={this.props.calendarComponentRef}
                defaultDate={this.getFormatedDate(this.state.defaultDate, 'subtract')}
                events={this.state.leftDay}
                {...defaultAttr} />
            </div>
            <div>
              <DemoCalendar
                defaultView={this.props.view}
                refName={this.props.calendarComponentRef}
                defaultDate={this.state.defaultDate}
                events={this.state.middleDay}
                {...defaultAttr} />
            </div>
            <div>
              <DemoCalendar
                defaultView={this.props.view}
                defaultDate={this.getFormatedDate(this.state.defaultDate, 'add')}
                refName={this.props.calendarComponentRef}
                events={this.state.rightDay}
                {...defaultAttr} />
            </div>
          </Swiper>
        </div>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(Weekly)
