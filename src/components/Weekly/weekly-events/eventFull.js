import {rowCount, bday, customTimeToText} from '../../../helpers/eventsCustomization'

export const customEventWeeklyFull = (event, element, start, end, view) => {
  let container = element.children[0]
  container.classList.add('ev-custom')
    let services = event.extendedProps.services
        ? event.extendedProps.services.reduce((phrase, currentItem, index, arr) => {
            let currentServiceCount = currentItem.count > 1 ? ` ⨯ ${currentItem.count}` : ''
            let currentServicePhrase =  !!currentItem.name ? currentItem.name + currentServiceCount : ''
            if(currentServicePhrase) {
                if(index === arr.length - 1) {
                    phrase += currentServicePhrase
                } else {
                    phrase += currentServicePhrase + ', '
                }
            }
            return phrase
        }, '')
        : ''
  if (event.extendedProps.services) {
    // services = services.slice(0, -1)
    services = services.split(',')
  }
  let customEvent
  if (rowCount(event.start, event.end) >= 0.1 && rowCount(event.start, event.end) < 2) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time shortOff'>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
          <p class='event-start'>${start}</p>
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service weeklyflex'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name}</p>`
    : `<p class='client-name'>${config.translations.occasional}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0].slice(0, 2) + ' +' + (services.length - 1) : services[0]}</p>
    <p>${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 2 && rowCount(event.start, event.end) < 3) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time twoOff'>
          <p class='event-start'>${start} - ${end}</p>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service twoline'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 3 && rowCount(event.start, event.end) < 4) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time threeOff'>
        <div class='time-name'>
          <p class='event-start'>${start} - ${end}</p>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>
          <div class='note-address'>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
       <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
    <p class='client-address'>${event.extendedProps.address}</p>
    </div>`
    : ''}
          ${event.extendedProps.note
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='client-note nowrap'>${event.extendedProps.note}</p>
    </div>`
    : ''}
        </div>
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service threeline'>
    <p class='event-start'>${start} - ${end}</p>
    ${event.extendedProps.name
      ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
      : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 4 && rowCount(event.start, event.end) < 5) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time threeOff'>
      <div class='time-name'>
        <p class='event-start'>${start} - ${end}</p>
        <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
      </div>
        <div class='note-address'>
      ${event.extendedProps.address
  ? `<div class='address-wrap'>
      <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
  <p class='client-address'>${event.extendedProps.address}</p>
  </div>`
  : ''}
        ${event.extendedProps.note
  ? `<div class='note-wrap'>
    <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
    <p class='client-note nowrap'>${event.extendedProps.note}</p>
  </div>`
  : ''}
      </div>
      </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service fourline'>
    <p class='event-start'>${start} - ${end}</p>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    <div class='note-address'>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
        <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
    <p class='client-address'>${event.extendedProps.address}</p>
    </div>`
    : ''}
          ${event.extendedProps.note && !event.extendedProps.address
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
    </div>`
    : ''}
        </div>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 5) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time fullOff'>
      <div class='time-name'>
        <div class='off_time_wrap'>
          <img class='off_time_img' src='${event.extendedProps.off_time === 'break' ? `${config.urls.staticImg}/break.svg` : `${config.urls.staticImg}/meeting.svg`}' />
        </div>
        <p class='event-start'>${start} - ${end}</p>
        </div>
        <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        <div class='note-address'>
      ${event.extendedProps.address
  ? `<div class='address-wrap'>
      <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
  <p class='client-address'>${event.extendedProps.address}</p>
  </div>`
  : ''}
        ${event.extendedProps.note
  ? `<div class='note-wrap'>
    <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
    <p class='client-note nowrap'>${event.extendedProps.note}</p>
  </div>`
  : ''}
      </div>
      </div>`
      : `<div class='click-mask'></div><div class='custom-event fullWeekly'>
          <div class='foto-time'>
             <div class='foto-name'>
            ${view.type === 'weekly'
    ? `${event.extendedProps.profile_picture && !!event.extendedProps.client_id && event.extendedProps.client_id >= 0
      ? `<div class='normalSize'><img class='fit normalSize' src='${config.urls.imgForClients.replace('{client_id}', `${event.extendedProps.client_id}`) + event.extendedProps.profile_picture}' onerror="this.onerror=null;this.src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}';"/></div>`
      : !event.extendedProps.client_id || event.extendedProps.client_id <= 0
        ? `<div><img class='fit normalSize' src='${config.urls.imgForOccasionalClients}${config.occasionalClientPhoto}' /></div>`
        : `<div><img class='fit normalSize' src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}' /></div>`}`
    : ''
}
<div class='time-info'>
            <p class='event-start'>${start} - ${end}</p>
            <div class='short-cont'>
              <div class='duration-wrap'>
                <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
              </div>
            </div>
          </div>
          </div>
          <div class='name-service'>
          ${event.extendedProps.name
  ? `<p class='client-name'>${event.extendedProps.name}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
  : `<p class='client-name'>${config.translations.occasional}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
          <p class='services-name'>${services.map(i => `<span class='service-item'>${i}</span>`)}</p>
          </div>
        </div>
        <div class='note-address'>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
        <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
    <p class='client-address'>${event.extendedProps.address}</p>
    </div>`
    : ''}
          ${event.extendedProps.note && (!event.extendedProps.address || rowCount(event.start, event.end) !== 5)
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='client-note nowrap'>${event.extendedProps.note}</p>
    </div>`
    : ''}
      </div>
    `)
  }
  container.innerHTML = customEvent
  return container
}
