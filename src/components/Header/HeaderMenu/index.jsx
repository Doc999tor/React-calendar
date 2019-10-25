import React, { Component } from 'react'
import { default as Menu } from 'project-components/Menu/Menu.jsx'

class HeaderMenu extends Component {
  state = { }

  menuOnOff = () => {
    this.setState({ active: !this.state.active })
    document.querySelector('body').classList[this.state.active ? 'remove' : 'toggle']('no-scroll')
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this.menuOnOff} className='more_wrap'>
          <img src={config.urls.staticImg + '/ic_menu.svg'} />
        </button>
        {this.state.active && <Menu closeMenu={this.menuOnOff} />}
      </React.Fragment>
    )
  }
}

export default HeaderMenu
