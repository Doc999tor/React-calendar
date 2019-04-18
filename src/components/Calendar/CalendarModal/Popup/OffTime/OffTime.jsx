import React, { Component } from 'react'
import './OffTime.styl'

export default class OffTime extends Component {
  render () {
    const event = this.props.info.event
    const extendedProps = event.extendedProps
    return (
      <div id='offtime' style={config.calendar.isRTL ? { 'direction': 'rtl' } : { 'direction': 'ltr' }}>
        <div className='client-view'>
          <div className='backgroundForOfftime'>
            <div onClick={this.props.close} className='close-popup' style={config.calendar.isRTL ? { 'left': '20px' } : { 'right': '20px' }}>
              <span className='popup-cross'>&times;</span>
            </div>
            <div className='client-page'>
              <p className='client-name'>{extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
            </div>
          </div>
        </div>
        <div className='service-wrapper service-relative'>
          <div className='date-info upperWrap wrap-item' style={config.calendar.isRTL ? { 'right': '-50%' } : { 'left': '-50%' }}>
            <div className='service-date'>
              <div className='img'>
                <img className='img-service' src={config.urls.staticImg + '/calendar.svg'} />
              </div>
              <div className='date-wrap'>
                <p>
                  <span className='hour'>xyz</span>
                  <span className='monthDay'>xczxc</span>
                  <span className='dayOfWeek'>zxcxzc</span>
                </p>
                {event.durationEditable && <p className='approved'>{config.translations.approved}</p>}
              </div>
            </div>
            <div className='time-dur'>
              <p className='time'>123 - 321</p>
              <div className='duration'>
                <img className='mini' src={config.urls.staticImg + '/clock.svg'} />
                {/* <div className='event-duration'>${customTimeToText(event.end - event.start)}</div> */}
              </div>
            </div>
          </div>
          {extendedProps.note && <div className='notes wrap-item'>
            <div className='img'>
              <img className='img-notes' src={config.urls.staticImg + '/feather.svg'} />
            </div>
            <div className='notes-cont'>
              <h3 className='caption'>{config.translations.notes}</h3>
              <p className='notes-txt'>{extendedProps.note}</p>
            </div>
          </div>}
          {extendedProps.address && <div className='location wrap-item'>
            <div className='location-wrap'>
              <div className='img'>
                <img className='location-circle' src={config.urls.staticImg + '/circle-location.svg'} />
                <img className='img-location' src={config.urls.staticImg + '/address.svg'} />
              </div>
              <div className='location-cont'>
                <h3 className='caption'>{config.translations.address}</h3>
                <p className='address-loc'>{extendedProps.address}</p>
              </div>
            </div>
            <div className='location-icon'>
              <a className='link-maps' href={config.urls.google_maps.replace('{address}', extendedProps.address)}><img className='img-google-maps' src={config.urls.staticImg + '/google-maps.svg'} /></a>
              <a className='link-maps' href={config.urls.waze.replace('{address}', encodeURIComponent(extendedProps.address))}><img className='img-waze' src={config.urls.staticImg + '/waze.svg'} /></a>
            </div>
          </div>}
        </div>
        <div className='btn-section'>
          <div className='btn-wrap'>
            <button className='btn-styl edite'>{config.translations.edit}<img className='btn-img' src={config.urls.staticImg + '/edit-2.svg'} /></button>
            <button className='btn-styl delete'>{config.translations.delete}<img className='btn-img' src={config.urls.staticImg + '/delete.svg'} /></button>
          </div>
        </div>
      </div>
    )
  }
}
