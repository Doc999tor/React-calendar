import React, { Component } from "react";

import Slider from "react-slick";
import AgendaEvents from './agendaEvents.jsx'
import './Agenda.styl'
import { getFormattedDate } from '../../helpers'
import { getEventInfo, setDefaultDay } from '../../store/calendar/actions'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { eventsSort, freeTimeArrCreator } from '../../helpers/event'

class Agenda extends Component {
  state = {
    pages: [0, 1, 2],
  };

  componentDidMount () {
    this.props.getEvents()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.dates[this.state.midIndex]) {
      this.props.setDefaultDay(moment(this.dates[this.state.midIndex]).format('YYYY-MM-DD'))
    }
    if(this.props.events && this.props.events.length > 0) {
      let prelastDay = moment(this.props.events[this.props.events.length - 1].start).subtract(1, 'days').format('YYYY-MM-DD')
      let preFirstDay = moment(this.props.events[0].start).add(1, 'days').format('YYYY-MM-DD')
      if(prelastDay === moment(this.dates[this.state.midIndex]).format('YYYY-MM-DD') || preFirstDay === moment(this.dates[this.state.midIndex]).format('YYYY-MM-DD')) {
        if(prevState.midIndex !== this.state.midIndex) {
          this.props.getEvents()
        }
      }
    }
  }

  dates = [
    getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'days'),
    moment().format('YYYY-MM-DD'),
    getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'days'),
  ]

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

    const today = new Date(this.dates[index])
    const newToday = plus ? moment(today).add(1, 'days').format('YYYY-MM-DD') : moment(today).subtract(1, 'days').format('YYYY-MM-DD')
    this.dates[next] = newToday
  }

  afterChange = midIndex => {
    this.setNextDate(midIndex, this.side === 'left')
    this.setState({ midIndex, refresh: true }, () => {
      this.setState({ refresh: false })
    })
  }

  onSwipe = side => {
    this.side = side
  }

  handleEventClick = eventInfo => {
    let obj = {event: {extendedProps: eventInfo}}
    this.props.getEventInfo(obj)
  }

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    arrows: false,
    speed: 100
  };


  renderCalendar = item => {
    const { midIndex, refresh } = this.state
    const sortedEvent = eventsSort(this.props.events, this.dates[item])
    const freeTimeArr = sortedEvent.length === 0 ? null : freeTimeArrCreator(sortedEvent, this.dates[item])
    return item !== midIndex && refresh ? null : (
      <div className="demo-app-calendar">
        <AgendaEvents events={sortedEvent}
                      freeTimeArr={freeTimeArr}
                      defaultDate={this.dates[item]}
                      eventClick={this.handleEventClick}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="containerCarousel agenda-view" style={{marginTop: '160px'}}>
          <Slider {...this.settings}>
            {[0, 1, 2].map(item => (
              <div key={item}>
                {this.renderCalendar(item)}
              </div>
            ))}
          </Slider>
          <div className={`preloader${config.calendar.dir === 'rtl' ? ' styleLoaderRTL' : ' styleLoaderLTR'}`} style={{display: this.props.eventsFetching ? 'flex' : 'none'}}>
            <img className='loader' src={config.urls.staticImg + '/preloader.svg'} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  eventsFetching: state.events.eventsFetching
})

export default connect(mapStateToProps, {
  setDefaultDay,
  getEvents,
  getEventInfo
})(Agenda)
