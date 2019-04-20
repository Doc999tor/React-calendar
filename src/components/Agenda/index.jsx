import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
// TODO: make alias
import { getEvents } from '../../store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { connect } from 'react-redux'
import './Agenda.styl'

class Agenda extends Component {
  constructor () {
    super()
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        this.getFormatedDate(config.calendar.defaultDate, 'subtract'),
        config.calendar.defaultDate,
        this.getFormatedDate(config.calendar.defaultDate, 'add')
      ]
    }
    this.defaultDate = config.calendar.defaultDate
    this.setRefs(this.state.visibleDays)
  }

  componentDidMount = () => {
    // this.props.dispatch(getEvents())
  }

  setRefs = arr => {
    arr.forEach(i => {
      this['ref' + moment(i)] = React.createRef()
    })
  }

  format = 'YYYY-MM-DD'

  getFormatedDate = (s, action, days = 1) => (action ? moment(s)[action](days, 'days') : moment(s)).format(this.format)

  handleEventClick = info => this.setState({ info })

  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'days').format(this.format)
      this.defaultDate = defaultDate
    }
  }

  onSlideChangeEnd = () => {
    if (this.defaultDate !== this.state.visibleDays[1]) {
      const visibleDays = [
        this.getFormatedDate(this.defaultDate, 'subtract'),
        this.defaultDate,
        this.getFormatedDate(this.defaultDate, 'add')
      ]
      this.setRefs(visibleDays)
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
      })
    }
  }

  render () {
    // console.log('visibleDays', this.state.visibleDays)
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar' className='agenda-view'>
        <Swiper
          // ref={node => { if (node) this.swiper = node.swiper }}
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
                refName={this['ref' + moment(i)]}
                events={this.props.events}
                defaultView='agenda'
                defaultDate={i} />
            </div>
          ))}
        </Swiper>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(Agenda)
