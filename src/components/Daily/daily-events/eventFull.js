import {rowCount, bday, customTimeToText} from '../../../helpers/dailyEvents'


export const customEventFull = (event, element, start, end, view) => {
  let container = element.children[0]
  container.innerHTML = ''
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
    services = services.split(',')
  }

  let customEvent
  if (rowCount(event.start, event.end) >= 0.5 && rowCount(event.start, event.end) <= 1) {
      customEvent = event.extendedProps.off_time
        ? `<div class='click-mask'></div>
        <div class='off_time short'>
          <p class='name_full'>${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>
          <p class='event-start'>${start} - ${end}</p>
        </div>`
        : `<div class='click-mask'></div>
        <div class='custom-event short'>
    <div class='name-service flex'>
            ${event.extendedProps.name
          ? `<p class='client-name ${rowCount(event.start, event.end) === 1 ? 'oneRow' : ''}'>${event.extendedProps.name}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
          : `<p class='client-name ${rowCount(event.start, event.end) === 1 ? 'oneRow' : ''}'>${config.translations.occasional}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
    <p class='services-name single'>${services.length > 1 ? services[0] + ' +' + (services.length - 1) : services[0]}</p>
      ${event.extendedProps.is_new_client || event.durationEditable ? `<div class='iconsEditional'>
      ${event.durationEditable ? `<span class='paid'>${config.translations.paid}</span>` : event.extendedProps.is_new_client ? `<img class='new-icon' src='${config.urls.staticImg}/new.svg'>` : ''}
          </div>` : ''}
      <div class='time-info single-time'>
        <p class='event-start'>${start} - ${end}</p>
      </div>
    </div>`
  }
  if (rowCount(event.start, event.end) > 1) {
      customEvent = event.extendedProps.off_time
        ? `<div class='click-mask'></div>
          <div class='off_time'>
            <div class='off_time_extended'>
              <div class='off_time_wrap'>
                <img class='off_time_img' src='${event.extendedProps.off_time === 'break' ? `${config.urls.staticImg}/break.svg` : `${config.urls.staticImg}/meeting.svg`}' />
              </div>
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
            </div>
            <div class='off_time-info'>
              <p class='event-start'>${start} - ${end}</p>
              <div class='short-cont'>
                <div class='duration-wrap'>
                  <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                  <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
                </div>
              </div>
            </div>
          </div>`
        : `<div class='click-mask'></div>
        <div class='custom-event'>
        <div class='main-info'>
          <div class='foto-time'>
             <div class='foto-name'>
            ${view.type === 'daily'
          ? `${event.extendedProps.profile_picture && !!event.extendedProps.client_id && event.extendedProps.client_id >= 0
            ? `<img class='fit normalSize' src='${config.urls.imgForClients.replace('{client_id}', `${event.extendedProps.client_id}`) + event.extendedProps.profile_picture}' onerror="this.onerror=null;this.src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}';"/>` : !event.extendedProps.client_id || event.extendedProps.client_id <= 0 ?
              `<img class='normalSize fit' src='${config.urls.imgForOccasionalClients}${config.occasionalClientPhoto}' />` :
              `<img class='normalSize fit' src='${config.urls.defaultPathToClientImg}${config.defaultClientPhoto}' />`
          }
    `
          : ''
        }
            <div class='name-service'>
            ${event.extendedProps.name
          ? `<p class='client-name'>${event.extendedProps.name}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`
          : `<p class='client-name'>${config.translations.occasional}${event.extendedProps.birthdate ? bday(event, view.dateProfileGenerator.options.defaultDate) : ''}${event.extendedProps.has_debt ? `<span class='debt'><img class='mini' src='${config.urls.staticImg}/debt1.svg'></span>` : ''}</p>`}
            <p class='services-name'>${services.map(i => `<span class='service-item'>${i}</span>`)}</p>
            </div>
          </div>
          ${event.extendedProps.is_new_client || event.durationEditable ? `<div class='iconsEditional'>
            ${event.durationEditable ? `<span class='paid'>${config.translations.paid}</span>` : ''}
            ${event.extendedProps.is_new_client ? `<img class='new-icon' src='${config.urls.staticImg}/new.svg'>` : ''}
          </div>` : ''}
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
        ${rowCount(event.start, event.end) > 2 ? `<div class='note-address'>
        ${event.extendedProps.address && rowCount(event.start, event.end) > 2
          ? `<div class='address-wrap'>
        <div class='address-img-wrap'>
            <img class='address_pin' src='${config.urls.staticImg}/grey-pin.svg'>
        </div>
    <p class='client-address'>${event.extendedProps.address}</p>
    </div>`
          : ''}
          ${event.extendedProps.note && (rowCount(event.start, event.end) > 3 || !event.extendedProps.address)
          ? `<div class='note-wrap'>
      <div class='img-wrap'><img class='feather' src='${config.urls.staticImg}/feather.svg'></div>
      <p class='${`client-note ${rowCount(event.start, event.end) <= 6 ? 'nowrap' : ''}`}'>${event.extendedProps.note}</p>
    </div>`
          : ''}
        </div>` : ''}
      </div>
    `
  }
  container.innerHTML += customEvent
  return container
}
