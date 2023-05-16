import React from 'react'
import ReadMargin from 'components/ReadMargin'
import P from 'components/P'
import A from 'components/A'
import H2 from 'components/H2'

export class PrivacyPolicyEn extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ReadMargin>
        <P>
          This page informs about the privacy and data protection policy of the
          website <A href="https://www.arasaac.org">www.arasaac.org</A>, which
          has been adapted to{' '}
          <strong>
            "Regulation (EU) 2016/679 of the European Parliament and of the
            Council, of April 27, 2016, on the protection of natural persons
            with regard to the processing of personal data and on the free
            movement of such data, and repealing Directive 95/46/EC General Data
            Protection Regulation"
          </strong>{' '}
          (hereinafter, GDPR) and{' '}
          <strong>
            Organic Law 3/2018, of December 5, Protection of Personal Data and
            Guarantee of Digital Rights.
          </strong>
        </P>
        <P>
          This policy is applicable both to the information collected through
          the website <A href="https://www.arasaac.org">www.arasaac.org</A> and
          to the applications dependent on it.
        </P>

        <P>
          The processing of personal data collected on this website and in the
          associated applications will be subject to current legislation on data
          protection, the GDPR and other applicable regulations. In this way,
          the privacy of users is guaranteed at all times, as well as the
          secrecy and security of their personal data.
        </P>

        <P>
          The Government of Aragon undertakes to keep the maximum reserve and
          confidentiality of the information that is provided to it and to use
          it only for the purposes established in each case.
        </P>

        <H2 primary={true}>Responsible for the processing of personal data</H2>

        <P>
          The Government of Aragon has a database called{' '}
          <em>
            "Register of Treatment Activities of the Government of Aragon"
          </em>
          . In it, the Departments of the Aragon Government identify the
          treatment activities that are applied to each set of personal data.
          The data processed is strictly necessary, adequate and pertinent for
          each purpose.{' '}
        </P>
        <P>
          The data collected on this website will be incorporated and processed
          in the Registry of Treatment Activities of the Dirección General de
          Innovación y Formación Profesional ARASAAC. Your personal data will be
          processed for the exclusive purpose of managing the ARASAAC project,
          covering administrative and judicial claims, as well as transparency
          requests.
        </P>
        <P>
          The body responsible for the Registry of Treatment Activities is the
          Dirección General de Innovación y Formación Profesional.
        </P>

        <P>
          The legality of data processing is necessary for compliance with a
          legal obligation applicable to the data controller. These data will
          not be transferred to third parties, except legal obligation.
        </P>

        <H2 primary={true}>Rights of the interested parties</H2>

        <P>
          Anyone has the right to obtain information about the processing of
          their personal data made by the Government of Aragon. The rights of
          access, rectification, deletion, portability of the data and those of
          limitation and opposition to the treatments may be exercised. You may
          also exercise the right not to be subject to decisions based solely on
          automated data processing, including profiling. The rights will be
          exercised before the body responsible for the treatment.
        </P>

        <P>
          You may exercise your rights of access, rectification, deletion and
          portability of personal data, as well as limitation and opposition to
          its treatment, in accordance with the provisions of the General Data
          Protection Regulation, before said General Directorate (Avda. Ranillas
          nº 5 D 50.071 Zaragoza), or at the email address
          dginnovacionyfp@aragon.es, in accordance with the provisions of the
          General Data Protection Regulation. You can consult additional and
          detailed information in the &nbsp;
          <A
            href="http://aplicaciones.aragon.es/notif_lopd_pub/details.action?fileId=249&fileVersion=1"
            target="_blank"
          >
            Register of Treatment Activities of the Government of Aragon
          </A>
          , identifying the following treatment activity: "ARASAAC".
        </P>

        <P>
          You can also file a claim with the Spanish Agency for Data Protection
          in the event that you consider that the processing of your data is not
          being adequate.
        </P>

        <H2 primary={true}>Personal data</H2>
        <P>
          In compliance with the provisions of article 32 of the GDPR, the
          Government of Aragon will guarantee the confidentiality, integrity,
          availability and permanent resilience of the treatment systems and
          services. The level of security will be proportional to the risk in
          the treatment of each type of personal data.
        </P>
        <P>
          The only information collected from users is through the registration
          form (name, email, company and website). The information is stored on
          servers belonging to the Government of Aragon and located in the
          European Union.
        </P>
        <P>
          ARASAAC provides an API for third parties to access their data
          (pictograms, materials, etc.). ARASAAC does not store any information
          about the usage of the API by third parties, except for usage
          statistics in an anonymous and aggregated form (by application, not by
          user).
        </P>

        <H2 primary={true}>Use of cookies and registration of IP addresses</H2>

        <P>
          A series of cookies are used for the operation of the website and
          applications, as well as the Google Analytics tool for exclusively
          statistical purposes. All this information is detailed in our Cookies
          Policy.
        </P>
      </ReadMargin>
    )
  }
}

export default PrivacyPolicyEn
