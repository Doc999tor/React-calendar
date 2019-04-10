import './ProceduresList.styl'

export default class ProceduresList extends React.Component {
  constructor (props) {
    super(props)
    this.services = props.data
    this.state = {
      categories: this.getGroup(props.data),
      services: this.services,
      isCategory: false,
      search: ''
    }
  }
  getGroup = a => {
    let o = {}
    a.forEach(i => { o[i.category.id] = { ...i.category, count: o[i.category.id] ? o[i.category.id].count + 1 : 1 } })
    return Object.values(o)
  }
  search = e => {
    if (!this.props.isOpenServices) this.props.toogleOpenServices()
    let services = e !== '' ? this.services.filter(i => i.name.includes(e) || (i.category && i.category.name.includes(e))) : this.services
    this.setState({services, search: e, isCategory: true})
  }
  next = id => this.setState({services: this.props.data.filter(i => i.category.id === id)}, () => this.props.toogleOpenServices())
  render () {
    return (
      <div id='procedures_list'>
        <div className='search-wrap'>
          <span className='search-icon'><img src={config.urls.media + 'search.png'} /></span>
          <input type='text' value={this.state.search} onChange={e => this.search(e.target.value)} placeholder={config.translations.serch_proc} />
        </div>
        {!this.props.isOpenServices && this.state.categories.map(i => <div className='category' onClick={() => this.next(i.id)}>
          <h1>{i.name}</h1><h1>({i.count})</h1><div className='icon_wrap'><img src={config.urls.media + 'arrow-punch.png'} /></div>
        </div>)}
        {this.props.isOpenServices && this.state.services.map(i => <div className='service' onClick={() => this.props.getService(i)}>
          <div className='add_wrap'><img src={config.urls.media + 'add.svg'} /></div>
          <div className='color' style={{backgroundColor: i.color}} /><h1 className='name'>{i.name}</h1>
          <h1 className='duration'>{i.duration + 'mm'}</h1><h1 className='price'>{i.price + config.data.currency}</h1>
          {this.state.isCategory && <h1 style={{color: 'deepskyblue', padding: '0px 63px'}}>{i.category.name}</h1>}
        </div>)}
      </div>
    )
  }
}
ProceduresList.propTypes = {
  toogleOpenServices: PropTypes.func,
  isOpenServices: PropTypes.bool,
  getService: PropTypes.func,
  data: PropTypes.arr
}
ProceduresList.defaultProps = {
  toogleOpenServices: () => {},
  isOpenServices: false,
  getService: () => {},
  data: []
}
