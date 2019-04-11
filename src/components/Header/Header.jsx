import React, { Component } from 'react'
import './Header.styl'

class Header extends Component {
  render () {
    return (
      <div id='header' style={config.calendar.isRTL ? {'direction': 'rtl'} : {'direction': 'ltr'}}>
        <div className={'menu_refresh ' + (config.calendar.isRTL ? 'menu_rtl' : 'menu_ltr')}>
          <button className='more_wrap'>
            <img src={`${config.urls.staticImg}/ic_menu.svg`}/>
          </button>
          <button id='refresh_button'>
            <img className='refresh_button_img' src={`${config.urls.staticImg}/refresh.svg`} />
          </button>
        </div>
        <div className='middle-section'>
          <button onClick={this.props.prev} className={'prev_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='prev_button btn' src={`${config.urls.staticImg}/prev.svg`} />
          </button>
          <div className='current_date'>
            <span className='today'></span>
            <span className='current_date_field'></span>
            <span className='this_week'></span>
          </div>
          <button onClick={this.props.next} className={'next_button_wrap common ' + (config.calendar.isRTL ? 'rtlStyle' : 'ltrStyle')}>
            <img className='next_button btn' src={`${config.urls.staticImg}/next.svg`} />
          </button>
        </div>
        <div className={'header_right ' + (config.calendar.isRTL ? 'view_buttons_rtl' : 'view_buttons_ltr')}>
          <button className='today_wrap' onClick={this.props.today}>
            <img className='img_today' src={`${config.urls.staticImg}/today.svg`} />
            {config.translations.today}
          </button>
          <button className='daily_wrap daily_wrap_label' onClick={this.props.changeView}>
            <img className='img_view' src={`${config.urls.staticImg}/change_view.svg`} />
            {config.translations.agenda}
          </button>
        </div>
      </div>
    )
  }
}
export default Header
