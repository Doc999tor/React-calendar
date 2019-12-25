import React, { Component } from "react";

import Slider from "react-slick";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './monthly.styl'

import { getFormattedDate } from '../../helpers'
import { connect } from 'react-redux'
import listPlugin from '@fullcalendar/list'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'
import { setDefaultDay } from '../../store/calendar/actions'
import { getEvents } from '../../store/events/actions'

class Monthly extends Component {
  calendarComponentRef0 = React.createRef();
  calendarComponentRef1 = React.createRef();
  calendarComponentRef2 = React.createRef();
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

    if(this.state.midIndex !== prevState.midIndex) {
      this.props.getEvents()
    }
  }

  dates = [
    getFormattedDate(moment().format('YYYY-MM-DD'), 'subtract', 'months'),
    moment().format('YYYY-MM-DD'),
    getFormattedDate(moment().format('YYYY-MM-DD'), 'add', 'months'),
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

    let prevApi = this['calendarComponentRef' + index].current.getApi()
    const today = prevApi.getDate()
    const newToday = plus ? moment(today).add(1, 'months').format('YYYY-MM-DD') : moment(today).subtract(1, 'months').format('YYYY-MM-DD')
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

  eventRender = (data, api) => {
    if(this.props.events) {
      // console.log(renderDailyEvents(data), data.event.id)
      return renderDailyEvents(data, api)
    }
  }

  eventPositioned = (data, api) => {
    if(api) {
      // console.log(eventPositioned(data, api), data.event.id)
      return eventPositioned(data, api)
    }
  }

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    speed: 100,
    arrows: false,
  };


  renderCalendar = item => {
    const { midIndex, refresh } = this.state
    const documentHeight = document.documentElement.clientHeight
    const calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 165
    return item !== midIndex && refresh ? null : (
      <div className="demo-app-calendar">
        <FullCalendar
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + item]}
          defaultView='monthly'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={this.dates[item]}
          eventSources={[{events: this.props.events}]}
          contentHeight={calendarHeight}
          eventRender={data => {this.eventRender(data, this['calendarComponentRef' + item].current.getApi())}}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="containerCarusel monthly-view" style={{marginTop: '160px'}}>
          <Slider {...this.settings}>
            {[0, 1, 2].map(item => (
              <div key={item}>
                {this.renderCalendar(item)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
})

export default connect(mapStateToProps, {
  setDefaultDay,
  getEvents
})(Monthly)