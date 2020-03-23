import React from 'react';
import {
  bday,
  colorStr,
  customTimeToText,
  debt,
  getHoursLabel,
  isFreeTimeBoxNeeded,
  newClient
} from '../../helpers/event'
import { Link } from 'react-router-dom'

const CustomEvent = (props) => {
  return (
    <div className='event-wrap'>
      <div className='agenda-event' data-id={props.event.id} data-appointment_id={props.event.id}
           style={config.calendar.dir === 'rtl'? { direction: 'rtl' } : { direction: 'ltr' }}
           onClick={() => {props.eventClick(props.event)}}>
        {props.event.profile_picture && !! props.event.client_id && props.event.client_id >= 0
          ? <div className='foto-wrap'>
            <img className='client-foto fit'
                 src={config.urls.imgForClients.replace('{client_id}', props.event.client_id) + props.event.profile_picture}
                 onError={(e) => {
                   e.target.onerror = null
                   e.target.src = `${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}`
                 }}
            />
          </div>
          : !props.event.client_id || props.event.client_id <= 0
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
          <div className={`note-about-user ${config.calendar.dir === 'rtl'? ' styleAgendaRTL' : ' styleAgendaLTR'}`}>
            {props.event.name && !! props.event.name
              ? <div className='name-wrap'>
                <p className='client-name'>{props.event.name}</p>
                <div className='client-icon'>{
                  props.event.birthdate
                    ? bday(props.event, props.defaultDate)
                    : ''
                }{
                  props.event.is_new_client
                    ? newClient()
                    : ''
                }{
                  props.event.has_debt
                    ? debt()
                    : ''
                }</div>
              </div>
              : <div className='name-wrap'>
                <p className='client-name'>{config.translations.occasional}</p>
                <div className='client-icon'>{
                  props.event.birthdate
                    ? bday(props.event, props.defaultDate)
                    : ''
                }{
                  props.event.is_new_client
                    ? newClient()
                    : ''
                }{
                  props.event.has_debt
                    ? debt()
                    : ''
                }</div>
              </div>
            }
            <p className='services-name'>{
              props.event.services.map((service, index) => <span key={index}
                                                           className='single-service'
              >{service.name + ', '}</span>)
            }</p>
            {props.event.address
              ? <div className='address-wrap'>
                <div className='address-image-wrap'>
                  <img className='address_pin' src={`${config.urls.staticImg}/grey-pin.svg`}/>
                </div>
                <p className='address-line'>{props.event.address}</p>
              </div>
              : ''
            }
          </div>
          <div className={`time-block ${config.calendar.dir === 'rtl'? ' styleTimeRTL' : ' styleTimeLTR'}`}
               style={{borderImage: `linear-gradient(to bottom ${colorStr(props.event.services)} ) 1 100%`}}
          >
            <div className='start-duration'>
              <p className='event-start'>{getHoursLabel(props.event.start.slice(-5, -3).toString(), props.event.start.slice(-2).toString())}</p>
              <div className='duration-wrap'>
                <img className='duration-img' src={`${config.urls.staticImg}/clock.svg`}/>
                <div className='event-duration'>{customTimeToText(props.event.end, props.event.start)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFreeTimeBoxNeeded(props.events, props.index).isNeeded ? <div className='duration-time' data-time-start={moment(isFreeTimeBoxNeeded(props.events, props.index).end).format('YYYY-MM-DD HH-mm')}>
        <div className='duration-time-content'>
          <div className='free-time_value'>{isFreeTimeBoxNeeded(props.events, props.index).hours}</div>
          <div className='duration-time_container'>
            <div className='free-time'>
              <Link to={{
                pathname: config.urls.creatingAppointmentLink,
                state: null
              }}><img className='cross' src={`${config.urls.staticImg}/plus.svg`}/></Link>
            </div>
          </div>
          <div className='free-time_title'><span>{config.translations.duration.description}</span></div>
        </div>
      </div> : null}
    </div>
  );
}

export default CustomEvent;
