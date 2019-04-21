// import { fetchingEvents } from 'project-services'
import React from 'react'
import * as types from './actionTypes'

export const setCalendarAPIs = (days = []) => async dispatch => {
  const calendarAPIs = {}
  days.forEach(i => {
    calendarAPIs['ref' + moment(i)] = React.createRef()
  })
  dispatch({
    type: types.SET_CALENDAR_APIS,
    payload: { calendarAPIs, defaultDate: days[1] }
  })
}

export const setCalendarAPI = (day, dd) => async (dispatch, getState) => {
  const { defaultDate } = getState().calendar
  if (defaultDate === dd) {
    dispatch({ type: types.SET_CALENDAR_API, payload: { calendarApi: day?.getApi() } })
  }
}

export const switchView = currentView => async dispatch => {
  dispatch({ type: types.SWITCH_VIEW, payload: { currentView } })
}
