import './Switch.styl'

export default class Switch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {on: this.props.on}
  }
  handleClick = e => {
    e.preventDefault()
    if (this.props.enabled) {
      this.props.onClick()
      this.setState({on: !this.state.on})
    }
  }
  componentWillReceiveProps = nextProps => this.setState({on: nextProps.on})
  render () {
    const className = ['switch', this.props.className, (this.state.on ? 'on ' : ''),
      (this.props.enabled ? '' : 'disabled '), (config.isRTL ? 'switch-right' : 'switch-left')].join(' ')
    return (<div className={className} onClick={this.handleClick}><div className={'switch-toggle ' + (config.isRTL ? 'right' : 'left')} children={this.props.children} /></div>)
  }
}
Switch.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  enabled: PropTypes.bool,
  on: PropTypes.bool
}
Switch.defaultProps = {
  onClick: () => {},
  enabled: true,
  className: '',
  children: '',
  on: false
}
