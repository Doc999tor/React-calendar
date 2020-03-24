import {rowCount, bday} from '../../../helpers/eventsCustomization'

export const customEventWeeklyOverley = (event, element, start, end, view) => {
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
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service weeklyflex overlayOne'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}</p>`}
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 2 && rowCount(event.start, event.end) < 3) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time twoOff'>
          <p class='event-start'>${start}</p>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service twoline'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 3 && rowCount(event.start, event.end) < 4) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time threeOff'>
        <div class='time-name'>
          <p class='event-start'>${start}</p>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>
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
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service threeline overlayThree'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services}</p>
    ${event.extendedProps.address
      ? `<div class='address-wrap'>
           <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
      <p class='client-address'>${event.extendedProps.address}</p>
      </div>`
      : ''}
    ${event.extendedProps.note && !event.extendedProps.address
  ? `<div class='note-wrap'>
    <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
    <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.note}</p>
  </div>`
  : ''}
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 4 && rowCount(event.start, event.end) < 5) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time threeOff'>
      <div class='time-name'>
        <p class='event-start'>${start}</p>
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
    <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
  </div>`
  : ''}
      </div>
      </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service fourline overlayFour'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}${event.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
        ${event.extendedProps.address
    ? `<div class='address-wrap'>
        <div class='img-wrap'><img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'></div>
        <p class='client-address'>${event.extendedProps.address}</p>
      </div>`
    : ''}
          ${event.extendedProps.note
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
    </div>`
    : ''}
    </div>`
    )
  }
  if (rowCount(event.start, event.end) >= 5) {
    customEvent = (
      event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time fullOff overlayOff'>
        <p class='event-start'>${start}</p>
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
    <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
  </div>`
  : ''}
      </div>
      </div>`
      : `<div class='click-mask'></div><div class='custom-event fullWeekly overlayFull'>
          <div class='foto-time'>
            <div class='time-info'>
            <p class='event-start'>${start} - ${end}</p>
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
          ${event.extendedProps.note
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='${`client-note ${rowCount(event.start, event.end) <= 4 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
    </div>`
    : ''}
      </div>
    `)
  }
  container.innerHTML = customEvent
  return container
}
