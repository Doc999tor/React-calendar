export const getFormattedTimeLabels = () => {
  let minTime = config.calendar.minTime.slice(0, 2)
  let maxTime = config.calendar.maxTime.slice(0, 2)
  let slotDuration = config.calendar.slotDuration.slice(3, 5)
  let sectionsPerHour = 60 / slotDuration
  let sectionsPerFirstHour = (60 - config.calendar.minTime.slice(3)) / slotDuration
  let timeLabelAmount = Math.round((maxTime - minTime) * sectionsPerHour + (config.calendar.maxTime.slice(3) / slotDuration) - (config.calendar.minTime.slice(3) / slotDuration))
  let timelabelArray = []
  let hour = minTime
  for(let i = 0; i < sectionsPerFirstHour; i++) {
    if(i === 0) {
      timelabelArray.push(hour - 0)
    } else {
      timelabelArray.push(0)
    }
  }
  timeLabelAmount -= sectionsPerFirstHour
  for(let i = 1; i <= timeLabelAmount - 1; i++) {
    if(i === 1) {
      hour++
      timelabelArray.push(hour)
    }
    if(i % sectionsPerHour === 0) {
      hour++
      timelabelArray.push(hour)
    } else {
      timelabelArray.push(0)
    }
  }

  return timelabelArray
}
