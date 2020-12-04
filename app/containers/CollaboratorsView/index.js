import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import PropTypes from 'prop-types'
import View from 'components/View'
import LanguageSelector from 'components/LanguageSelector'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import RaisedButton from 'material-ui/RaisedButton'
import {
  makeSelectName,
  makeSelectRole,
} from 'containers/App/selectors'
import TranslationStatus from 'containers/TranslationStatus'
import messages from './messages'
import H3 from 'components/H3'
import CollaboratorSnippet from 'components/CollaboratorSnippet'
import P from 'components/P'
import collaborators from './collaborators'

const Masonry = require('react-masonry-component')
const masonryOptions = {
  transitionDuration: '1s'
}

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around'
  }
}

class CollaboratorsView extends Component {
  state = {
    locale: this.props.locale
  }

  handleLanguageChange = (locale) => this.setState({ locale })


  render() {
    const { locale, filter } = this.state
    const localeCollaborators = filter ? collaborators.filter(colaborator => colaborator.languages.indexOf(locale) !== -1) : collaborators
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <P>
            <FormattedMessage {...messages.translateArasaac} />
          </P>

          <RaisedButton label={filter ? <FormattedMessage {...messages.removeFilter} /> : <FormattedMessage {...messages.filterByLanguage} />} primary={true} onClick={() => this.setState({ filter: !filter })} />
          <div style={{ marginTop: '20px' }}>
            {filter && <LanguageSelector value={locale} onChange={this.handleLanguageChange} />}
          </div>


          {localeCollaborators.length ? (
            <Masonry
              className={'my-gallery-class'} // default ''  
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}    
              disableImagesLoaded={false} // default false
              style={styles.masonry}
            >
              {localeCollaborators.map((collaborator) => <CollaboratorSnippet key={collaborators.name} collaborator={collaborator} />)}
            </Masonry>
          ) : (
              <div>
                <P>                
                  There are no translators. in this language. <Link to='/contact-us'>Contact us</Link> if you want to help translating Arasaac into your native language.
                </P>
              </div>
            )
          }
          {filter && (
            <div>
              <H3 primary={true}><FormattedMessage {...messages.translationStatus} /></H3>
              <TranslationStatus language={locale} />
            </div>
          )}



        </ReadMargin>
      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
  role: makeSelectRole()(state),
  name: makeSelectName()(state)
})

export default connect(
  mapStateToProps
)(CollaboratorsView)

