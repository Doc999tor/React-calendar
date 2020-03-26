import React, { Component } from 'react'
import HeaderMenu from './HeaderMenu/index.jsx'
import { connect } from 'react-redux'
import { getEvents } from '../../store/events/actions'
import { getFormattedDate, getStandardFormat } from '../../helpers'
import queryString from 'query-string'
import './Header.styl'

class Header extends Component {
  state = {
    isButtonDisabled: false
  }

  getCalendarDate = (view) => {
    let title = getStandardFormat(this.props.currentDate)
    const isCurrentDay = moment().format('YYYY-MM-DD') === moment(this.props.currentDate).format('YYYY-MM-DD')
    const isBetween = moment().isoWeek() === moment(this.props.currentDate).isoWeek()
    const obj = {
      agenda: () => ({
        calendarDate: (
          <React.Fragment>
            {isCurrentDay && <span className='today'>{config.translations.today}</span>}
            <span className={'current_date_field' + (isCurrentDay ? ' for_today' : '')}>{moment(title).format('ddd, MMM DD')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.daily }
      }),
      daily: () => ({
        calendarDate: (
          <React.Fragment>
            <span className='current_date_field' style={{ 'direction': 'ltr' }}>{moment(this.props.currentDate).format('DD') + ' ' + moment(this.props.currentDate).format('MMM')}</span>
            {isBetween && <span className='this_week'>{config.translations.thisWeek}</span>}
          </React.Fragment>
        ),
        state: { view: config.translations.weekly }
      }),
      weekly: () => {
        const start = getFormattedDate(this.props.currentDate)
        const end = getFormattedDate(this.props.currentDate, 'add', 4)
        return {
          calendarDate: (
            <React.Fragment>
              <span className='current_date_field' style={{ 'direction': 'ltr' }}>{moment(start).format('DD') + ' - ' + moment(end).add(3, 'days').format('DD') + ' ' + moment(start).format('MMM')}</span>
              {isBetween && <span className='this_week'>{config.translations.thisWeek}</span>}
            </React.Fragment>
          ),
          state: { view: config.translations.monthly }
        }
      },
      monthly: () => ({
        calendarDate: (
          <React.Fragment>
            <span className='current_date_field'>{moment(title).format('MMMM')}</span>
            <span className='this_week'>{moment(title).format('YYYY')}</span>
          </React.Fragment>
        ),
        state: { view: config.translations.agenda }
      })
    }
    const { calendarDate, state } = obj[view]()
    return {
      calendarDate,
      ...state,
      todayBtn: !isCurrentDay
    }
  }

  handleChangeView = (view) => {
    const objView = {
      monthly: 'agenda',
      weekly: 'monthly',
      daily: 'weekly',
      agenda: 'daily'
    }
    const qs = new URLSearchParams(this.props.location.search)
    qs.set('calendar_view_type', objView[view])
    this.props.history.replace({
      search: qs.toString()
    })
  }

  handleNext = async () => {
    this.props.slideToNext()
    this.setState({
      isButtonDisabled: true
    }, () => {
      setTimeout(() => {this.setState({ isButtonDisabled: false })}, 500)
    })
  }

  handlePrev = async () => {
    this.props.slideToPrev()
    this.setState({
      isButtonDisabled: true
    }, () => {
      setTimeout(() => {this.setState({ isButtonDisabled: false })}, 500)
    })
  }

  handleToday = () => {
    this.props.setToday()
  }

  render () {
    let currentView = new URLSearchParams(this.props.location.search).get('calendar_view_type') || config.calendar.defaultView
    const dir = config.calendar.dir === 'rtl' ? 'ltr' : 'rtl'
    const { calendarDate, view, todayBtn } = this.getCalendarDate(currentView)
    return (
      <div id='header' style={{ 'direction': dir }}>
        <div className={'menu_refresh ' + ('menu_' + dir)}>
          <HeaderMenu />
          <button id='refresh_button' onClick={() => {this.props.getEvents(true)}}>
            <img className={'refresh_button_img' + (this.props.eventsFetching ? ' spin' : '')} src={config.urls.staticImg + '/refresh.svg'} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.handleNext} disabled={this.state.isButtonDisabled} className={'next_button_wrap common ' + (config.calendar.dir + 'Style')}>
            <img className='next_button btn' src={config.urls.staticImg + '/next.svg'} />
          </button>
          <div className='current_date' onClick={() => {this.props.switchView('monthly')}}>
            {calendarDate}
          </div>
          <button onClick={this.handlePrev} disabled={this.state.isButtonDisabled} className={'prev_button_wrap common ' + (config.calendar.dir + 'Style')}>
            <img className='prev_button btn' src={config.urls.staticImg + '/prev.svg'} />
          </button>
        </div>
        <div className={'header_right ' + ('view_buttons_' + dir)}>
          {todayBtn && <button className='today_wrap' onClick={this.handleToday}>
            <img className='img_today' src={config.urls.staticImg + '/today.svg'} />
            {config.translations.today}
          </button>}
          <button className='daily_wrap daily_wrap_label' onClick={() => { this.handleChangeView(currentView) }}>
            <img className='img_view' src={config.urls.staticImg + '/change_view.svg'} />
            {view}
          </button>
        </div>
        {this.props.eventsFetching && <div className={`preloader styleLoader${config.calendar.dir.toUpperCase()}`}>
          <img className='loader' src={`${config.urls.staticImg}/preloader.svg`}/>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentDate: state.calendar.currentDate,
  eventsFetching: state.events.eventsFetching
})

export default connect(mapStateToProps, {
  getEvents
})(Header)
