import PropTypes from 'prop-types'
import './Select.styl'

export default class Select extends React.Component {
  constructor () {
    super()
    this.state = {
      isVisibleList: false
    }
  }
  render () {
    let arrow = '▼'
    if (this.state.isVisibleList) arrow = '▲'
    else arrow = '▼'
    return (
      <div id='select-main' ref='active' tabIndex='1' onBlur={() => this.setState({isVisibleList: false})}>
        <div className='active' onClick={this.props.disabled ? () => {} : () => this.setState({isVisibleList: !this.state.isVisibleList}, () => this.state.isVisibleList && this.refs.active.focus())}>
          <div className='active-name'>{this.props.name}</div>
          <span className='icon'>{arrow}</span>
        </div>
        <div className={this.state.isVisibleList ? 'options' : 'hidden'}>
          {this.props.options.map(i => (<div key={i.label} onClick={() => {
            this.props.onChange(i)
            this.setState({isVisibleList: false})
          }}>{i.label}</div>))}
        </div>
      </div>
    )
  }
}
Select.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.arr
}
Select.defaultProps = {
  onChange: () => {},
  disabled: false,
  options: [],
  value: ''
}
