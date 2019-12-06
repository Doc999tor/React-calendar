import React from 'react'

const EmptyPage = () => {
  return (
    <div className={'empty-page-wrapper'}>
      <div className='empty-page' style={config.calendar.isRTL ? {direction: 'rtl', backgroundImage: `url(${config.urls.staticImg + '/empty-agenda.svg'})`} : {direction: 'ltr', backgroundImage: `url(${config.urls.staticImg + '/empty-agenda.svg'})`}}>
        <h1 className='agenda-title'>{config.translations.no_queues}</h1>
        <div className='agenda-text'>
          <p>{config.translations.empty_agenda}</p>
        </div>
        <div className='order-wrap'>
          <p className='order-text'>{config.translations.order_queue}</p>
          <div className='order-btn'><img className='cross' src={`${config.urls.staticImg}/plus.svg`} /></div>
        </div>
      </div>
    </div>
  )
}

export default EmptyPage
