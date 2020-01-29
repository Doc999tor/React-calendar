import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import '../Daily/daily.styl'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'

class DemoCalendar extends React.Component {
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

  render () {
    return (
      <div className="demo-app-calendar">
        <FullCalendar
          key={this.props.date}
          {...config.calendar}
          businessHours={this.props.businessHours}
          columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          ref={this.props.calendarComponentRef}
          defaultView={this.props.currentView}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultDate={this.props.date}
          /* eslint-disable-next-line react/prop-types */
          events={this.props.events}
          eventRender={(data) => this.eventRender(data)}
          eventPositioned={(data) => this.eventPositioned(data, this.props.calendarComponentRef.current?.getApi())}
        />
      </div>
    )
  }
}

export default DemoCalendar
