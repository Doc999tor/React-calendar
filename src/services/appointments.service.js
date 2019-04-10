import mainRequestService from './request.service.js'

let workers = {}
let lastWorkerId
const isEventsFetched = (start, end, worker) => {
  return +new Date(worker.start) <= +new Date(start) && +new Date(worker.end) >= +new Date(end)
}

export default (start, end, forceFetch) => {
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  return new Promise((resolve, reject) => {
    if (forceFetch) workers[config.activeWorkerId] = null
    const worker = workers[config.activeWorkerId]
    let originalStart
    let originalEnd
    const refresh = config.activeWorkerId !== lastWorkerId
    lastWorkerId = config.activeWorkerId
    if (worker) {
      if (isEventsFetched(start, end, worker)) {
        // resolve(worker.events)
        resolve({ events: refresh ? worker.events : [], refresh })
        return
      }
      if (+new Date(worker.start) < +new Date(start)) { // start in worker early than requested
        originalStart = worker.start
        start = worker.end
      }
      if (+new Date(worker.end) > +new Date(end)) { // end in worker later than requested
        originalEnd = worker.end
        end = worker.start
      }
    }
// start: 2019-04-09 00:00:00
// end: 2019-04-11 23:59:59
// worker_id: 11
    const url = `${config.urls.appointmentsUrl}?start=2019-04-01 00:00:00&end=2019-04-30 23:59:59&worker_id=11`
    // const url = `${config.urls.appointmentsUrl}?start=${start}&end=${end}&worker_id=${config.activeWorkerId}`
    // $('.preloader').removeClass('hidden')
    mainRequestService(url, options).then(r => {
      if (r.status !== 200) return reject([])
      r.json().then(r => {
        let events = r.map(i => {
          return i
        })
        let lastEvents
        if (worker) {
          lastEvents = events
          events = [...worker.events, ...events]
        }
        workers[config.activeWorkerId] = {
          start: originalStart || start,
          end: originalEnd || end,
          events
        }
        window.isActive = false
        // $('.preloader').addClass('hidden')
        resolve({ events: lastEvents || events, refresh })
      })
    })
  })
}
