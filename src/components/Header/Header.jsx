import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switchView, setDefaultDay } from 'store/calendar/actions'
// setSwiperDirection
import { getFormattedDate, getStandardFormat, currentDay } from 'helpers'
import HeaderMenu from './HeaderMenu/index.jsx'
import './Header.styl'
import { getEvents } from '../../store/events/actions'
import { setSide } from '../../store/calendar/actions'

// TODO: Handle 'defaultDay'
class Header extends Component {
  componentDidMount () {
    this.updateBusinessHours(this.props.calendarApi)
  }

  updateBusinessHours = calendarApi => {
    let activeWorker = config.workers.find(worker => +worker.id === +config.activeWorkerId)
    if (activeWorker) {
      let businessHours = activeWorker.businessHours
      calendarApi?.setOption('businessHours', businessHours)
    }
  }

  getCalendarDate = () => {
    let title = getStandardFormat(this.props.defaultDate)
    let calendarApi = this.props.calendarApi
    let isCurrentDay = currentDay === getStandardFormat(title)
    let currentMonth = moment().format('MM') === moment(title).format('MM')
    // let curDay = moment().format('YYYY-MM-DD')
    const obj = {
      agenda: () => ({
        calendarDate: (
          <React.Fragment>
            {isCurrentDay && <span className='today'>{config.translations.today}</span>}
            <span className={'current_date_field' + (isCurrentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.daily, todayBtn: !isCurrentDay }
      }),
      daily: () => {
        const start = getFormattedDate(this.props.defaultDate || calendarApi.state.dateProfile.currentRange.start)
        const end = getFormattedDate(this.props.defaultDate || calendarApi.state.dateProfile.currentRange.start, 'add', 4)
        const isBetween = moment(currentDay).isBetween(moment(start), moment(end))
        return {
          calendarDate: (
            <React.Fragment>
              <span className='current_date_field' style={{ 'direction': 'ltr' }}>{moment(this.props.defaultDate).format('DD') + ' ' + moment(this.props.defaultDate).format('MMM')}</span>
              {isBetween && <span className='this_week'>{config.translations.thisWeek}</span>}
            </React.Fragment>
          ),
          state: { view: config.translations.weekly, todayBtn: !isBetween }
        }
      },
      weekly: () => ({
        calendarDate: (
          <React.Fragment>
            <span className='current_date_field'>{moment(title).format('MMMM')}</span>
            <span className='this_week'>{moment(title).format('YYYY')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.monthly, todayBtn: !currentMonth }
      }),
      monthly: () => ({
        calendarDate: (
          <React.Fragment>
            {isCurrentDay && <span className='today'>{config.translations.today}</span>}
            <span className={'current_date_field' + (isCurrentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.agenda, todayBtn: !isCurrentDay }
      })
    }
    const { calendarDate, state } = obj[this.props.currentView || calendarApi?.view?.type]()
    return {
      calendarDate,
      ...state
    }
  }

  handleChangeView = () => {
    const objView = {
      monthly: 'agenda',
      weekly: 'monthly',
      daily: 'weekly',
      agenda: 'daily'
    }
    this.props.switchView(objView[this.props.currentView])
  }

  handleToday = () => setDefaultDay(currentDay, true)

  handleNext = async () => {
    this.props.setSide('left').then(() => {
      setTimeout(() => this.props.swiperApi.slickNext(), 220)
    })
    // this.props.dispatch(setDefaultDay(getFormattedDate(this.props.defaultDate, 'add')), true)
    // await this.props.dispatch(setSwiperDirection('next'))
    // this.props.swiperApi.slideNext()
  }

  handlePrev = async () => {
    this.props.setSide('right').then(() => {
      setTimeout(() => this.props.swiperApi.slickPrev(), 220)
    })
    // this.props.calendarApi.prev()
    // this.props.dispatch(setDefaultDay(getFormattedDate(this.props.defaultDate, 'subtract')), true)
    // await this.props.dispatch(setSwiperDirection('prev'))
    // this.props.swiperApi.slidePrev()
  }

  render () {
    const { calendarDate, view, todayBtn } = this.getCalendarDate()
    // console.log('this.props.defaultDate', this.props.defaultDate)
    return (
      <div id='header' style={{ 'direction': config.calendar.dir }}>
        <div className={'menu_refresh ' + ('menu_' + config.calendar.dir)}>
          <HeaderMenu />
          <button id='refresh_button' onClick={this.props.getEvents}>
            <img className='refresh_button_img' src={config.urls.staticImg + '/refresh.svg'} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.handlePrev} className={'prev_button_wrap common ' + (config.calendar.dir + 'Style')}>
            <img className='prev_button btn' src={config.urls.staticImg + '/prev.svg'} />
          </button>
          <div className='current_date'>
            {calendarDate}
          </div>
          <button onClick={this.handleNext} className={'next_button_wrap common ' + (config.calendar.dir + 'Style')}>
            <img className='next_button btn' src={config.urls.staticImg + '/next.svg'} />
          </button>
        </div>
        <div className={'header_right ' + ('view_buttons_'  + config.calendar.dir)}>
          {todayBtn && <button className='today_wrap' onClick={this.handleToday}>
            <img className='img_today' src={config.urls.staticImg + '/today.svg'} />
            {config.translations.today}
          </button>}
          <button className='daily_wrap daily_wrap_label' onClick={this.handleChangeView}>
            <img className='img_view' src={config.urls.staticImg + '/change_view.svg'} />
            {view}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultDate: state.calendar.defaultDate,
  calendarApi: state.calendar.calendarApi,
  currentView: state.calendar.currentView,
  swiperApi: state.calendar.swiperApi
})

export default connect(mapStateToProps, {getEvents, switchView, setDefaultDay, setSide})(Header)
