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
        <h2 className='procedures-title'>{config.translations.choose_service}</h2>
        <div className='search-strip'>
          <div className='search-wrap'>
            <input className='search-input' value={this.state.search} onChange={e => this.search(e.target.value)} type='text' placeholder={config.translations.search_service} />
            <img className='search-img' src={`${config.urls.media}magnifier.svg`} />
          </div>
        </div>
        {/* <div className='search-wrap'>
          <span className='search-icon'><img src={config.urls.media + 'search.png'} /></span>
          <input type='text' value={this.state.search} onChange={e => this.search(e.target.value)} placeholder={config.translations.serch_proc} />
        </div> */}
        <div className='procedure-wrap'>
          {!this.props.isOpenServices && this.state.categories.map(i => <div className='category' onClick={() => this.next(i.id)}>
            <p className='category_name'>{i.name}</p>
            <p className='category_count'>({i.count})</p>
            <div className='icon_wrap'>
              <img className={config.isRTL ? 'rtl-arrow' : 'ltr-arrow'} src={config.urls.media + 'chevron-right.svg'} />
            </div>
          </div>)}
          {this.props.isOpenServices && this.state.services.map(i => <div className='wrap-service'><div className='service' style={{borderColor: i.color}} onClick={() => this.props.getService(i)}>
            {/* <div className='add_wrap'><img src={config.urls.media + 'add.svg'} /></div> */}
            <h2 className='name'>{i.name}</h2>
            <div className='edditional-info'>
              <div className='dur-wrap'><img src={`${config.urls.media}ic_time.svg`} /><p className='duration'>{`${i.duration} ${config.translations.duration_minutes}`}</p></div>
              <div className='price-wrap'><img src={`${config.urls.media}debt.svg`} /><p className='price'>{`${i.price} ${config.data.currency}`}</p></div>
            </div>
            {/* {this.state.isCategory && <h1 style={{color: 'deepskyblue', padding: '0px 63px'}}>{i.category.name}</h1>} */}
          </div></div>)}
        </div>
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
