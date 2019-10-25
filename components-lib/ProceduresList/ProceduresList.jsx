import './ProceduresList.styl'
const getVisibleServices = (services, filter) => services.filter(service => service.name.includes(filter))
export default class ProceduresList extends React.Component {
  constructor (props) {
    super(props)
    this.services = props.data
    this.state = {
      clickId: '',
      filter: '',
      showServices: false,
      categories: this.getGroup(props.data),
      services: this.services
    }
  }
  getGroup = a => {
    let o = {}
    a.forEach(i => { o[i.category.id] = { ...i.category, count: o[i.category.id] ? o[i.category.id].count + 1 : 1 } })
    return Object.values(o)
  }
  handleFilterChange = e => {
    this.setState({ filter: e.target.value })
  }

  handleclickCategory = id => {
    this.setState({
      showServices: !this.state.showServices,
      clickId: id
    })
  }

  renderService = item => (<div className='wrap-service'><div className='service' style={{borderColor: item.color}} onClick={() => this.props.getService(item)}>
    <div className='common-wrap'>
      <h2 className='name'>{item.name}</h2>
      <div className='edditional-info'>
        <div className='dur-wrap'><img src={`${config.urls.media}ic_time.svg`} /><p className='duration'>{`${item.duration} ${config.translations.punch_cards.procedures_list.duration_minutes}`}</p></div>
        <div className='price-wrap'><p className='price'>{`${item.price} ${config.data.currency}`}</p></div>
      </div>
    </div>
    <img className='add-img' src={`${config.urls.media}plus_add.svg`} />
  </div>
  </div>
  )

  render () {
    const { showServices, clickId, services, filter } = this.state
    const visibleServices = getVisibleServices(services, filter)
    return (
      <div id='procedures_list'>
        <h2 className='procedures-title'>{config.translations.punch_cards.procedures_list.choose_service}</h2>
        <div className='search-strip'>
          <div className='search-wrap'>
            <input className='search-input' value={this.state.filter} onChange={this.handleFilterChange} type='text' placeholder={config.translations.punch_cards.procedures_list.search_service} />
            <img className='search-img' src={`${config.urls.media}magnifier.svg`} />
          </div>
        </div>
        <div className='procedure-wrap'>
          {!this.props.isOpenServices && filter === ''
            ? this.state.categories.map(i => <div key={i.id} data_id={i.id} className={'extended-category ' + (showServices && clickId === i.id && 'active_category')} onClick={() => this.handleclickCategory(i.id)}><div className=''>
              <div className='category'>
                <p className='category_name'>{i.name}</p>
                <p className='category_count'>({i.count})</p>
                <div className='icon_wrap'>
                  <img className={config.isRTL
                    ? 'rtl-arrow ' + (showServices && clickId === i.id && 'rotate-active')
                    : 'ltr-arrow ' + (showServices && clickId === i.id && 'rotate-arrow')} src={config.urls.media + 'chevron-right.svg'} />
                </div>
              </div>
              <div className='border' />
            </div>
            <div className={'acordeon ' + (showServices && clickId === i.id && 'active')}>
              {this.state.services.filter(item => item.category.id === i.id).map(i => this.renderService(i))}
            </div>
            </div>)
            : <div>
              {visibleServices.map(i => this.renderService(i))}
            </div>}
        </div>
      </div>
    )
  }
}
ProceduresList.propTypes = {
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
