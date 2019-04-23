import React, { Component } from 'react'
import './Queue.styl'

export default class Queue extends Component {
  render () {
    const event = this.props.info.event
    const extendedProps = event.extendedProps
    // console.log('event', event)
    // console.log('extends', extendedProps)
    return (
      <div id='eventPopup' style={config.calendar.isRTL ? { 'direction': 'rtl' } : { 'direction': 'ltr' }} >
        <div className='client-view'>
          <div className='gradient'>
            <div onClick={this.props.close} className='close-popup' style={config.calendar.isRTL ? { 'left': '20px' } : { 'right': '20px' }}>
              <span className='popup-cross'>&times;</span>
            </div>
            <div className='client-page'>
              <div className='client-info'>
                <span className='hour'>{moment(event.start).format('YYYY-MM-DD')}</span>
                <div className='client-icons'>
                  {extendedProps.client_id && <div className='wrap-icons'>
                    {/* {event.birthdate && bday(event, view.dateProfile.date)} */}
                    <div className='icons-item'>
                      <div className='wrap-icons'>
                        <img className='vip' src={config.urls.staticImg + '/vip-star.svg'} /> 
                      </div>
                      <span>{config.translations.vip}</span>
                    </div>
                    {extendedProps.has_debt && <div className='icons-item'>
                      <div className='wrap-icons'>
                        <img src={config.urls.staticImg + '/white-debt.svg'} />
                      </div>
                      <span>{config.translations.debt}</span>
                    </div>}
                  </div>}
                </div>
              </div>
              {extendedProps.name
                ? <div className='strip-name'>
                  <p className='client-name'>
                    <img className='user-def' src={config.urls.staticImg + '/user.svg'} />
                    {extendedProps.name}
                  </p>
                </div>
                : <div className='strip-name'>
                  <p className='client-name'>
                    <img className='user-def' src={config.urls.staticImg + '/user.svg'} />
                    {config.translations.occasional}
                  </p>
                </div>
              }
            </div>
            {extendedProps.phone && <div className='strip-phone'>
              <div className={'call' + (extendedProps.status ? '' : ' no-status')}>
                <a href={'sms:' + extendedProps.phone}>
                  <button className='btn-sms'>
                    <img className='img-sms' src={config.urls.staticImg + '/sms.svg'} />
                  </button>
                </a>
                <div className='wrap-tel'>
                  <a className='tel' href={'tel:' + extendedProps.phone}>
                    <img className='img-tel' src={config.urls.staticImg + '/phone-call 2.svg'} />
                    <span>{extendedProps.phone}</span>
                  </a>
                </div>
              </div>
              {extendedProps.status && <div className='status'>
                <p className='status-text'>{extendedProps.status}</p>
              </div>}
            </div>}
          </div>
        </div >
        <div className='service-wrapper'>
          <div className='date-info wrap-item'>
            <div className='service-date'>
              <div className='img'>
                <img className='img-service' src={config.urls.staticImg + '/calendar.svg'} />
              </div>
              <div className='date-wrap'>
                <p>
                  <span className='hour'>asdasd</span>
                  <span className='monthDay'>asdsad</span>
                  <span className='dayOfWeek'>asdasd</span>
                </p>
                {event.durationEditable && <p className='approved'>${config.translations.approved}</p>}
              </div>
            </div>
            <div className='time-dur'>
              <p className='time'>12 - 123</p>
              <div className='duration'>
                <img className='mini' src={config.urls.staticImg + '/clock.svg'} />
                {/* <div className='event-duration'>${customTimeToText(event.end - event.start)}</div> */}
              </div>
            </div>
          </div>
          {extendedProps.services && extendedProps.services.length > 0 && <div className='service-cont wrap-item'>
            <div className='service-wrap'>
              <div className='img-wrap'>
                <img className='img-service' src={config.urls.staticImg + '/credit-card.svg'} />
              </div>
              <div className='service-name'>
                <h3 className='caption'>{config.translations.services}</h3>
                <div className='item-wrap'>
                  {extendedProps.services.map((item, key) => {
                    if (item.count && item.count > 1) return (<p key={key}>{item.name}<span className='count-service'>{'⨯' + ' ' + item.count}</span></p>)
                    else return (<p key={key}>{item.name}</p>)
                  })}
                </div>
              </div>
            </div>
            {extendedProps.total_price && <div className='price'>
              <span>{extendedProps.total_price + ' ' + config.currency}</span>
            </div>}
          </div> }
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
              <a className='link-maps' href={config.urls.google_maps.replace('{address}', event.address)}><img className='img-google-maps' src={config.urls.staticImg + '/google-maps.svg'} /></a>
              <a className='link-maps' href={config.urls.waze.replace('{address}', encodeURIComponent(event.address))}><img className='img-waze' src={config.urls.staticImg + '/waze.svg'} /></a>
            </div>
          </div> }
        </div>
        <div className='btn-section'>
          <div className='btn-wrap'>
            <button className='btn-styl edite'>{config.translations.edit}<img className='btn-img edit' src={config.urls.staticImg + '/edit-2.svg'} /></button>
            <button className='btn-styl delete'>{config.translations.delete}<img className='btn-img delete' src={config.urls.staticImg + '/delete.svg'} /></button>
          </div>
        </div>
      </div>
    )
  }
}
