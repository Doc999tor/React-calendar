import mainRequestService from './request.service.js'

export const patchEventResize = (appointmentId, end) => {
  const url = `${config.urls.appointmentsUrl}/${appointmentId}`
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `end=${encodeURIComponent(end)}&added=${moment().format('YYYY-MM-DD HH:mm:ss')}`
  }
  return mainRequestService(url, options)
}

export const patchEventDrop = (appointmentId, start) => {
  const url = `${config.urls.appointmentsUrl}/${appointmentId}`
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `start=${encodeURIComponent(start)}&added=${moment().format('YYYY-MM-DD HH:mm:ss')}`
  }
  return mainRequestService(url, options)
}

const ids = []
export const deleteEvent = appointmentId => {
  if (ids.includes(appointmentId)) return new Promise(resolve => {})
  ids.push(appointmentId)
  const url = `${config.urls.appointmentsUrl}/${appointmentId}`
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `added=${moment().format('YYYY-MM-DD HH:mm:ss')}`
  }
  return mainRequestService(url, options)
}
