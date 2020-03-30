import React, { Component } from 'react'
import OffTime from './Popup/OffTime/OffTime.jsx'
import Queue from './Popup/Queue/Queue.jsx'
import { Redirect, Switch, Route } from 'react-router-dom'

function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
}

class CalendarModal extends Component {
  render () {
    let event = this.props.info
    if (!event) return <Redirect to={config.urls.startUrl + this.props.location.search} />
    let clientPhoto
    let defaultPhoto
    if (event.off_time === 'break' || event.off_time === 'vacation') {
      clientPhoto = `${config.urls.staticImg}/break-bgr.jpg`
    } else if (event.off_time === 'meeting') {
      clientPhoto = `${config.urls.staticImg}/meeting-bgr.jpg`
    } else if (!event.client_id || event.client_id <= 0) {
      clientPhoto = `${config.urls.imgForOccasionalClients}${config.occasionalClientPhoto}`
    } else {
      defaultPhoto = `${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}`
      clientPhoto = config.urls.imgForClients.replace('{client_id}', `${event.client_id}`) + fixedEncodeURIComponent(event.profile_picture)
    }
    const attr = {
      clientPhoto,
      defaultPhoto,
      close: () => {
        this.props.history.push(config.urls.startUrl + this.props.location.search)
        this.props.close()
      },
      event
    }
    return <React.Fragment>
      <Redirect to={`${this.props.match.url}/${this.props.info.id}` + this.props.location.search} />
      <Switch>
        {event.off_time
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
