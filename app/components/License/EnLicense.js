import React from 'react'
import P from 'components/P'
import H3 from 'components/H3'
import Divider from 'material-ui/Divider'
import CreativeCommons from './CreativeCommons'
import Arasaac from './Arasaac'
const EnLicense = () => (
  <div>
    <P>
      <Arasaac /> is a brand of the Government of Aragon (Spain), registered in
      the Spanish Patent and Trademark Office. The <Arasaac /> pictogram
      collection is registered in the General Registry of Intellectual Property
      (No. Deposit Legal Z 901-2013) as a collective work on behalf of the
      Diputación General de Aragón, who has edited and disseminated it in
      accordance with the provisions of Article 8 of the revised text of the
      Intellectual Property Law, approved by Royal Legislative Decree 1/1996, of
      April 12.
    </P>
    <P>
      Resources offered on the website (pictograms, images, locutions or
      videos), as well as the materials based on them, are published under{' '}
      <CreativeCommons locale='en' />, authorizing their use for non-profit
      purposes provided that the source, author and are shared under the same
      license.
    </P>
    <P>
      Therefore, the use of these resources within any product or publication
      for commercial purposes is excluded.
    </P>
    <P>
      For any other use they are strictly prohibited, without written
      authorization of the copyright holders, under the sanctions established by
      law, the total or partial reproduction of these resources by any means or
      procedure, including reprography and computer processing.
    </P>

    <P>
      Any work derived from the resources contained in the <Arasaac /> catalogs
      (pictograms, images, voiceovers or videos), must distribute with the same
      <CreativeCommons locale='en' />, it must be cited the author and the owner
      thereof (Gobierno de Aragón), their origin (
      <Arasaac />) and the license under which is distributed (
      <CreativeCommons locale='en' />
      ).
    </P>

    <P>
      In the case of pictograms, the way to attribute authorship is: <br />
      <em>
        The pictographic symbols used are the property of the Government of
        Aragón and have been created by Sergio Palao for <Arasaac link={true} />
        that distributes them under <CreativeCommons locale='en' />.
      </em>
    </P>

    <P>
      Or in a schematic way: <br />
      <em>
        Pictograms author: Sergio Palao <br />
        Origin: <Arasaac link={true} />
        <br />
        License: CC (BY-NC-SA)
        <br />
        Owner: Government of Aragon (Spain)
      </em>
    </P>
    <Divider />
    <H3>Disclaimer</H3>
    <P>
      The Government of Aragon, is not responsible for the improper or negligent
      use of resources contained in the <Arasaac link={true} /> catalogs made by
      third parties that exceeds the terms of the{' '}
      <CreativeCommons locale='en' />.
    </P>
  </div>
)

export default EnLicense
