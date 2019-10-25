import React from 'react'
import './menu-react.css'

const MenuReact = ({isMenuOpen, onHandleMenuClose}) => {
  if (isMenuOpen) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }

  return (
    <div id='menu_modal'
      className={isMenuOpen ? 'show' : 'show hide'}
      // close menu
      onClick={() => onHandleMenuClose()}>
      <div className='menu_wrap'>
        <div className='list-wrap'>
          <div className='menu'>
            <div className='menu-logo'>
              <div className='logo'>
                <img className='business_logo' src={window.config.user.business_logo} />
              </div>
              <p className='business_name'>{window.config.user.business_name}</p>
              {window.config.user.business_address && <p className='business_address'>
                <img className='business_address_img' src={`${window.config.urls.menu_icons}map-pin.svg`} />
                {window.config.user.business_address}
              </p>}
            </div>
            <nav className='menu-list'>{window.config.menu.map((item, key) => {
              return (<li className='list-item' key={key}>
                <a className='item-link' href={item.link}>
                  <img className='menu-img' src={window.config.urls.menu_icons + item.icon} alt={item.text} />
                  <p>{window.config.translations.menu[item.text]}</p>
                </a></li>)
            })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuReact
