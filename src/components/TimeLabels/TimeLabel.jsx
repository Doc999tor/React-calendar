import React from 'react'
import { getFormattedTimeLabels } from '../../helpers/getFormattedTimeLabels'
import './TimeLabel.css'

export const TimeLabel = (props) => {
  let top =
    document.getElementById('header')?.offsetHeight
    + document.querySelector('.swiper-background')?.offsetHeight
    + (props.currentView === 'weekly' ? document.querySelector('.fc-day-header')?.offsetHeight + 1 : 0)
  return <div className='timeBox' style={{
    height: `${document.querySelector('.fc-slats')?.offsetHeight}px`,
    top: top || 0,
    left: config.calendar.dir === 'rtl'? '' : 0,
    right: config.calendar.dir === 'rtl'? 0 : ''
  }}>
    {getFormattedTimeLabels().map((i, index) => {
      return <div
        key={index}
        className={`time-week${(i !== 0) ? ' true-time-daily' : ''}`}
        style={{
          height: document.querySelector(`.fc-slats tr:nth-child(${index + 1})`)?.offsetHeight + 'px'
        }}
      >
        <span
          className={`time-text${!(i === 0) ? ' margin-time' : ''}`}
        >{!(i === 0) ? i : ' '}</span>
      </div>
    })}
  </div>
}
