import './Menu.styl'

export default class Menu extends React.Component {
  static propTypes = {
    closeMenu: PropTypes.func.isRequired
  }

  render () {
    const bgrImg = {
      backgroundImage: `url('${config.urls.menu_icons}photo-bgr.png')`
    }
    return (
      <div id='menu_modal' onClick={this.props.closeMenu}>
        <div className='menu_container'>
          <div className='menu_wrap' style={bgrImg}>
            <div className='list-wrap' onClick={e => e.stopPropagation()}>
              <div className='menu'>
                <div className='menu-logo'>
                  <div className='logo'>
                    <img className='business_logo' src={config.user.business_logo} />
                  </div>
                  <div className='business_container'>
                    <p className='business_name'>{config.user.business_name}</p>
                    <p className='business_address'><img className='business_address_img' src={`${config.urls.menu_icons}map-pin.svg`} />{config.user.business_address}</p>
                  </div>
                </div>
                <nav className='menu-list'>
                  {config.menu.map(item => {
                    return (
                      <li className='list-item'>
                        <a className='item-link' href={item.link}>
                          <span className='img-wrap'><img className='menu-img' src={config.urls.menu_icons + item.icon} alt={item.text} /></span>
                          {config.translations.menu[item.text]}
                        </a>
                      </li>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
