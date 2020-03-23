import React, { Component } from 'react'
import OffTime from './Popup/OffTime/OffTime.jsx'
import Queue from './Popup/Queue/Queue.jsx'
import { Redirect, Switch, Route } from 'react-router-dom'

class CalendarModal extends Component {
  render () {
    if (!this.props.info) return <Redirect to={config.urls.startUrl + this.props.location.search} />
    const attr = {
      close: () => {
        this.props.history.push(config.urls.startUrl + this.props.location.search)
        this.props.close()
      },
      info: this.props.info
    }
    return <React.Fragment>
      <Redirect to={`${this.props.match.url}/${this.props.info.id}` + this.props.location.search} />
      <Switch>
        {this.props.info ?.event ?.extendedProps ?.off_time
          ? <Route path={`${this.props.match.path}/:eventId`}>
            <OffTime {...attr} />
          </Route>
          : <Route path={`${this.props.match.path}/:eventId`}>
            <Queue {...attr} />
          </Route>}
      </Switch>
    </React.Fragment>
  }
}

export default CalendarModal
