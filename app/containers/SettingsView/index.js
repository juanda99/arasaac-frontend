/*
 *
 * AccessibilityView
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Div from "components/Div";
import Slider from "material-ui/Slider";
import View from "components/View";
import Helmet from "react-helmet";
import H2 from "components/H2";
import ReadMargin from "components/ReadMargin";
import Button from "components/Button";
import Divider from "material-ui/Divider";
import { THEMES, changeTheme } from "containers/ThemeProvider/actions";
import LanguageSelector from "components/LanguageSelector";
import { changeLocale } from "containers/LanguageProvider/actions";
import messages from "./messages";

/**
 * The `defaultValue` property sets the initial position of the slider.
 * The slider appearance changes when not at the starting position.
 */
const SliderExampleSimple = () => (
  <div>
    <Slider min={0} max={200} step={25} />
  </div>
);

class SettingsView extends React.Component {
  handleClick = (theme) => {
    this.props.changeTheme(theme);
  };

  render() {
    const { changeTheme, theme, changeLocale, locale } = this.props;
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <Helmet
            title="Settings"
            meta={[
              { name: "description", content: "Description of MaterialView" },
            ]}
          />
          <Div bottom={3}>
            <H2 primary={true}>
              {" "}
              <FormattedMessage {...messages.colortheme} />{" "}
            </H2>
            {THEMES.map((value) => (
              <Button
                key={value}
                label={<FormattedMessage {...messages[value]} />}
                value={value}
                onClick={changeTheme}
                style={{ margin: 12 }}
                curval={theme}
              />
            ))}
          </Div>
          <Divider style={{ margin: "4px" }} />
          <Div top={3}>
            <H2 primary={true}>
              {" "}
              <FormattedMessage {...messages.language} />{" "}
            </H2>
            <LanguageSelector value={locale} onChange={changeLocale} />
          </Div>
        </ReadMargin>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const locale = state.getIn(["language", "locale"]);
  const theme = state.get("theme");
  return {
    locale,
    theme,
  };
};

SettingsView.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
};

export default connect(mapStateToProps, { changeLocale, changeTheme })(
  SettingsView
);
