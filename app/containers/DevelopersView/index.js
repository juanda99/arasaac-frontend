import React, { PureComponent } from "react";
import View from "components/View";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { IMAGES_URL } from "services/config";
import P from "components/P";
import A from "components/A";
import H2 from "components/H2";
import H3 from "components/H3";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router";
import ReadMargin from "components/ReadMargin";
import messages from "./messages";

const style = {
  margin: 12,
};

class DevelopersView extends PureComponent {
  render() {
    const { intl } = this.props;
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <P>{<FormattedMessage {...messages.introApi} />}</P>
          <H2 primary={true}>
            {<FormattedMessage {...messages.termsOfUse} />}
          </H2>
          <P>{<FormattedMessage {...messages.termsOfUseDesc} />}</P>
          <A target="_blank" href="https://creativecommons.org/licenses/">
            <img
              src={`${IMAGES_URL}/by-nc-sa.svg`}
              alt={<FormattedMessage {...messages.license} />}
              title={intl.formatMessage(messages.license)}
            />
          </A>
          <H2 primary={true}>{<FormattedMessage {...messages.howto} />}</H2>
          {/* <P>{<FormattedMessage {...messages.howtoDesc} />}</P>
          <H3 primary={true}>{<FormattedMessage {...messages.grantTypes} />}</H3>
          <P>{<FormattedMessage {...messages.grantTypesDesc} />}</P> */}
          <Link to="/developers/api">
            <RaisedButton label="Test our API" primary={true} style={style} />
          </Link>
          {/* <A href='https://documenter.getpostman.com/view/563205/arasaac/7TFFuzj' target='_blank'>
            <RaisedButton label='Use POSTMAN' secondary={true} style={style} />
          </A> */}
        </ReadMargin>
      </View>
    );
  }
}

DevelopersView.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DevelopersView);
