import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'querystring'
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

class App extends Component {
  setHeaderCallbacks = callbacks => {
    this.setState({ ...callbacks })
  }

  render () {
    let view = queryString.parse(this.props.location.search).calendar_view_type
    return (
      <div className='app' >
        <Route render={props => <Header {...this.state} {...props} />} />
        {config.workers.length !== 1 && <Route render={props => <Workers {...props} />} />}
        <Switch>
          <Route exact path='/'>
            <Redirect to={config.urls.startUrl} />
          </Route>
          <Route path={`${config.urls.startUrl}/:dayId/appointments`} render={props => <CalendarModal info={this.props.eventInfo} close={() => this.props.deleteEventInfo()} {...props} />} />
          <Route path={config.urls.startUrl} >
            <Calendars
              setHeaderCallbacks={this.setHeaderCallbacks}
              currentDate={this.props.currentDate}
            />
          </Route>
        </Switch>
        {(view === 'weekly' || view === 'daily') && <TimeLabel currentView={view} />}
        <div className='modal-loading' style={{ display: this.props.dataLoading ? 'flex' : 'none' }}>
          Loading...
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDate: state.calendar.currentDate,
  eventInfo: state.calendar.eventInfo,
  dataLoading: state.calendar.dataLoading
})

export default connect(mapStateToProps, {
  deleteEventInfo
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
          const View = objView[queryString.parse(search).calendar_view_type]
          const activeWorkerId = queryString.parse(search)['?worker_id']
          return <View setHeaderCallbacks={props.setHeaderCallbacks} {...match} activeWorkerId={activeWorkerId} />
        }} />
      </Switch>
    </React.Fragment>
  )
}
