import React, { Component } from "react";

import Slider from "react-slick";
import './daily.styl'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { getFormattedDate } from '../../helpers'
import { connect } from 'react-redux'
import listPlugin from '@fullcalendar/list'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'
import { setDefaultDay } from '../../store/calendar/actions'
import { getEvents } from '../../store/events/actions'

class SimpleSlider extends Component {
  calendarComponentRef0 = React.createRef();
  calendarComponentRef1 = React.createRef();
  calendarComponentRef2 = React.createRef();
  state = {
    pages: [0, 1, 2],
  };

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.dates[this.state.midIndex]) {
      this.props.setDefaultDay(moment(this.dates[this.state.midIndex]).format('YYYYY-MM-DD'))
    }
    if(this.state.midIndex !== prevState.midIndex) {
      this.props.getEvents()
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

    let prevApi = this['calendarComponentRef' + index].current.getApi();
    const today = prevApi.getDate()
    const newToday = new Date(today.setDate(today.getDate() + (plus ? 1 : -1)))
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

  settings = {
    afterChange: this.afterChange,
    onSwipe: this.onSwipe,
    slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    infinite: true,
    speed: 200,
  };


  renderCalendar = item => {
    const { midIndex, refresh } = this.state
    const formattedDate = moment(this.dates[item]).format('YYYY-MM-DD')
    // console.log(this.props.events[formattedDate], formattedDate)
    return item !== midIndex && refresh ? null : (
      <div className="demo-app-calendar">
        <FullCalendar
          {...config.calendar}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this['calendarComponentRef' + item]}
          defaultView='daily'
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={this.dates[item]}
          events={this.props.events}
          contentHeight={'auto'}
          eventRender={(data) => renderDailyEvents(data)}
          eventPositioned={(data) => eventPositioned(data, this['calendarComponentRef' + item].current?.getApi())}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="containerCarusel" style={{marginTop: '160px'}}>
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
})(SimpleSlider)