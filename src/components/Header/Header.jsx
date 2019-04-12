import React, { Component } from 'react'
import './Header.styl'

export default class Header extends Component {
  render () {
    const today = this.props.todayBtn
    return (
      <div id='header' style={config.calendar.isRTL ? {'direction': 'rtl'} : {'direction': 'ltr'}}>
        <div className={'menu_refresh ' + (config.calendar.isRTL ? 'menu_rtl' : 'menu_ltr')}>
          <button className='more_wrap'>
            <img src={config.urls.staticImg + '/ic_menu.svg'} />
          </button>
          <button id='refresh_button'>
            <img className='refresh_button_img' src={config.urls.staticImg + '/refresh.svg'} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.props.prev} className={'prev_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='prev_button btn' src={config.urls.staticImg + '/prev.svg'} />
          </button>
          <div className='current_date'>
            {this.props.title}
          </div>
          <button onClick={this.props.next} className={'next_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='next_button btn' src={config.urls.staticImg + '/next.svg'} />
          </button>
        </div>
        <div className={'header_right ' + (config.calendar.isRTL ? 'view_buttons_rtl' : 'view_buttons_ltr')}>
          {today && <button className='today_wrap' onClick={this.props.today}>
            <img className='img_today' src={config.urls.staticImg + '/today.svg'} />
            {config.translations.today}
          </button>}
          <button className='daily_wrap daily_wrap_label' onClick={this.props.changeView}>
            <img className='img_view' src={config.urls.staticImg + '/change_view.svg'} />
            {this.props.view}
          </button>
        </div>
      </div>
    )
  }
}
