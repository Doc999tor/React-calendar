import React from 'react'
import { getFormattedTimeLabels } from '../../helpers/getFormattedTimeLabels'
import './TimeLabel.css'

export const TimeLabel = (props) => {
  let topParam = config.workers.length === 1 ? 'timeBox-without-workers' : 'timeBox-with-workers'
  return <div className={`timeBox ${topParam}`} style={{
    height: `${getFormattedTimeLabels().length * 25}px`,
    marginTop: `${props.currentView === 'weekly' ? '23px' : ''}`,
    left: config.calendar.isRTL ? '' : 0,
    right: config.calendar.isRTL ? 0 : ''
  }}>
    {getFormattedTimeLabels().map((i, index) => <div key={index}
                                                     className={`time-week${(i !== 0) ? ' true-time-daily' : ''}`}
    >
      <span className={`time-text${!(i === 0) ? ' margin-time' : ''}`}>{!(i === 0) ? i : ' '}</span>
    </div>)}
  </div>
}
