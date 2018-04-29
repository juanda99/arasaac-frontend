import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import { FormattedMessage } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import P from 'components/P'
import messages from './messages'

const styles = {
  desc: {
    flexGrow: 3,
    width: '500px',
    padding: '2rem',
    textAlign: 'justify'
  },
  snippet: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap-reverse'
  },
  button: {
    margin: '0 auto'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}
class Pictogram extends Component {
  state = {
    language: this.props.locale
  }

  handleChange = (event, value) => { this.setState({ language: value }) }

  render() {
    console.log(this.props.pictogram)
    const { pictogram } = this.props
    const { desc, authors } = pictogram
    const title = pictogram.get('title')

    return (
      <div>
        <H2 primary ucase>{title}</H2>
        <div style={styles.snippet}>
          <div style={styles.desc}>
            <P>{desc}</P>
          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.shareMaterial} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={title} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) =>
          <P>
            <FlatButton
              key={author.get('id')}
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </P>
        )}
      </div>
    )
  }
}


Pictogram.propTypes = {
  // onClick: PropTypes.func.isRequired,
  pictogram: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default muiThemeable()(Pictogram)
