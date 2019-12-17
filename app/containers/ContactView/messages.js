/*
 * ConfigurationView Messages
 *
 * This contains all the text for the ConfigurationView component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  name: {
    id: 'app.containers.ContactView.form.name',
    description: 'Name',
    defaultMessage: 'Name'
  },
  nameHint: {
    id: 'app.containers.ContactView.form.nameHint',
    description: 'Name',
    defaultMessage: 'Type your name'
  },
  email: {
    id: 'app.containers.ContactView.form.email',
    description: 'email',
    defaultMessage: 'Email'
  },
  emailHint: {
    id: 'app.containers.ContactView.form.emailHint',
    description: 'email',
    defaultMessage: 'Type your email'
  },
  message: {
    id: 'app.containers.ContactView.form.message',
    description: 'message',
    defaultMessage: 'Message'
  },
  messageHint: {
    id: 'app.containers.ContactView.form.messageHint',
    description: 'message',
    defaultMessage: 'Type your message'
  },
  fingers: {
    id: 'app.containers.ContactView.form.fingers',
    defaultMessage: 'How many fingers?  '
  },
  fingersHint: {
    id: 'app.containers.ContactView.form.fingersHint',
    description: 'message',
    defaultMessage: 'Type the fingers you see in the pictogram below'
  }
})
