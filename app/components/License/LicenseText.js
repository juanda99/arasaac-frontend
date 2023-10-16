import React from 'react'
import { FormattedMessage } from 'react-intl'
import P from 'components/P'
import A from 'components/A'
import H3 from 'components/H3'
import { IMAGES_URL } from 'services/config'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import CreativeCommons from './CreativeCommons'
import Arasaac from './Arasaac'
import Guide from './Guide'
import messages from './messages'
const LicenseText = ({ locale }) => (
  <div>
    <P>
      <FormattedMessage
        {...messages.licenseP1}
        values={{ ARASAAC: <Arasaac /> }}
      />
    </P>
    <P>
      <FormattedMessage
        {...messages.licenseP2}
        values={{ creativeCommonsLicense: <CreativeCommons locale={locale} /> }}
      />
    </P>
    <P>
      <FormattedMessage {...messages.licenseP3} />
    </P>
    <P>
      <FormattedMessage {...messages.licenseP4} />
    </P>

    <P>
      <FormattedMessage
        {...messages.licenseP5}
        values={{
          ARASAAC: <Arasaac />,
          creativeCommonsLicense: <CreativeCommons locale={locale} />,
        }}
      />
    </P>
    <H3>
      <FormattedMessage {...messages.licenseP6Title} />
    </H3>
    <P>
      <FormattedMessage {...messages.licenseP6b} />
      <br />
      <ul>
        <li>
          <blockquote>
            <em>
              <FormattedMessage
                {...messages.licenseP7}
                values={{
                  ARASAAC: <Arasaac link={true} />,
                  creativeCommonsLicense: <CreativeCommons locale={locale} />,
                }}
              />
            </em>
          </blockquote>
        </li>
        <li>
          <blockquote>
            <em>
              <FormattedMessage {...messages.author} /> Sergio Palao.{' '}
              <FormattedMessage {...messages.origin} /> <Arasaac link={true} />
              {'. '}
              <FormattedMessage {...messages.license} /> CC (BY-NC-SA){'. '}
              <FormattedMessage {...messages.owner} />
            </em>
          </blockquote>
        </li>
      </ul>
    </P>
    <P>
      <FormattedMessage
        {...messages.licenseP8a}
        values={{
          ARASAAC: <Arasaac />,
        }}
      />
    </P>

    <A href={`${IMAGES_URL}/logo_ARASAAC.zip`} target="_blank">
      <RaisedButton label={<FormattedMessage {...messages.downloadLogo} />} />
    </A>
    <P>
      <FormattedMessage
        {...messages.guideAulaAbierta}
        values={{ guideAndResources: <Guide locale={locale} /> }}
      />
    </P>
    <P>
      <Link to={'/contact-us'}>
        <FormattedMessage {...messages.licenseP8d} />
      </Link>
    </P>

    <Divider />
    <H3>
      <FormattedMessage {...messages.disclaimer} />
    </H3>
    <P>
      <FormattedMessage
        {...messages.licenseP9}
        values={{
          ARASAAC: <Arasaac link={true} />,
          creativeCommonsLicense: <CreativeCommons locale={locale} />,
        }}
      />
    </P>
  </div>
)

export default LicenseText
