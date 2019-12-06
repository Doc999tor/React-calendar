import React from 'react'
import OffTime from './offTime.jsx'
import CustomEvent from './customEvent.jsx'
import EmptyPage from './EmptyPage.jsx'

const AgendaEvents = (props) => {
  let firstTimeBox = props.freeTimeArr ? props.freeTimeArr.filter(timeBox => timeBox.position === 'first') : null
  let lastTimeBox = props.freeTimeArr ? props.freeTimeArr.filter(timeBox => timeBox.position === 'last') : null
  return (
    <div className='agenda-events' style={config.calendar.isRTL ? { direction: 'rtl' } : { direction: 'ltr' }}>
      {
        firstTimeBox ? firstTimeBox[0] ?
          <div className='duration-time' data-time-start={moment(firstTimeBox[0].start).format('YYYY-MM-DD HH-mm')}>
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
      {props.events.length !== 0 ? props.events.map((event, index) =>
        event.off_time
          ? <OffTime event={event}
                     events={props.events}
                     index={index}
                     key={event.id}
                     eventClick={props.eventClick}

          />
          : <CustomEvent event={event}
                         events={props.events}
                         index={index}
                         key={event.id}
                         defaultDate={props.defaultDate}
                         eventClick={props.eventClick}
          />) : <EmptyPage/>}
      {
        lastTimeBox ? lastTimeBox[0] ?
          <div className='duration-time' data-time-start={moment(lastTimeBox[0].end).format('YYYY-MM-DD HH-mm')}>
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
