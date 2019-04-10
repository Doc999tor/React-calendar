import {get, getEO} from 'project-components'
export default d => {
  const format = d => ' ' + moment(d).format('HH:mm')
  const dts = config.translations.dates
  let la
  let ml
  let dl
  const t = moment()
  if (get(d, 'year') === get(t, 'year')) {
    if (get(d, 'month') === get(t, 'month')) dl = get(d, 'date') - get(t, 'date')
    else if (get(d, 'month') + 1 === get(t, 'month')) dl = -1 * (getEO(d) - get(d, 'date') + get(t, 'date'))
    else if (get(d, 'month') - 1 === get(t, 'month')) dl = getEO(t) - get(t, 'date') + get(d, 'date')
    if (dl < 32 || dl > -32) {
      if (dts.days[dl]) la = dts.days[dl] + format(d)
      else if (dl < 8 && dl > 1) la = dts.weekdays[get(d, 'day')] + format(d)
      else if (dl > -8 && dl < -1) la = dts.last_appointent.last + ' ' + dts.weekdays[get(d, 'day')] + format(d)
      else if (dl < 15 && dl > 7) la = dts.last_appointent.in_days.raplace('{count}', dl)
      else if (dl > -15 && dl < -7) la = dts.last_appointent.days_ago.raplace('{count}', (dl * -1))
      else if (dl < 32 && dl > 14) {
        if (dl > 14 && dl < 21) la = dts.last_appointent.in_weeks.replace('{count}', 2)
        else if (dl > 20 && dl < 28) la = dts.last_appointent.in_weeks.replace('{count}', 3)
        else if (dl > 27 && dl < 32) la = dts.last_appointent.in_weeks.replace('{count}', 4)
      } else if (dl > -32 && dl < -14) {
        if (dl < -14 && dl > -21) la = dts.last_appointent.weeks_ago.replace('{count}', 2)
        else if (dl < -20 && dl > -28) la = dts.last_appointent.weeks_ago.replace('{count}', 3)
        else if (dl < -27 && dl > -32) la = dts.last_appointent.weeks_ago.replace('{count}', 4)
      }
    }
    if (dl > 31 || dl < -31 || dl === undefined) ml = get(d, 'month') - get(t, 'month')
  } else if (get(d, 'year') + 1 === get(t, 'year')) ml = -1 * (12 - get(d, 'month') + get(t, 'month'))
  else if (get(d, 'year') - 1 === get(t, 'year')) ml = 12 - get(t, 'month') + get(d, 'month')
  else if (get(d, 'year') > get(t, 'year')) la = dts.last_appointent.in_years.replace('{count}', Math.floor(moment.duration(moment(d) - t).asYears()))
  else if (get(d, 'year') < get(t, 'year')) la = dts.last_appointent.years_ago.replace('{count}', Math.floor(moment.duration(t - moment(d)).asYears()))
  if (ml > 0 && ml < 12) la = dts.last_appointent.in_month.replace('{count}', ml)
  else if (ml < 0 && ml > -12) la = dts.last_appointent.month_ago.replace('{count}', (-1 * ml))
  else if (ml > 11) la = dts.last_appointent.next_year
  else if (ml < -11) la = dts.last_appointent.dts.last_appointent_year
  return la
}
