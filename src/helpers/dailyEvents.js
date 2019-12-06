import { customEventFull } from '../components/Daily/daily-events/eventFull'
import { eventsSort } from './event'
import { customEventHalf } from '../components/Daily/daily-events/eventHalf'
import { customEventThird } from '../components/Daily/daily-events/eventThird'
import { customEventExtra } from '../components/Daily/daily-events/eventExtra'

export const rowCount = (start, end) => {
  let duration = Math.floor((end - start) / 60000)
  let arr = config.calendar.slotDuration.split(':')
  let ss = +arr[2] * 1000
  let mm = +arr[1] * 60000
  let hh = +arr[0] * 3600000
  let slotDuration = (ss + mm + hh) / 60000
  return duration / slotDuration
}

export const getHoursLabel = (hours, minutes) => {
  let newHours,
    newMinutes

  hours && hours.length === 1
    ? newHours = '0' + hours
    : newHours = hours
  if (minutes && minutes.length === 1) {
    minutes === 0
      ? newMinutes = minutes + '0'
      : newMinutes = '0' + minutes
  } else { newMinutes = minutes }

  return newHours + ':' + newMinutes
}

export const bday = (event, date) => {
  if (event.extendedProps.birthdate.length === 5) {
    if (moment(`2018-${event.extendedProps.birthdate}`).format('MM') === moment(date).format('MM')) {
      return `<span class='bday'><img class='bday-img' src='${config.urls.staticImg}/bday.svg'></span>`
    } else {
      return ''
    }
  } else if (event.extendedProps.birthdate.length === 10) {
    if (moment(event.extendedProps.birthdate).format('MM') === moment(date).format('MM')) {
      return `<span class='bday'><img class='bday-img' src='${config.urls.staticImg}/bday.svg'></span>`
    } else {
      return ''
    }
  }
}

const colorStr = services => {
  let nextNum = 0
  let colorStr = ''
  if (services) {
    const oneColorHeight = (100 / services.length).toFixed(2)
    for (let i = 0, l = services.length; i < l; i++) {
      const newNextNum = +nextNum + +oneColorHeight
      colorStr += ', ' + services[i].color + ' ' + nextNum + '%, ' + services[i].color + ' ' + newNextNum + '%'
      nextNum = newNextNum
    }
  }
  return colorStr
}

const toHexInt = i => parseInt(i, 16)

const _mixColors = (color1, color2) => {
  let color = ''
  for (let i = 0; i < color1.length; i += 2) {
    let partColor = Math.round((toHexInt(color1.slice(i, i + 2)) + toHexInt(color2.slice(i, i + 2))) / 2).toString(16)

    color += (partColor.length === 1 ? '' + partColor : partColor)
  }
  return color
}
const mixColors = (color1, color2) => {
  var c1 = color1[0] === '#' ? color1.slice(1) : color1
  var c2 = color2[0] === '#' ? color2.slice(1) : color2
  return '#' + _mixColors(c1, c2)
}

export const customTimeToText = seconds => {
  let hours = Math.floor(seconds / 3600000)
  seconds -= hours * 3600000
  let minutes = Math.floor(seconds / 60000)
  if (hours === 1 && minutes === 0) {
    return `${hours} ${config.translations.duration.hour}`
  }
  if (hours === 0) {
    return `${minutes} ${config.translations.duration.minutes}`
  } else if (minutes === 0) {
    return `${hours} ${config.translations.duration.hours}`
  } else {
    return `<p class='full-dur'>
  <span class='hours'>${hours}</span>
  <span>${config.translations.duration.abbreviated_hours}</span>
  <span class='minutes'>${minutes}</span>
  <span>${config.translations.duration.abbreviated_minutes}</span>
</p>`
  }
}

const draggingResizing = (event, element, start, end, view) => {
  let container = element.children[0]
  container.classList.add('ev-custom')
  let customEvent = (
    `<div class='info-time'>
      <p class='event-start'>${start} - ${end}</p>
      <div class='short-cont'>
              <div class='duration-wrap'>
                <img class='mini' src='${config.urls.staticImg}/clock.svg'>
                <div class='event-duration'>${customTimeToText(event.end - event.start)}</div>
              </div>
            </div>
    </div>`
  )
  container.innerHTML += customEvent
  return element
}

export const getIndexByProperty = (arr, property, propertyValue) => {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].extendedProps[property] === propertyValue) {
      return i
    }
  }
}

export const getEventType = (events, currentEvent) => {
  let currentEventIndex = getIndexByProperty(events, 'client_id', currentEvent.extendedProps.client_id)
  if (events.length > 1 && currentEventIndex >= 0) {
    let overlapCount = 0
    if (currentEventIndex === 0) {
      for (let i = 1; i < events.length; i++) {
        if (!(moment(events[i].start) - moment(events[currentEventIndex].end) >= 0)) {
          overlapCount++
        }
      }
    } else if (currentEventIndex === (events.length - 1)) {
      for(let i = currentEventIndex - 1; i >= 0; i--) {
        if(!(moment(events[currentEventIndex].start) - moment(events[i].end) >= 0)) {
          overlapCount++
        }
      }
    } else {
      for (let i = currentEventIndex; i < events.length; i++) {
        if(i === currentEventIndex) {
          continue
        }
        if (!(moment(events[i].start) - moment(events[currentEventIndex].end) >= 0)) {
          overlapCount++
        }
      }

      for(let i = currentEventIndex; i >= 0; i--) {
        if(i === currentEventIndex) {
          continue
        }
        if(!(moment(events[currentEventIndex].start) - moment(events[i].end) >= 0)) {
          overlapCount++
        }
      }

    }

    switch (overlapCount) {
    case 0:
      return 'full'
    case 1:
      return 'half'
    case 2:
      return 'third'
    default:
      return 'extra'
    }
  }
}

const eventRender = (data) => {
  let {el, event, view} = data
  let color = event.extendedProps.services && event.extendedProps.services.length > 0 && event.extendedProps.services[0].color
    ? event.extendedProps.services[0].color
    : event.off_time
      ? '#777777'
      : '#4f2da7'
  el.style.direction = config.calendar.isRTL ? 'rtl' : 'ltr'
  el.style.borderImage = 'linear-gradient(to bottom' + colorStr(event.extendedProps.services) + ') 1 100%'
  el.style.backgroundColor = event.extendedProps.off_time ? '' : mixColors(color, '#FFFFFF')
  let start = getHoursLabel(event.start.getHours().toString(), event.start.getMinutes().toString())
  let end = event.end
    ? getHoursLabel(event.end.getHours().toString(), event.end.getMinutes().toString())
    : ''
  return draggingResizing(event, el, start, end, view)
}

export const eventAfterRender = ({el, event, view}, api) => {
  let events = api ? api.getEvents() : []
  let sortedEvents = events.length > 0 ? eventsSort(events, view.dateProfileGenerator.options.defaultDate) : []
  let start = getHoursLabel(event.start.getHours().toString(), event.start.getMinutes().toString())
  let end = event.end
    ? getHoursLabel(event.end.getHours().toString(), event.end.getMinutes().toString())
    : ''
  const eventType = getEventType(sortedEvents, event)
  if(eventType === 'full') {
    return customEventFull(event, el, start, end, view)
  } else if (eventType === 'half'){
    return customEventHalf(event, el, start, end, view)
  } else if (eventType === 'third') {
    return customEventThird(event, el, start, end, view)
  } else if (eventType === 'extra') {
    return customEventExtra(event, el, start, end, view)
  }

}

export default eventRender
