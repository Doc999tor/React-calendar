// import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = {
  eventsFetching: false,
  // Added for test only
  events: [
    {
      address: "אילת, מלון עציון, 62",
      birthdate: "01-01",
      client_id: null,
      end: "2019-04-21 10:00",
      id: 61,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "",
      note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      off_time: '',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 21, name: "ZYneaZI", color: "", service_count: 1},
        {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-21 07:00",
      total_price: 400
    },
    {
      address: "אילת, מלון עציון, 62",
      birthdate: "01-01",
      client_id: null,
      end: "2019-04-20 10:00",
      id: 61,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "",
      note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      off_time: '',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 21, name: "ZYneaZI", color: "", service_count: 1},
        {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-20 09:00",
      total_price: 400
    },
    {
      address: "אילת, מלון עציון, 62",
      birthdate: "01-01",
      client_id: null,
      end: "2019-04-19 08:45",
      id: 61,
      durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "",
      note: "VxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      off_time: '',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 21, name: "ZYneaZI", color: "", service_count: 1},
        {id: 26, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 2, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-19 08:00",
      total_price: 400
    },
    {
      address: "22 ,xorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK",
      birthdate: "01-01",
      client_id: 12,
      end: "2019-04-18 09:30",
      id: 613,
      // durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "QwrUlf",
      note: "eEAT Zpyvh eYAVxorIZ HuRQC WxwSV hW Pfc  rsaZ MHudyVsrpK  PXvlISiJ ZySwTMGd CFSDVGPKO FaFPxx",
      off_time: '',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 211, name: "ZYneazi", color: "", service_count: 1},
        {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-18 09:00",
      total_price: 900
    },
    {
      address: "222 ,asdasdasd rsaZ MHudyVsrpK",
      birthdate: "01-01",
      client_id: 121,
      end: "2019-04-17 11:30",
      id: 6132,
      // durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "QwrUlf",
      note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      off_time: '',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 211, name: "ZYneaZI", color: "", service_count: 1},
        {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-17 10:30",
      total_price: 900
    },
    {
      address: "333 ,asdasdasd rsaZ MHudyVsrpK",
      birthdate: "01-01",
      client_id: 1211,
      end: "2019-04-16 13:30",
      id: 61321,
      // durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "asdaRE",
      note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      off_time: 'meeting',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 211, name: "ZYneaZI", color: "#7FFF00", service_count: 1},
        {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-16 12:30",
      total_price: 900
    },
    {
      address: "333 ,asdasdasd rsaZ MHudyVsrpK",
      birthdate: "01-01",
      client_id: 1211,
      end: "2019-04-15 14:30",
      id: 6132111,
      // durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "asdaRE",
      note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      off_time: 'meeting',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 211, name: "ZYneaZI", color: "#7FFF00", service_count: 1},
        {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-15 14:30",
      total_price: 900
    },
    {
      address: "333 ,asdasdasd rsaZ MHudyVsrpK",
      birthdate: "01-01",
      client_id: 1211,
      end: "2019-04-14 17:30",
      id: 6132121,
      // durationEditable: true,
      is_new_client: true,
      has_debt: true,
      name: "asdaRE",
      note: "asdasdasd asdasdasd asdasda sdasda asdaW",
      off_time: 'meeting',
      phone: "05-86490187",
      profile_picture: "120.jpg",
      services: [
        {id: 211, name: "ZYneaZI", color: "#7FFF00", service_count: 1},
        {id: 261, name: "zlapEUBG rDKMftlJcz AgXCGUtO ZxLvGBXx dm", color: "#8441bd", service_count: 3},
        {id: 21, name: "dVFEWsV mCfHfTqj kjHt TWjyFqVsmg", color: "#fa11f0", service_count: 2}
      ],
      start: "2019-04-14 16:30",
      total_price: 900
    },
  ]
}

export default (state = initialState, action = {}) => {
  const obj = {
    [types.GET_STANDART_EVENTS]: () => {
      return { ...state, eventsFetching: true }
    },
    [types.GET_STANDART_EVENTS_SUCCESS]: () => {
      return {
        ...state,
        events: action.payload.events,
        eventsFetching: false
      }
    }
  }
  const res = obj[action.type]
  return res ? res() : state
}
