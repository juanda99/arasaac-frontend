import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import P from 'components/P'
import H2 from 'components/H2'
import messages from './messages'


export class PersonalData extends React.Component {

  state = {
    showForm: false
  }

  render() {
    const { name, email, company, url } = this.props
    return (
      <div>
        <H2 primary={true}>
          <FormattedMessage {...messages.personalData} />
        </H2>


        <P><strong><FormattedMessage {...messages.name} /></strong>&nbsp; {name} </P>
        <P><strong><FormattedMessage {...messages.email} /></strong>&nbsp; {email} </P>
        <P><strong><FormattedMessage {...messages.company} /></strong>&nbsp; {company} </P>
        <P><strong><FormattedMessage {...messages.url} /></strong>&nbsp; {url} </P>
        <RaisedButton label={<FormattedMessage {...messages.changePersonalData} />} secondary={true} />
      </div>
    )
  }
}


PersonalData.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  company: PropTypes.string,
  url: PropTypes.string
}


export default PersonalData

