import React from 'react'
import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { getEvents } from '../../store/events/actions'
import { getFormattedDate } from '../../helpers'
import './Weekly.styl'

class Weekly extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleDays: this.getVisibleDays(props.defaultDate)
    }
  }

  componentDidMount () {
    this.props.getEvents()
  }

  getVisibleDays = defaultDate => [
    getFormattedDate(defaultDate, 'subtract', 'days', 8),
    getFormattedDate(defaultDate, 'subtract', 'days', 4),
    defaultDate,
    getFormattedDate(defaultDate, 'add', 'days', 4),
    getFormattedDate(defaultDate, 'add', 'days', 8)
  ]

  renderCalendar = date => {
    return (
      <FullCalendar
        key={date}
        {...config.calendar}
        businessHours={this.props.businessHours}
        columnHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
        defaultView={'weekly'}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        defaultDate={date}
        events={this.props.events}
      />
    )
  }

  render () {
    let topParam = config.workers.length === 1 ? 'calendar-without-workers' : 'calendar-with-workers'
    return (
      <React.Fragment>
        <div id='calendar-weekly' className={topParam}>
          <div
            className='calendar-weekly'
            style={{ width: this.state.visibleDays.length * 100 + '%' }}
          >
            {
              this.state.visibleDays.map(date => this.renderCalendar(date))
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  defaultDate: state.calendar.defaultDate,
  businessHours: state.calendar.businessHours,
  events: state.events.events
})

export default connect(mapStateToProps, {
  getEvents
})(Weekly)
