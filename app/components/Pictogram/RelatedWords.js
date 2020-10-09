import React, { Component } from "react";
import PropTypes from "prop-types";
import H3 from "components/H3";
import Divider from "material-ui/Divider";
import LanguageSelector from "components/LanguageSelector";
import { FormattedMessage } from "react-intl";
import api from "services";
import P from "components/P";
import SoundPlayer from "components/SoundPlayer";
import { LOCUTIONS_URL } from "services/config";
import IconButton from "material-ui/IconButton";
import CloudDownloadIcon from "material-ui/svg-icons/file/cloud-download";
import messages from "./messages";

export default class RelatedWords extends Component {
  static propTypes = {
    language: PropTypes.string,
    idPictogram: PropTypes.number.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onDownloadLocution: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  state = {
    keywords: [],
  };

  componentDidMount = () => {
    const { idPictogram, language } = this.props;
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      this.setState({ keywords: data.keywords });
    });
  };

  // getSoundPlayer = (idLocution, locale) => (
  //   <SoundPlayer
  //     crossOrigin='anonymous'
  //     streamUrl={`${LOCUTIONS_URL}/${locale}/${idLocution}`}
  //     preloadType='metadata'
  //     showProgress={false}
  //     showTimer={false}
  //   />
  // );

  getSoundPlayer = (idLocution, locale, keyword) => {
    const streamUrl = `${LOCUTIONS_URL}/${locale}/${idLocution}`;
    return (
      <div style={{ display: "flex" }}>
        <SoundPlayer
          crossOrigin="anonymous"
          streamUrl={streamUrl}
          preloadType="metadata"
          showProgress={false}
          showTimer={false}
        />
        {keyword && (
          <IconButton
            touch={true}
            onClick={() =>
              this.props.onDownloadLocution(idLocution, locale, keyword)
            }
          >
            <CloudDownloadIcon />
          </IconButton>
        )}
      </div>
    );
  };

  handleLanguageChange = (language) => {
    const { idPictogram, onLanguageChange } = this.props;
    onLanguageChange(language);
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      this.setState({ keywords: data.keywords });
    });
  };

  render() {
    const { keywords } = this.state;
    const { language, style } = this.props;
    return (
      <div style={style}>
        <H3 primary>{<FormattedMessage {...messages.description} />}</H3>
        <Divider />
        <P>{<FormattedMessage {...messages.changePictoLanguage} />}</P>
        <LanguageSelector
          value={language}
          onChange={this.handleLanguageChange}
          shortOption={true}
          showToolTip={false}
        />
        {keywords &&
          keywords.map((keyword, index) => {
            return (
              <div key={`${keyword.keyword}-${index}`}>
                <div style={{ display: "flex" }}>
                  {keyword.idLocution &&
                    this.getSoundPlayer(
                      keyword.idLocution,
                      language,
                      keyword.keyword
                    )}
                  <P important={true} marginRight={"10px"}>
                    {keyword.keyword}{" "}
                  </P>
                  <P>{keyword.meaning}</P>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
