import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import LSEItem from './LSEItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import View from 'components/View'
import SearchField from 'components/SearchField'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import { withRouter } from 'react-router'
import removeDiacritics from 'components/SearchField/removeDiacritics'
import P from 'components/P'
import lseData from './lseData'
import Item from 'components/MaterialSnippet/Item'

// import PropTypes from 'prop-types'

const exactMatch = (searchText, key) => removeDiacritics(key).toLowerCase() === searchText

const keywords =  Object.keys(lseData).sort()

const styles = {
  searchBar: {
    flexGrow: 1,
    marginBottom: 20
  }
}
class LSEView extends Component {

  state = {
    data:  [],
    keyword: ''
  }

  componentDidMount() {
    const { searchText } = this.props.params
      if (searchText) {
        const  matchSearchText = removeDiacritics(searchText).toLowerCase()
        Object.keys(lseData).some(keyword => {
          if (exactMatch(matchSearchText, keyword)) {
            this.setState({data: lseData[keyword], keyword})
            return true
          }
          return false
        })
      }
  }
      
    componentWillReceiveProps(nextProps) {
    const searchText = nextProps.params.searchText
    if (this.props.params.searchText !== searchText) {
      if (searchText) {
        const  matchSearchText = removeDiacritics(searchText).toLowerCase()
        const found = Object.keys(lseData).some(keyword => {
          if (exactMatch(matchSearchText, keyword)) {
            this.setState({data: lseData[keyword], keyword})
            return true
          }
          return false
        })
        if (!found) this.setState({data: [], keyword: searchText})
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
    const {data, keyword} = this.state
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
        
        {!!data.length && data.map((result, index) => 
          <Item key={`${searchText}-${index}`}>
            <LSEItem data={result} searchText={keyword} />
          </Item>
        )}
        {!data.length && keyword && <P>No se han encontrado registros referidos a <strong>{keyword}</strong></P>}

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
