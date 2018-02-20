import React, { PureComponent } from 'react'
import View from 'components/View'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { IMAGES_URL } from 'services/config'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import messages from './messages'

const style = {
  margin: 12
}

class DevelopersView extends PureComponent {

  componentWillMount() {

  }

  render() {
    const { intl } = this.props
    const logo = `${IMAGES_URL}/by-nc-sa.svg`
    return (
      <View left={true} right={true}>
        <p>{<FormattedMessage {...messages.introApi} />}</p>
        <h2>{<FormattedMessage {...messages.termsOfUse} />}</h2>
        <p>{<FormattedMessage {...messages.termsOfUseDesc} />}</p>
        <a target='_blank' href='https://creativecommons.org/licenses/'>
          <img src={logo} alt={<FormattedMessage {...messages.license} />} title={intl.formatMessage(messages.license)} />
        </a>
        <h2>{<FormattedMessage {...messages.howto} />}</h2>
        <p>{<FormattedMessage {...messages.howtoDesc} />}</p>
        <h3>{<FormattedMessage {...messages.grantTypes} />}</h3>
        <p>{<FormattedMessage {...messages.grantTypesDesc} />}</p>
        <Link to='/developers/api'>
          <RaisedButton label='Test our API' primary={true} style={style} />
        </Link>
        <a href='https://documenter.getpostman.com/view/563205/arasaac/7TFFuzj' target='_blank'>
          <RaisedButton label='Use POSTMAN' secondary={true} style={style} />
        </a>
      </View>
    )
  }
}

DevelopersView.propTypes = {
  intl: intlShape.isRequired
}


export default injectIntl(DevelopersView)
