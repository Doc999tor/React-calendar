import React from 'react'
import {
  bday,
  newClient,
  debt,
  colorStr,
  getHoursLabel,
  customTimeToText, isFreeTimeBoxNeeded,
} from '../../helpers/event'
import { getEventInfo } from '../../store/calendar/actions'

const AgendaEvents = (props) => {
  let firstTimeBox = props.freeTimeArr ? props.freeTimeArr.filter( timeBox => timeBox.position === 'first') : null
  let lastTimeBox = props.freeTimeArr ? props.freeTimeArr.filter( timeBox => timeBox.position === 'last') : null
  return (
    <div className={`agenda-events`} style={config.calendar.isRTL ? { direction: 'rtl' } : { direction: 'ltr' }}>
      {
        firstTimeBox ? firstTimeBox[0] ? <div className='duration-time' data-time-start={moment(firstTimeBox[0].start).format('YYYY-MM-DD HH-mm')}>
          <div className='duration-time-content'>
            <div className='free-time_value'>{firstTimeBox[0].hours}</div>
            <div className='duration-time_container'>
              <div className='free-time'>
                <img className='cross' src={`${config.urls.staticImg}/plus.svg`}/>
              </div>
            </div>
            <div className='free-time_title'><span>{config.translations.duration.description}</span></div>
          </div>
        </div> : null : null
      }
      {props.events.map((event, index) => {
        if(event.off_time) {
          return (
            <div key={event.id} className='off_time-wrap'>
              <div className='off_time' data-id={event.id} data-appointment_id={event.id}
                   style={{ direction: config.calendar.isRTL ? 'rtl' : 'ltr' }}
                   onClick={() => {props.eventClick(event)}}>
                <div className='off_time_wrap'>
                  <img className='off_time_img'
                       src={`${event.off_time === 'break' ? `${config.urls.staticImg}/break.svg` : `${config.urls.staticImg}/meeting.svg`}`}/>
                </div>
                <div className='note-info'>
                  <div className={`note-about-user ${config.calendar.isRTL ? ' styleAgendaRTL' : ' styleAgendaLTR'}`}>
                    <p className='name-wrap'>{event.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
                    {event.note
                      ? <div className='note-wrap'>
                          <img className='note-img' src={`${config.urls.staticImg}/feather.svg`}/>
                          <p className='client-note'>{event.note}</p>
                        </div>
                      : ''
                    }
                    {event.address
                      ? <div className='address-wrap'>
                          <div className='address-img-wrap'>
                            <img className='address_pin' src={`${config.urls.staticImg}/grey-pin.svg`}/>
                          </div>
                          <p className='address-line'>{event.address}</p>
                        </div>
                      : ''
                    }
                    </div>
                    <div className={`time-block ${config.calendar.isRTL ? ' styleTimeRTL' : ' styleTimeLTR'}`}
                         style={{borderImage: `linear-gradient(to bottom ${colorStr(event.services)} ) 1 100%`}}
                    >
                      <div className='start-duration'>
                        <p className='event-start'>{getHoursLabel(event.start.slice(-5, -3).toString(), event.start.slice(-2).toString())}</p>
                        <div className='duration-wrap'>
                          <img className='duration-img' src={`${config.urls.staticImg}/clock.svg`}/>
                          <div className='event-duration'>{customTimeToText(event.end, event.start)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isFreeTimeBoxNeeded(props.events, index).isNeeded ? <div className='duration-time' data-time-start={moment(isFreeTimeBoxNeeded(props.events, index).end).format('YYYY-MM-DD HH-mm')}>
                  <div className='duration-time-content'>
                    <div className='free-time_value'>{isFreeTimeBoxNeeded(props.events, index).hours}</div>
                    <div className='duration-time_container'>
                      <div className='free-time'>
                        <img className='cross' src={`${config.urls.staticImg}/plus.svg`}/>
                      </div>
                    </div>
                    <div className='free-time_title'><span>{config.translations.duration.description}</span></div>
                  </div>
                </div> : null}
            </div>
          );
        } else {
          return (
            <div key={event.id} className='event-wrap'>
              <div className='agenda-event' data-id={event.id} data-appointment_id={event.id}
                   style={config.calendar.isRTL ? { direction: 'rtl' } : { direction: 'ltr' }}
                   onClick={() => {props.eventClick(event)}}>
                {event.profile_picture && !!event.client_id && event.client_id >= 0
                  ? <div className='foto-wrap'>
                    <img className='client-foto fit'
                         src={config.urls.imgForClients.replace('{client_id}', event.client_id) + event.profile_picture}
                         onError={(e) => {
                           e.target.onerror = null
                           e.target.src = `${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}`
                         }}
                    />
                  </div>
                  : !event.client_id || event.client_id <= 0
                    ? <div className='foto-wrap'>
                      <img className='client-foto fit'
                           src={`${config.urls.imgForOccasionalClients}${config.occasionalClientPhoto}`}
                      />
                    </div>
                    : <div className='foto-wrap'>
                      <img className='client-foto fit'
                           src={`${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}`}/>
                    </div>
                }
                <div className='note-info'>
                  <div className={`note-about-user ${config.calendar.isRTL ? ' styleAgendaRTL' : ' styleAgendaLTR'}`}>
                    {event.name && !!event.name
                      ? <div className='name-wrap'>
                        <p className='client-name'>{event.name}</p>
                        <div className='client-icon'>{
                          event.birthdate
                            ? bday(event, props.defaultDate)
                            : ''
                        }{
                          event.is_new_client
                            ? newClient()
                            : ''
                        }{
                          event.has_debt
                            ? debt()
                            : ''
                        }</div>
                      </div>
                      : <div className='name-wrap'>
                        <p className='client-name'>{config.translations.occasional}</p>
                        <div className='client-icon'>{
                          event.birthdate
                            ? bday(event, props.defaultDate)
                            : ''
                        }{
                          event.is_new_client
                            ? newClient()
                            : ''
                        }{
                          event.has_debt
                            ? debt()
                            : ''
                        }</div>
                      </div>
                    }
                    <p className='services-name'>{
                      event.services.map((service, index) => <span key={index}
                                                                   className='single-service'
                      >{service.name + ', '}</span>)
                    }</p>
                    {event.address
                      ? <div className='address-wrap'>
                        <div className='address-image-wrap'>
                          <img className='address_pin' src={`${config.urls.staticImg}/grey-pin.svg`}/>
                        </div>
                        <p className='address-line'>{event.address}</p>
                      </div>
                      : ''
                    }
                  </div>
                  <div className={`time-block ${config.calendar.isRTL ? ' styleTimeRTL' : ' styleTimeLTR'}`}
                       style={{borderImage: `linear-gradient(to bottom ${colorStr(event.services)} ) 1 100%`}}
                  >
                    <div className='start-duration'>
                      <p className='event-start'>{getHoursLabel(event.start.slice(-5, -3).toString(), event.start.slice(-2).toString())}</p>
                      <div className='duration-wrap'>
                        <img className='duration-img' src={`${config.urls.staticImg}/clock.svg`}/>
                        <div className='event-duration'>{customTimeToText(event.end, event.start)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isFreeTimeBoxNeeded(props.events, index).isNeeded ? <div className='duration-time' data-time-start={moment(isFreeTimeBoxNeeded(props.events, index).end).format('YYYY-MM-DD HH-mm')}>
                <div className='duration-time-content'>
                  <div className='free-time_value'>{isFreeTimeBoxNeeded(props.events, index).hours}</div>
                  <div className='duration-time_container'>
                    <div className='free-time'>
                      <img className='cross' src={`${config.urls.staticImg}/plus.svg`}/>
                    </div>
                  </div>
                  <div className='free-time_title'><span>{config.translations.duration.description}</span></div>
                </div>
              </div> : null}
            </div>
          )
        }
      })}
      {
        lastTimeBox ? lastTimeBox[0] ? <div className='duration-time' data-time-start={moment(lastTimeBox[0].end).format('YYYY-MM-DD HH-mm')}>
          <div className='duration-time-content'>
            <div className='free-time_value'>{lastTimeBox[0].hours}</div>
            <div className='duration-time_container'>
              <div className='free-time'>
                <img className='cross' src={`${config.urls.staticImg}/plus.svg`}/>
              </div>
            </div>
            <div className='free-time_title'><span>{config.translations.duration.description}</span></div>
          </div>
        </div> : null : null
      }
    </div>
  )
}

export default AgendaEvents
