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
import Daily from './Daily/newDaily2.jsx'
import Weekly from './Weekly/newWeekly.jsx'
import Monthly from './Monthly/newOldSwiper.jsx'
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
    console.log('render', this.props)
    let view = queryString.parse(this.props.location.search).calendar_view_type
    return (
      <div className='app' >
        <Route render={props => <Header {...this.state} {...props} />} />
        {config.workers.length !== 1 && <Workers />}
        <Switch>
          <Route exact path='/'>
            <Redirect to={config.urls.startUrl} />
          </Route>
          <Route path={`${config.urls.startUrl}/:dayId/appointments`} render={props => <CalendarModal info={this.props.eventInfo} close={() => this.props.deleteEventInfo()} {...props} />} />
          <Route path={config.urls.startUrl} >
            <Calendars
              setHeaderCallbacks={this.setHeaderCallbacks}
              defaultDate={this.props.defaultDate}
            />
          </Route>
        </Switch>
        {(view === 'weekly' || view === 'daily') && <TimeLabel currentView={view} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDate: state.calendar.defaultDate,
  eventInfo: state.calendar.eventInfo,
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
      <Redirect to={`${match.url}/${props.defaultDate}` + search} />
      <Switch>
        <Route path={`${match.path}/:dayId`} render={match => {
          const View = objView[queryString.parse(search).calendar_view_type]
          return <View setHeaderCallbacks={props.setHeaderCallbacks} {...match} />
        }} />
      </Switch>
    </React.Fragment>
  )
}
