import React from "react";
import { FormattedMessage } from "react-intl";
import P from "components/P";
import H3 from "components/H3";
import Divider from "material-ui/Divider";
import CreativeCommons from "./CreativeCommons";
import Arasaac from "./Arasaac";
import messages from "./messages";
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

    <P>
      <FormattedMessage {...messages.licenseP6} />
      <br />
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
    </P>

    <P>
      <FormattedMessage {...messages.licenseP8} />
      <br />
      <blockquote>
        <em>
          <FormattedMessage {...messages.author} /> Sergio Palao <br />
          <FormattedMessage {...messages.origin} /> <Arasaac link={true} />
          <br />
          <FormattedMessage {...messages.license} /> CC (BY-NC-SA)
          <br />
          <FormattedMessage {...messages.owner} />
        </em>
      </blockquote>
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
);

export default LicenseText;
