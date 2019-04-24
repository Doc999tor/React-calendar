import { fetchingEvents } from 'project-services'
import * as types from './actionTypes'

const formatStartEndDay = (startDay, endDay) => {
  let dayStart = moment(startDay)
    .set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    }).format('YYYY-MM-DD HH:mm:ss')
  let dayEnd = moment(endDay)
    .set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 0
    }).format('YYYY-MM-DD HH:mm:ss')
  return ({
    dayStart,
    dayEnd
  })
}

export const getEvents = () => async (dispatch, getState) => {
  let getCalendarState = getState()
  let currentView = getCalendarState.calendar.currentView
  let defaultDate = moment(getCalendarState.calendar.defaultDate).format('YYYY-MM-DD')
  try {
    // dispatch({ type: types.GET_STANDART_EVENTS })
    const obj = {
      agenda: () => {
        let start = moment(defaultDate).subtract(1, 'days')
        let end = moment(defaultDate).add(1, 'days')
        return formatStartEndDay(start, end)
      },
      daily: () => {
        let start = moment(defaultDate).subtract(1, 'days')
        let end = moment(defaultDate).add(1, 'days')
        return formatStartEndDay(start, end)
      },
      weekly: () => {
        let start = moment(defaultDate).subtract(10, 'days')
        let end = moment(defaultDate).add(10, 'days')
        return formatStartEndDay(start, end)
      },
      monthly: () => {
        let start = moment(moment(defaultDate).startOf('month')).subtract(1, 'months').startOf('month')
        let end = moment(moment(defaultDate).endOf('month')).add(1, 'months').endOf('month')
        return formatStartEndDay(start, end)
      }
    }
    const { dayStart, dayEnd } = obj[currentView]()
    const res = await fetchingEvents(dayStart, dayEnd)
    // dispatch({ type: types.GET_STANDART_EVENTS_SUCCESS, payload: { events: res.events } })
  } catch (err) {
    dispatch({ type: types.GET_STANDART_EVENTS_ERROR })
  }
}
