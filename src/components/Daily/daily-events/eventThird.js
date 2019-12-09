import {rowCount, bday, customTimeToText} from '../../../helpers/dailyEvents'

export const customEventThird = (event, element, start, end, view) => {
  let container = element.children[0]
  container.innerHTML = ''
  let services = event.extendedProps.services
    ? event.extendedProps.services.reduce((phrase, item) => {
      return item.name && !!item.name ? phrase + `${item.name}` + (item.count > 1 ? ` ⨯ ${item.count},` : '') : phrase
    }, '')
    : []
  if (event.extendedProps.services) {
    // services = services.slice(0, -1)
    services = services.split(',')
  }
  let customEvent
  if (rowCount(event.start, event.end) >= 0.5 && rowCount(event.start, event.end) < 2) {
    customEvent = (
      event.extendedProps.off_time
        ? `<div class='click-mask'></div><div class='off_time short-third ${config.calendar.dir === 'rtl'? 'singleOfftimeRTL' : 'singleOfftimeLTR'}'>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>`
        : `<div class='click-mask'></div><div class='custom-event short'>
    <div class='name-service half-flex ${config.calendar.dir === 'rtl'? 'singleThirdRTL' : 'singleThirdLTR'}'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 2) {
    customEvent = (
      event.extendedProps.off_time
        ? `<div class='click-mask'></div><div class='off_time third_off ${config.calendar.dir === 'rtl'? 'thirdOfftimeRTL' : 'thirdOfftimeLTR'}'>
      <div class='off_time_extended'>
      ${rowCount(event.start, event.end) >= 5 ? `<div class='off_time_wrap'>
          <img class='off_time_img' src='${event.extendedProps.off_time === 'break' ? `${config.urls.staticImg}/break.svg` : `${config.urls.staticImg}/meeting.svg`}' />
          <div class='off_time-info'>
          <p class='event-start'>${start} - ${end}</p>
        <div class='short-cont'>
          <div class='duration-wrap'>
            <img class='mini' src='${config.urls.staticImg}/clock.svg'>
            <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
          </div>
        </div>
      </div>
        </div>
        </div>` : ''}
        <div class='main_info'>
        <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
            <div class='address-img-wrap'>
              <img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'>
            </div>
            <p class='client-address'>${event.extendedProps.address}</p>
          </div>`
    : ''}
          ${event.extendedProps.note && (rowCount(event.start, event.end) > 2 || !event.extendedProps.address)
    ? `<div class='note-wrap'>
              <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
              <p class='client-note'>${event.extendedProps.note}</p>
            </div>`
    : ''}
          </div>
    </div>`
        : `<div class='click-mask'></div><div class='custom-event third ${config.calendar.dir === 'rtl'? 'thirdRTL' : 'thirdLTR'}'>
        <div class='main-info'>
          <div class='foto-time'>
             <div class='foto-name'>
            ${view.type === 'daily' && rowCount(event.start, event.end) >= 5
    ? `${event.extendedProps.profile_picture && !!event.extendedProps.client_id && event.extendedProps.client_id >= 0
      ? `<div class='wrap-time'><div><img class='fit normalSize' src='${config.urls.imgForClients.replace('{client_id}', `${event.extendedProps.client_id}`) + event.extendedProps.profile_picture}' onerror="this.onerror=null;this.src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}';"/></div>
       <div class='time-info'>
            <p class='event-start'>${start} - ${end}</p>
            <div class='short-cont'>
              <div class='duration-wrap'>
                <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
              </div>
            </div>
          </div>
       </div>` : !event.extendedProps.client_id || event.extendedProps.client_id <= 0
        ? `<div class='wrap-time'><div><img class='fit normalSize' src='${config.urls.imgForOccasionalClients}${config.occasionalClientPhoto}' /></div>
       <div class='time-info'>
            <p class='event-start'>${start} - ${end}</p>
            <div class='short-cont'>
              <div class='duration-wrap'>
                <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
              </div>
            </div>
          </div>
       </div>`
        : `<div class='wrap-time'><div><img class='fit normalSize' src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}' /></div>
       <div class='time-info'>
            <p class='event-start'>${start} - ${end}</p>
            <div class='short-cont'>
              <div class='duration-wrap'>
                <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
              </div>
            </div>
          </div>
       </div>`
    }
    `
    : ''
}
            <div class='${`name-service ${rowCount(event.start, event.end) <= 4 ? 'nopading' : ''}`}'>
            <div class='name-service-wrap'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>
            </div>
          </div>
          
        </div>
        <div class='${`note-address ${rowCount(event.start, event.end) === 3 ? 'nomargin' : ''}`}'>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
        <div class='address-img-wrap'>
            <img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'>
        </div>
    <p class='client-address'>${event.extendedProps.address}</p>
    </div>`
    : ''}
          ${event.extendedProps.note && ((rowCount(event.start, event.end) > 2 && rowCount(event.start, event.end) !== 5) || !event.extendedProps.address)
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='client-note'>${event.extendedProps.note}</p>
    </div>`
    : ''}
        </div>
      </div>
    `)
  }
  container.innerHTML += customEvent
  return container
}
