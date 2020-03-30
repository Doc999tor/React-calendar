// import { fetchingEvents } from 'project-services'
import * as types from './actionTypes'

export const setDefaultDay = (date) => dispatch => {
  dispatch({ type: types.SET_DEFAULT_DAY, payload: { date } })
}

export const getEventInfo = eventInfo => async dispatch => {
  dispatch({ type: types.GET_EVENT_INFO, payload: { eventInfo } })
}

export const deleteEventInfo = () => async dispatch => {
  dispatch({ type: types.GET_EVENT_INFO, payload: { eventInfo: '' } })
}

export const setDataLoading = bool => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: { dataLoading: bool } })
}

export const setDayCapacity = obj => async (dispatch, getState) => {
  dispatch({ type: types.SET_DAY_CAPACITY, payload: { obj } })
}

export const refreshHolidays = () => async dispatch => {
  dispatch({ type: types.REFRESH_HOLIDAYS })
}
