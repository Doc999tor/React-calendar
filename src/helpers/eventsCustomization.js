import { customEventFull } from '../components/Daily/daily-events/eventFull'
import { eventsSort } from './event'
import { customEventHalf } from '../components/Daily/daily-events/eventHalf'
import { customEventThird } from '../components/Daily/daily-events/eventThird'
import { customEventExtra } from '../components/Daily/daily-events/eventExtra'
import { customEventWeeklyOverley } from '../components/Weekly/weekly-events/eventOverlay'
import { customEventWeeklyFull } from '../components/Weekly/weekly-events/eventFull'

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
    return `<p class='full-dur' style="direction: ltr">
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
  container.innerHTML = customEvent
  element
}

export const getIndexByProperty = (arr, property, propertyValue) => {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i][property] === propertyValue) {
      return i
    }
  }
}

export const getEventType = (currentEvent) => {
  const events = currentEvent._calendar.getEvents()
  let currentEventIndex = getIndexByProperty(events, 'id', currentEvent.id)
  if (events.length >= 1) {
    let overlapCount = 0
    const overlapEvents = events.filter(event => {
      if (event.id !== currentEvent.id) {
        if ((moment(event.start) >= moment(currentEvent.start) && moment(event.start) <= moment(currentEvent.end)) || (moment(event.end) >= moment(currentEvent.start) && moment(event.end) <= moment(currentEvent.end))) {
          return true
        } else {
          return false
        }
      }
    })

    // if (currentEventIndex === 0) {
    //   for (let i = 1; i < events.length; i++) {
    //     if (!(moment(events[i].start) - moment(events[currentEventIndex].end) >= 0)) {
    //       overlapCount++
    //     }
    //   }
    // } else if (currentEventIndex === (events.length - 1)) {
    //   for(let i = currentEventIndex - 1; i >= 0; i--) {
    //     if(!(moment(events[currentEventIndex].start) - moment(events[i].end) >= 0)) {
    //       overlapCount++
    //     }
    //   }
    // } else {
    //   for (let i = currentEventIndex; i < events.length; i++) {
    //     if(i === currentEventIndex) {
    //       continue
    //     }
    //     if (!(moment(events[i].start) - moment(events[currentEventIndex].end) >= 0)) {
    //       overlapCount++
    //     }
    //   }
    //
    //   for(let i = currentEventIndex; i >= 0; i--) {
    //     if(i === currentEventIndex) {
    //       continue
    //     }
    //     if(!(moment(events[currentEventIndex].start) - moment(events[i].end) >= 0)) {
    //       overlapCount++
    //     }
    //   }
    // }

    switch (overlapEvents.length) {
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

export const arraySum = arr => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

export const textToTime = str => {
  return str.slice(0, 2) * 3600 + str.slice(3, 5) * 60
}

export const getDayColor = (sum, totalSum) => {
  const coef = sum / totalSum
  if (coef === 0) { return 'dayOfRest' }
  if (coef < 0.3) { return 'easyDay' }
  if (coef < 0.6) { return 'normalDay' }
  if (coef <= 1 || coef > 1) { return 'busyDay' }
}

const bgrColor = (date, element, events) => {
  const items = events.filter(event => date === moment(event.start).format('YYYY-MM-DD'))
  const activeWorker = config.workers.filter(worker => worker.active)[0]
  const businessHours = activeWorker.businessHours
  element.classList.remove('dayOfRest', 'easyDay', 'normalDay', 'busyDay')
  if (items && businessHours) {
    const times = items.map(i => moment(i.end) - moment(i.start))
    const filteredBusinessHours = businessHours.filter(item => item.daysOfWeek.includes(moment(date).day()))
    const totalHour = filteredBusinessHours.length !== 0 && (textToTime(filteredBusinessHours[0].endTime) - textToTime(filteredBusinessHours[0].startTime)) * 1000
    element.classList.add(filteredBusinessHours.length === 0
      ? 'dayOff'
      : getDayColor(arraySum(times), totalHour))
  }
}

const eventRender = (data) => {
  data.el.dataset.appointment_id = data.event.id
  if (data.view.type === 'daily' || data.view.type === 'weekly') {
    let {el, event, view} = data
    let color = event.extendedProps.services && event.extendedProps.services.length > 0 && event.extendedProps.services[0].color
      ? event.extendedProps.services[0].color
      : event.off_time
        ? '#777777'
        : '#4f2da7'
    el.style.direction = config.calendar.dir
    el.style.borderImage = 'linear-gradient(to bottom' + colorStr(event.extendedProps.services) + ') 1 100%'
    el.style.backgroundColor = event.extendedProps.off_time ? '' : mixColors(color, '#FFFFFF')
    let start = getHoursLabel(event.start.getHours().toString(), event.start.getMinutes().toString())
    let end = event.end
      ? getHoursLabel(event.end.getHours().toString(), event.end.getMinutes().toString())
      : ''
    draggingResizing(event, el, start, end, view)
  }
}

export const dayRender = (days, events) => {
  for (let i = 0; i < days.length; i++) {
    bgrColor(days[i].attributes['data-date'].value, days[i], events)
  }
}

export const eventPositioned = ({el, event, view, isMirror}) => {
  let start = getHoursLabel(event.start.getHours().toString(), event.start.getMinutes().toString())
  let end = event.end
    ? getHoursLabel(event.end.getHours().toString(), event.end.getMinutes().toString())
    : ''
  if (view.type === 'daily') {
    if (!isMirror) {
      const percent = Math.round(el.clientWidth / document.documentElement.clientWidth * 100)
      if (percent > 50) {
        return customEventFull(event, el, start, end, view)
      } else if (percent > 40) {
        return customEventHalf(event, el, start, end, view)
      } else if (percent > 25) {
        return customEventThird(event, el, start, end, view)
      } else {
        return customEventExtra(event, el, start, end, view)
      }
    }
  }

  if (view.type === 'weekly') {
    if(!isMirror) {
      const eventType = getEventType(event)
      if(eventType) {
        if (eventType === 'full') {
          return customEventWeeklyFull(event, el, start, end, view)
        } else {
          return customEventWeeklyOverley(event, el, start, end, view)
        }
      }
    }
  }

  if (view.type === 'monthly') {
    if (!isMirror) {
      let services = event.extendedProps.services
        ? event.extendedProps.services.reduce((phrase, item) => {
          return item.name && !!item.name ? phrase + `${item.name}` + (item.count > 1 ? ` ⨯ ${item.count},` : '') : phrase
        }, '')
        : []
      if (event.services) {
        services = services.split(',')
      }
      let color = event.extendedProps.services && event.extendedProps.services[0] && event.extendedProps.services[0].color ? event.extendedProps.services[0].color : 'transparent'
      el.classList.add('title_' + config.calendar.dir)
      el.setAttribute('data-event', moment(event.start).format('YYYY-MM-DD'))
      if ((el.getAttribute('data-event') !== moment(event._calendar.getDate()).format('YYYY-MM-DD'))) {
        el.classList.add('not-current-month')
      }
      el.style.borderColor = color
      if (event.extendedProps.off_time) {
        el.classList.add('off_time_title')
      }
      el.innerHTML = event.extendedProps.off_time
        ? `<p class='month_title off_time_service' > ${event.extendedProps.off_time === 'break' ? config.translations.business_lunch : config.translations.meeting}</p>`
        : event.extendedProps.services && !!event.extendedProps.services ? `<p class='month_title' ><span class='square'>&bull;</span><span class='service-item'>${event.extendedProps.name ? event.extendedProps.name : config.translations.occasional}</span></p>` : ''
    }
  }
}

export default eventRender
