import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import View from 'components/View'
import LanguageSelector from 'components/LanguageSelector'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import {
  makeSelectName,
  makeSelectRole,
} from 'containers/App/selectors'
import TranslationStatus from 'containers/TranslationStatus'
import messages from './messages'
import H2 from 'components/H2'
import H3 from 'components/H3'
import CollaboratorSnippet from 'components/CollaboratorSnippet'
import P from 'components/P'


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

const collaborators = [
  {
    name: 'Sandra Altvater',
    language: 'de',
    image: 'Sandra-Altvater.jpg',
    desc: 'Profesora de educación especial, Sonderschule Rosenhain, Graz, Austria.',
  },
  {
    name: 'Pablo Salinas Gracia',
    language: 'de',
    image: 'Pablo-Salinas-Gracia.jpg',
    desc: 'Profesor de educación especial,  Sonderschule Rosenhain, Graz, Austria.',
  },
  {
    name: 'Barbara Salinas-Horngacher',
    language: 'de',
    image: 'Barbara-Salinas-Horngacher.jpg',
    desc: 'Lectora de didáctica de lenguas extranjeras,  Karl-Franzens-Universität, Graz Austria',
  },
  {
    name: 'Aiala Grajirena Juanena',
    language: 'eu',
    desc: 'P.T maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
  },
  {
    name: 'Ane Cuesta Muguruza',
    language: 'eu',
    desc: 'P.T maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
  },
  {
    name: 'Marina Argote Larrauri',
    language: 'eu',
    desc: 'H.H maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
  },
  {
    name: 'Marisa Lorenzo Rodríguez',
    language: 'gl',
    desc: 'Maestra de pedagogía terapéutica.',
  },
  {
    name: 'Jaime Vidal Corral',
    language: 'gl',
    desc: 'Maestro de Educación Especial y Pedagogo',
    linkedIn: 'https://www.linkedin.com/in/jaime-vidal-25989082',
    instagram: 'jaime_vc79',
    image: 'jaime-vidal.jpg',
  },
  {
    name: 'Nitzan Cohen',
    language: 'he',
    image: 'nitzan.jpg',
    desc: 'Ph.D. Speech Therapist and Educator. Kaye College. Beer Sheva Israel.',
  },
  {
    name: 'Laura Pedrós Cuadra',
    language: 'en',
    twitter: 'lapku',
    image: 'Laura_Pedros.jpg',
    desc: 'Profesora de Inglés. Zaragoza (España)',
  },
  {
    name: 'Claudia Adelina Benegui',
    language: 'ro',
    desc: 'Logopeda en A. Benegui Logopedia. Oviedo (España).',
    url: 'http://www.abeneguilogopedia.com',
    // youtube: 'watch?v=3_8LdbZ_rX0',
    facebook: 'abeneguilogopedia',
    instagram: 'abeneguilogopedia'
  },
  {
    name: 'Gulnara Ibragimova',
    language: 'ru',
    image: 'Gulnara_400x400.jpg',
    instagram: 'mom_box_tratata'
  },
  {
    name: 'ICT-AAC',
    language: 'hr',
    image: 'ict-aac-logo.png',
    url: 'http://www.ict-aac.hr/',
    facebook: 'ictaac',
    twitter: 'ictaac'
  }
]

class CollaboratorsView extends Component {
  state = {
    locale: this.props.locale
  }

  handleLanguageChange = (locale) => this.setState({ locale })


  render() {
    const { locale } = this.state
    const localeCollaborators = collaborators.filter(colaborator => colaborator.language === locale)
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <P>
            <FormattedMessage {...messages.buildArasaac} />
          </P>
          {/* <P>
            <FormattedMessage {...messages.wantToCollaborate} />
          </P>
          <P>
            <FormattedMessage {...messages.howToCollaborate} />
          </P> */}


          <H2 primary={true}><FormattedMessage {...messages.translationStatus} /></H2>
          <LanguageSelector value={locale} onChange={this.handleLanguageChange} />
          <TranslationStatus language={locale} />

          <H3 primary={true}><FormattedMessage {...messages.translators} /></H3>
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
                  <FormattedMessage {...messages.wantToCollaborate} />
                </P>
                <P>
                  <FormattedMessage {...messages.howToCollaborate} />
                </P>
              </div>
            )
          }


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

