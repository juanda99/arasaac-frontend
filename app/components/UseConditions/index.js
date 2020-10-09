/**
 *
 * UseConditions
 *
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import View from "components/View";
import messages from "./messages";

// const license = <a href='https://creativecommons.org/licenses/by-nc-sa/3.0/' target='_blank'><FormattedMessage {...messages.license} /></a>
const owner = (
  <a href="http://www.aragon.es/" target="_blank">
    <FormattedMessage {...messages.owner} />
  </a>
);
// const author = 'Sergio Palao'

const UseConditions = () => (
  <View>
    <p>{<FormattedMessage {...messages.property} values={{ owner }} />}</p>
    <p></p>
    <p>
      Resources offered in the site (pictograms, images or videos), as well as
      the materials based on them, are released under a Creative Commons License
      Licencia Creative Commons, being authorised for a non-profit use if author
      and source are mentioned and the use of materials is shared in the same
      way.
    </p>
    <p>
      That implies that any work based on resources hosted ARASAACs catalogues
      (pictograms, images and videos) must be distributed with the same Creative
      Commons License, author (Sergio Palao) and property (Aragon Goberment)
      must be quoted and origin (ARASAAC http://arasaac.org) must be recognised,
      as well as the Creative Commons License.
    </p>
    <p> Means of expressing this can be: </p>
    <blockquote>
      The pictograms used are property of Aragon Goberment and have been created
      by Sergio Palao to ARASAAC (http://arasaac.org) which distribute them
      under Creative Commons License (BY-NC-SA)
    </blockquote>
    <p>Or in a schematic way:</p>
    <blockquote>
      Pictograms’ author: Sergio Palao Origin: ARASAAC (http://arasaac.org)
      Licenses: CC (BY-NC-SA) Property: Aragon Goberment Remains excluded from
      this permission the edition or publication of these materials inside
      publications with commercial purposes.
    </blockquote>

    <p>
      For any other use, reprography and the computer treatment remain
      rigorously prohibited without the written authorization of the holders of
      the Copyright, under the sanctions established by the laws, the total or
      partial reproduction of these materials for any way or procedure.
    </p>
    <p> Responsibility’s exemption clause:</p>
    <p>
      {" "}
      The Aragonese Center of Augmentative and Alternative Communication has an
      informative and illustrative character, and tries to put at the disposal
      of any interested person the information of the project. Nevertheless, it
      is necessary to specify the following thing:
    </p>
    <ul>
      <li>
        The information that offers is merely informative and lacks of any
        effect binding the Administration, so that we do not assume any
        responsibility of the content.
      </li>
      <li>
        The information that offers might not be exhaustive, exact or updated.
      </li>
      <li>
        Links are facilitated to external pages on which ARASAAC does not have
        any control, and respect of which we decline any responsibility.
      </li>
    </ul>
  </View>
);

export default UseConditions;
