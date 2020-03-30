import mainRequestService from './request.service.js'

export const holidays =  (year, date, refreshHoliday) => {
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  return new Promise((resolve, reject) => {
    const url = config.urls.get_holidays.replace('{YYYY}', year)
    mainRequestService(url, options).then(r => {
      if (r.status !== 200) return reject([])
      r.json().then(r => {
        if (localStorage.getItem('holidays_data') && JSON.parse(localStorage.getItem('holidays_data')).data.hasOwnProperty(year) === false) {
          let objHoliday = JSON.parse(localStorage.getItem('holidays_data'))
          let extendedData = Object.assign(objHoliday.data, {
            [year]: r
          })
          objHoliday.data = extendedData
          localStorage.setItem('holidays_data', JSON.stringify({
            last_loaded_holidays: date,
            data: {
              ...extendedData
            }
          }))
        } else if (localStorage.getItem('holidays_data') === null) {
          localStorage.setItem('holidays_data', JSON.stringify({
            last_loaded_holidays: date,
            data: {
              [year]: r
            }
          }))
        } else if (localStorage.getItem('holidays_data') && refreshHoliday) {
          localStorage.setItem('holidays_data', JSON.stringify({
            last_loaded_holidays: date,
            data: {
              [year]: r
            }
          }))
        }
        resolve({holidays: r})
      })
    })
  })
}
