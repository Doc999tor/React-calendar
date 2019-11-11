import { calendar } from '../store/reducers'

export const customTimeToText = (end, start) => {
  let endSeconds = (end.slice(-5, -3) * 3600) + (end.slice(-2) * 60)
  let startSeconds = (start.slice(-5, -3) * 3600) + (start.slice(-2) * 60)
  let seconds = endSeconds - startSeconds
  let hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  let minutes = Math.floor(seconds / 60)
  if (hours === 1 && minutes === 0) {
    return `${hours} ${config.translations.duration.hour}`
  }
  if (hours === 0) {
    return `${minutes} ${config.translations.duration.minutes}`
  } else if (minutes === 0) {
    return `${hours} ${config.translations.duration.hours}`
  } else {
    return <p className='full-dur'><span
      className='hours'>{hours}</span><span>{config.translations.duration.abbreviated_hours}</span><span
      className='minutes'>{minutes}</span><span>{config.translations.duration.abbreviated_minutes}</span></p>
  }
}

export const colorStr = services => {
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
  } else {
    newMinutes = minutes
  }

  return newHours + ':' + newMinutes
}

export const bday = (event, date) => {
  if (event.birthdate.length === 5) {
    if (moment(`2018-${event.birthdate}`).format('MM') === moment(date).format('MM')) {
      return <p className='bday'><img className='bday-img' src={`${config.urls.staticImg}/bday.svg`}/><span
        className='bday-text'>{config.translations.birthday}</span></p>
    } else {
      return ''
    }
  } else if (event.birthdate.length === 10) {
    if (moment(event.birthdate).format('MM') === moment(date).format('MM')) {
      return <p className='bday'><img className='bday-img' src={`${config.urls.staticImg}/bday.svg`}/><span
        className='bday-text'>{config.translations.birthday}</span></p>
    } else {
      return ''
    }
  }
}

export const newClient = () => {
  return <p className='new-cust'><img className='new-client' src={`${config.urls.staticImg}/new.svg`}/><span
    className='new-text'>${config.translations.client}</span></p>
}
export const debt = () => {
  return <p className='dept'><img className='dept-img' src={`${config.urls.staticImg}/debt.svg`}/><span
    className='debt-text'>${config.translations.debt}</span></p>
}

export const eventsSort = (events, currentDate) => {
  events = events.filter(e => e.start.slice(0, 10) === currentDate).sort((a, b) => moment(a.start) - moment(b.start))
  return events
}

const freeTime = seconds => {
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
    return <p className='full-dur'><span className='hours'>{hours}</span> <span>{config.translations.duration.hours}</span> <span className='minutes'>{minutes}</span> <span>{config.translations.duration.minutes}</span></p>
  }
}

export const freeTimeArrCreator = (events, currentDate) => {
  let minTime = currentDate + ' ' + config.calendar.minTime
  let maxTime = currentDate + ' ' + config.calendar.maxTime
  let freeTimeArr = []
  let firstFreeTimeBox = null
  let lastFreeTimeBox = null
  if(moment.duration((moment(events[0].start) - moment(minTime)), 'milliseconds').asHours() > 0) {
    firstFreeTimeBox = {
      position: 'first',
      hours: freeTime(moment(events[0].start) - moment(minTime)),
      start: events[0].start
    }
    freeTimeArr.push(firstFreeTimeBox)
  }

  if(moment.duration((moment(maxTime) - moment(moment(events[events.length - 1].end))), 'milliseconds').asHours() > 0) {
    lastFreeTimeBox = {
      position: 'last',
      hours: freeTime(moment(maxTime) - moment(moment(events[events.length - 1].end))),
      end: events[events.length - 1].end
    }
    freeTimeArr.push(lastFreeTimeBox)
  }

  return freeTimeArr
}

export const isFreeTimeBoxNeeded = (events, index) => {
  if(events) {
    if(index === (events.length - 1)) {
      return {isNeeded: false}
    } else if((moment(events[index + 1].start) - moment(events[index].end)) > 0) {
      return {
        isNeeded: true,
        hours: freeTime(moment(events[index + 1].start) - moment(events[index].end)),
        end: events[index].end
      }
    } else {
      return {isNeeded: false}
    }
  } else {
    return {isNeeded: false}
  }
}

