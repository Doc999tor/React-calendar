// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  eventsFetching: false,
  events: [
    // {
    //   address: 'ירושלים, ריבלין יוסף, 28',
    //   birthdate: '09-29',
    //   client_id: '76',
    //   durationEditable: true,
    //   end: '2019-12-09 16:15',
    //   id: '623',
    //   is_reminders_set: false,
    //   name: 'PFl PwEZMgSXXH',
    //   note: 'lSFbnYoR XOzbKSVhmz CtD',
    //   off_time: null,
    //   phone: '08-09617410',
    //   profile_picture: '76.jpg',
    //   services: [
    //     { id: 35, name: 'DuKB hZlTAXBRfG MH', color: '#ededfa', count: 3 },
    //     { id: 49, name: 'cTZ ZUReMP SJHVO xYhbNn', color: '#755559', count: 2 },
    //     { id: 1, name: 'hQBx RVsG GyQnkXKxGX WZ', color: '#66a955', count: 1 },
    //     { id: 35, name: 'aDNOeeK xMv sU xEFsLgH', color: '#2126a5', count: 2 }
    //   ],
    //   start: '2019-12-09 13:15',
    //   total_price: '490'
    // },
    // {
    //   address: 'הוד השרון, ש רמת הדר, 6253',
    //   birthdate: '01-01',
    //   client_id: 1,
    //   end: '2019-12-07 12:30',
    //   id: 1,
    //   durationEditable: true,
    //   is_new_client: true,
    //   has_debt: true,
    //   name: 'null',
    //   note: 'xiRxJYI tcBZdu uJ',
    //   off_time: 'break',
    //   phone: '05-86490187',
    //   profile_picture: 'banner (1600x800).jpg',
    //   start: '2019-12-07 10:50'
    // },
    // {
    //   address: 'אילת, מלון עציון, 62',
    //   birthdate: '12-07',
    //   client_id: 7654,
    //   end: '2019-12-07 10:15',
    //   id: 765,
    //   durationEditable: true,
    //   is_new_client: true,
    //   has_debt: true,
    //   name: 'Ivan',
    //   note: 'VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx',
    //   off_time: '',
    //   phone: '05-86490187',
    //   profile_picture: '120.jpg',
    //   services: [
    //     { id: 21, name: 'ZYneaZI', color: '', service_count: 1 },
    //     { id: 26, name: 'zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm', color: '#8441bd', service_count: 3 },
    //     { id: 2, name: 'dVFEWsV mCfHfTqj kjHt TWjyFqVsmg', color: '#fa11f0', service_count: 2 }
    //   ],
    //   start: '2019-12-07 09:00',
    //   total_price: 400
    // },
    // {
    //   address: 'אילת, מלון עציון\\ =&#34 +!##|@\'"/&, 6253',
    //   birthdate: '01-01',
    //   client_id: 4,
    //   end: '2019-12-07 14:50',
    //   id: 4,
    //   durationEditable: true,
    //   is_new_client: true,
    //   has_debt: true,
    //   name: 'null',
    //   note: '##aa#bb|cc||\'\"&!=+a %20/`\\`; &#34',
    //   off_time: 'meeting',
    //   phone: '05-86490187',
    //   profile_picture: 'banner (1600x800).jpg',
    //   start: '2019-12-07 13:30'
    // },
    // {
    //   address: 'אילת, מלון עציון\\ =&#34 +!##|@\'"/&, 6253',
    //   birthdate: '01-01',
    //   client_id: 5,
    //   end: '2019-12-07 09:00',
    //   id: 5,
    //   durationEditable: true,
    //   is_new_client: true,
    //   has_debt: true,
    //   name: 'null',
    //   note: '##aa#bb|cc||\'\"&!=+a %20/`\\`; &#34',
    //   off_time: 'meeting',
    //   phone: '05-86490187',
    //   profile_picture: 'banner (1600x800).jpg',
    //   start: '2019-12-07 08:00'
    // }
  ]
}

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_STANDART_EVENTS]: () => {
      return { ...state, eventsFetching: true }
    },
    [types.GET_STANDART_EVENTS_SUCCESS]: () => {
      return {
        // events: {...action.payload.events},
        events: state.events.concat(action.payload.events),
        eventsFetching: false
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
