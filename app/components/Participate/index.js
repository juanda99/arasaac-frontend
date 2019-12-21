
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H3 from 'components/H3'
import FullWidthSection from 'components/FullWidthSection'
import RaisedButton from 'material-ui/RaisedButton'
import { grey200 } from 'material-ui/styles/colors'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import messages from './messages'


class Participate extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleRouterChangeLink = (value) => {
    event.preventDefault()
    this.context.router.push(value)
  }

  render() {
    return (
      <FullWidthSection color={grey200}>
        <H3 style={styles.H3} primary={true}>
          <FormattedMessage {...messages.participate} />
        </H3>
        <RaisedButton
          label={<FormattedMessage {...messages.contact} />}
          primary={true}
          href='/contact-us'
          onClick={(event) => this.handleRouterChangeLink(event, '/contact-us')}
          style={styles.button}
        />
      </FullWidthSection>
    )
  }
}

export default Participate
