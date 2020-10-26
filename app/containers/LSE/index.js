import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import Item from './Item'
import muiThemeable from 'material-ui/styles/muiThemeable'
import View from 'components/View'
import SearchField from 'components/SearchField'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import { withRouter } from 'react-router'
import lseData from './lseData'

// import PropTypes from 'prop-types'

const keywords =  Object.keys(lseData).sort()

const styles = {
  searchBar: {
    flexGrow: 1
  }
}
class LSEView extends Component {

  state = {
    data:  []
  }

  componentDidMount() {
    const { searchText } = this.props.params
      if (searchText) {
        const data = lseData[searchText]|| []
        this.setState({data })
      }
  }
      
    componentWillReceiveProps(nextProps) {
    const searchText = nextProps.params.searchText
    if (this.props.params.searchText !== searchText) {
      if (searchText) {
        const data = lseData[searchText]|| []
        this.setState({data })
      }
      else {
        this.setState({data: []})
      }
    }

  }
  


  handleSubmit = (nextValue) => { 
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/lse/search/${encodeURIComponent(nextValue)
        }`)
    }
  };

  render() {
    const searchText = this.props.params.searchText || ''
    const {data} = this.state
    return (
      <View left={true} right={true}>
        <Helmet>
          <title>Lengua de signos española (LSE) - ARASAAC</title>
          <meta name="description" content="Catálogo de videos e imágenes de la lengua española de signos (LSE). Disponible para consulta y descarga." />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}

        </Helmet>


        <SearchField
          value={searchText}
          onSubmit={this.handleSubmit}
          style={styles.searchBar}
          dataSource={keywords}
          filterFromStart={true}
        />
        
        {data.length && data.map((result, index) => 
          <Item data={result} key={`${searchText}-${index}`} />
        )}

        


      </View >
    )
  }
}

LSEView.propTypes = {
  params: PropTypes.object.isRequired,
  muiTheme: PropTypes.object,
  // Injected by React Router
  router: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired
}



export default withRouter(muiThemeable()(withWidth()(LSEView)))
