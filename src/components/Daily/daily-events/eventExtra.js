import {rowCount, bday} from '../../../helpers/dailyEvents'

export const customEventExtra = (event, element, start, end, view) => {
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
  if (rowCount(event.start, event.end) > 0.5 && rowCount(event.start, event.end) < 2) {
    customEvent = event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time short-third ${config.calendar.isRTL ? 'singleOfftimeRTL' : 'singleOfftimeLTR'}'>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
        </div>`
      : `<div class='click-mask'></div><div class='custom-event'>
    <div class='name-service half-flex ${config.calendar.isRTL ? 'singleThirdRTL' : 'singleThirdLTR'}'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
    </div>`
  }
  if (rowCount(event.start, event.end) >= 2) {
    customEvent = event.extendedProps.off_time
      ? `<div class='click-mask'></div><div class='off_time third_off ${config.calendar.isRTL ? 'extraOfftimeRTL' : 'extraOfftimeLTR'}'>
      <div class='off_time_extended'>
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
          ${event.extendedProps.note
            ? `<div class='note-wrap'>
              <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
              <p class='client-note'>${event.extendedProps.note}</p>
            </div>`
            : ''}
          </div>
    </div>`
      : `<div class='click-mask'></div><div class='custom-event extra ${config.calendar.isRTL ? 'extraRTL' : 'extraLTR'}'>
        <div class='main-info'>
          <div class='foto-time'>
             <div class='foto-name'>
            <div class='${`name-service ${rowCount(event.start, event.end) <= 4 ? 'nopading' : ''}`}'>
            <div class='name-service-wrap'>
            ${event.extendedProps.name
    ? `<p class='client-name'>${event.extendedProps.name.split(' ', 1)}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
    : `<p class='client-name'>${config.translations.occasional.split(' ', 1)}${event.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
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
          ${event.extendedProps.note
    ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='${`client-note ${rowCount(event.start, event.end) > 5 ? 'normal' : ''}`}'>${event.extendedProps.note}</p>
    </div>`
    : ''}
        </div>
      </div>
    `
  }
  container.innerHTML += customEvent
  return container
}
