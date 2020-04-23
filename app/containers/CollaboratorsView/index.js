import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
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
    languages: ['de'],
    image: 'Sandra-Altvater.jpg',
    desc: 'Profesora de educación especial, Sonderschule Rosenhain, Graz.',
    country: 'au',
    facebook: 'abeneguilogopedia',
    instagram: 'abeneguilogopedia',
  },
  {
    name: 'Pablo Salinas Gracia',
    languages: ['de'],
    image: 'Pablo-Salinas-Gracia.jpg',
    desc: 'Profesor de educación especial,  Sonderschule Rosenhain, Graz.',
    country: 'au'
  },
  {
    name: 'Barbara Salinas-Horngacher',
    languages: ['de'],
    image: 'Barbara-Salinas-Horngacher.jpg',
    desc: 'Lectora de didáctica de lenguas extranjeras,  Karl-Franzens-Universität, Graz.',
    country: 'au'
  },
  {
    name: 'Aiala Grajirena Juanena',
    languages: ['eu'],
    image: 'she.jpg',
    desc: 'P.T maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
    country: 'es'
  },
  {
    name: 'Ane Cuesta Muguruza',
    languages: ['eu'],
    image: 'she.jpg',
    desc: 'P.T maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
    country: 'es'
  },
  {
    name: 'Marina Argote Larrauri',
    languages: ['eu'],
    image: 'she.jpg',
    desc: 'H.H maistra. Onintze Aguirre Méndez Gizarte Integrazio, Gautena.',
    country: 'es'
  },
  {
    name: 'Marisa Lorenzo Rodríguez',
    languages: ['gl'],
    image: 'marisa.jpg',
    desc: 'Maestra de pedagogía terapéutica.',
    country: 'es'
  },
  {
    name: 'Jaime Vidal Corral',
    languages: ['gl'],
    desc: 'Maestro de Educación Especial y Pedagogo',
    linkedIn: 'https://www.linkedin.com/in/jaime-vidal-25989082',
    instagram: 'jaime_vc79',
    image: 'jaime-vidal.jpg',
    country: 'es'
  },
  {
    name: 'Nitzan Cohen',
    languages: ['he'],
    image: 'nitzan.jpg',
    desc: 'Ph.D. Speech Therapist and Educator. Kaye College. Beer Sheva.',
    country: 'is'
  },
  {
    name: 'Laura Pedrós Cuadra',
    languages: ['en'],
    twitter: 'lapku',
    image: 'Laura_Pedros.jpg',
    desc: 'Profesora de Inglés.',
    country: 'es'
  },
  {
    name: 'Claudia Adelina Benegui',
    languages: ['ro'],
    image: 'she.jpg',
    desc: 'Logopeda en A. Benegui Logopedia.',
    url: 'http://www.abeneguilogopedia.com',
    facebook: 'abeneguilogopedia',
    instagram: 'abeneguilogopedia',
    country: 'es'
  },
  {
    name: 'Gulnara Ibragimova',
    languages: ['ru'],
    image: 'Gulnara_400x400.jpg',
    instagram: 'mom_box_tratata',
    country: 'ru'
  },
  {
    name: 'ICT-AAC',
    languages: ['hr'],
    image: 'ict-aac-logo.png',
    url: 'http://www.ict-aac.hr/',
    facebook: 'ictaac',
    twitter: 'ictaac',
    country: 'hr'
  },
  {
    name: 'Juan Daniel Burró Aláez',
    languages: ['en'],
    desc: 'Arasaac developer.',
    image: 'juanda.jpeg',
    github: 'juanda99',
    twitter: 'juandawrite',
    country: 'es'
  },
  {
    name: 'David Romero Corral  ',
    languages: ['en'],
    image: 'david-romero-320.jpg',
    desc: 'Arasaac coordinator. ',
    facebook: 'david.romerocorral',
    country: 'es'
  },
  {
    name: 'José Manuel Marcos Rodrigo',
    languages: ['es'],
    image: 'Jose_Manuel.jpg',
    desc: 'Arasaac coordinator. ',
    facebook: 'josemanuelmarcosrodrigo',
    country: 'es'
  },
  {
    name: 'Katalin Révész',
    languages: ['hu'],
    image: 'katalin.png',
    desc: 'Special education teacher, Pilis.',
    instagram: 'revesz.kata',
    country: 'hu'
  },
]

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
            <FormattedMessage {...messages.buildArasaac} />
          </P>
          <P>
            <FormattedMessage {...messages.wantToCollaborate} />
          </P>
          <P>
            <FormattedMessage {...messages.howToCollaborate} />
          </P>

          <H2 primary={true}><FormattedMessage {...messages.translators} /></H2>

          <RaisedButton label={filter ? 'Quitar filtro' : 'Filtrar por idioma'} primary={true} onClick={() => this.setState({ filter: !filter })} />
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
                  No hay traductores en este idioma. Puedes ponerte en contacto con nosotros para colaborar.
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

