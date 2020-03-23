import React from 'react';
import { colorStr, customTimeToText, getHoursLabel, isFreeTimeBoxNeeded } from '../../helpers/event'
import { Link } from 'react-router-dom'

const OffTime = (props) => {
  return (
    <div className='off_time-wrap'>
      <div className='off_time' data-id={props.event.id} data-appointment_id={props.event.id}
           style={{ direction: config.calendar.dir }}
           onClick={() => {props.eventClick(props.event)}}>
        <div className='off_time_wrap'>
          <img className='off_time_img'
               src={`${props.event.off_time === 'break' ? `${config.urls.staticImg}/break.svg` : `${config.urls.staticImg}/meeting.svg`}`}/>
        </div>
        <div className='note-info'>
          <div className={`note-about-user ${config.calendar.dir === 'rtl' ? ' styleAgendaRTL' : ' styleAgendaLTR'}`}>
            <p className='name-wrap'>{props.event.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
            {props.event.note
              ? <div className='note-wrap'>
                <img className='note-img' src={`${config.urls.staticImg}/feather.svg`}/>
                <p className='client-note'>{props.event.note}</p>
              </div>
              : ''
            }
            {props.event.address
              ? <div className='address-wrap'>
                <div className='address-img-wrap'>
                  <img className='address_pin' src={`${config.urls.staticImg}/grey-pin.svg`}/>
                </div>
                <p className='address-line'>{props.event.address}</p>
              </div>
              : ''
            }
          </div>
          <div className={`time-block ${config.calendar.dir === 'rtl' ? ' styleTimeRTL' : ' styleTimeLTR'}`}
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

export default OffTime;
