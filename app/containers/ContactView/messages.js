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
  },
  alertWindowErrorTitle: {
    id: 'app.containers.ContactView.alertWindowErrorTitle',
    description: 'message',
    defaultMessage: 'Contact form error'
  },
  alertWindowErrorDesc: {
    id: 'app.containers.ContactView.alertWindowErrorDesc',
    description: 'message',
    defaultMessage: 'We are sorry but we could not receive your message.Try again later or contact us through our social networks'
  },
  sendingMessage: {
    id: 'app.containers.ContactView.sendingMessage',
    description: 'message',
    defaultMessage: 'Sending message...'
  },
  sendMessage: {
    id: 'app.containers.ContactView.sendMessage',
    description: 'message',
    defaultMessage: 'Thank you for your message. We will contact you as soon as possible.'
  }
})
