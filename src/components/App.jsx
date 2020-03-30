import React, { Component } from 'react'
import { connect } from 'react-redux'
import { holidays } from '../services/holidays.service'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from 'react-router-dom'
import Header from './Header/index.jsx'
import Workers from './Workers/Workers.jsx'
import Agenda from './Agenda/index.jsx'
import Daily from './Daily/index.jsx'
import Weekly from './Weekly/newWeekly.jsx'
import Monthly from './Monthly/index.jsx'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { TimeLabel } from './TimeLabels/TimeLabel.jsx'
import { deleteEventInfo } from 'store/calendar/actions'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/core/main.css'
import './App.styl'
import { refreshHolidays } from '../store/calendar/actions'

class App extends Component {
  setHeaderCallbacks = callbacks => {
    this.setState({ ...callbacks })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // let holidayObj = JSON.parse(localStorage.getItem('holidays_data'))
    // let lastUpdateDate = holidayObj.last_loaded_holidays
    // let daysDiff = Math.abs(moment(this.props.currentDate).diff(lastUpdateDate, 'days'))
    if (localStorage.getItem('holidays_data') === null) {
      holidays(moment(this.props.currentDate).year(), moment(this.props.currentDate).format()).then(i => {
        this.props.refreshHolidays()
      })
    } // else if (daysDiff >= 14) {
    //   console.log('update')
    //   localStorage.setItem('last_loaded_holidays', moment(this.props.currentDate).format())
    //   holidays(moment(this.props.currentDate).year(), moment(this.props.currentDate).format(), true).then(i => {
    //     this.props.refreshHolidays()
    //   })
    // }
  }

  render () {
    let view = new URLSearchParams(this.props.location.search).get('calendar_view_type')
    const activeWorkerId = new URLSearchParams(this.props.location.search).get('worker_id')
    return (
      <div className='app' >
        <Route render={props => <Header {...this.state} {...props} />} />
        {config.workers.length !== 1 && <Route render={props => <Workers {...props} activeWorkerId={activeWorkerId} />} />}
        <Switch>
          <Route exact path='/'>
            <Redirect to={config.urls.startUrl} />
          </Route>
          <Route path={`${config.urls.startUrl}/:dayId/appointments`} render={props => <CalendarModal info={this.props.eventInfo} close={() => this.props.deleteEventInfo()} {...props} />} />
          <Route path={config.urls.startUrl} >
            <Calendars
              setHeaderCallbacks={this.setHeaderCallbacks}
              currentDate={this.props.currentDate}
              holidays={this.props.holidays[moment(this.props.currentDate).year()]}
            />
          </Route>
        </Switch>
        {(view === 'weekly' || view === 'daily') && <TimeLabel currentView={view} />}
        <div className={`floating-button ${config.calendar.dir === 'rtl' ? 'standartLeft' : 'standartRight'}`}>
          <img className='cross' src={config.urls.staticImg + '/plus.svg'} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDate: state.calendar.currentDate,
  eventInfo: state.calendar.eventInfo,
  holidays: state.calendar.holidays,
  dataLoading: state.calendar.dataLoading
})

export default connect(mapStateToProps, {
  deleteEventInfo,
  refreshHolidays
})(App)


function Calendars (props) {
  const objView = {
    monthly: Monthly,
    agenda: Agenda,
    weekly: Weekly,
    daily: Daily
  }
  let match = useRouteMatch()
  let location = useLocation()
  let search = location.search ? location.search : `?worker_id=${config.activeWorkerId}&calendar_view_type=${config.calendar.defaultView}`
  return (
    <React.Fragment>
      <Redirect to={`${match.url}/${props.currentDate}` + search} />
      <Switch>
        <Route path={`${match.path}/:dayId`} render={match => {
          const View = objView[new URLSearchParams(search).get('calendar_view_type')]
          const activeWorkerId = new URLSearchParams(search).get('worker_id')
          return <View setHeaderCallbacks={props.setHeaderCallbacks} {...match} activeWorkerId={activeWorkerId} holidays={props.holidays} />
        }} />
      </Switch>
    </React.Fragment>
  )
}
