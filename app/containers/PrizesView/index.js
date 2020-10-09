/*
 *
 * MaterialView
 *
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import View from "components/View";
import P from "components/P";
import Helmet from "react-helmet";
import ReadMargin from "components/ReadMargin";
import PrizeList from "./PrizeList";
import prizes from "./prizes.json";
import messages from "./messages";

class PrizesView extends PureComponent {
  renderWarning = (
    <P>
      <FormattedMessage {...messages.onlySpanish} />
    </P>
  );

  render() {
    const { locale } = this.props;
    return (
      <View left={true} right={true} top={1}>
        <Helmet
          title="PrizesView"
          meta={[{ name: "description", content: "Arasaac prizes" }]}
        />
        <ReadMargin>
          {locale !== "es" && this.renderWarning}
          <P style={{ paddingBottom: "2rem" }}>
            <FormattedMessage {...messages.introArasaacPrizes} />
          </P>
          <PrizeList prizes={prizes} />
        </ReadMargin>
      </View>
    );
  }
}

PrizesView.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const locale = state.get("language").get("locale");
  return {
    locale,
  };
};

export default connect(mapStateToProps)(PrizesView);
