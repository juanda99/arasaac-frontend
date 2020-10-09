import React from "react";
import PropTypes from "prop-types";

import {
  FacebookShareButton,
  // GooglePlusShareButton,
  // LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookShareCount,
  // GooglePlusShareCount,
  // LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

// import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'
import OuterDiv from "./OuterDiv";
import Span from "./Span";

// const {
//   FacebookShareButton,
//   // GooglePlusShareButton,
//   // LinkedinShareButton,
//   TwitterShareButton,
//   PinterestShareButton,
//   VKShareButton,
//   OKShareButton,
//   TelegramShareButton,
//   WhatsappShareButton
// } = ShareButtons

// const {
//   FacebookShareCount,
//   // GooglePlusShareCount,
//   // LinkedinShareCount,
//   PinterestShareCount,
//   VKShareCount,
//   OKShareCount
// } = ShareCounts

// const FacebookIcon = generateShareIcon('facebook')
// const TwitterIcon = generateShareIcon('twitter')
// // const GooglePlusIcon = generateShareIcon('google')
// // const LinkedinIcon = generateShareIcon('linkedin')
// const PinterestIcon = generateShareIcon('pinterest')
// const VKIcon = generateShareIcon('vk')
// const OKIcon = generateShareIcon('ok')
// const TelegramIcon = generateShareIcon('telegram')
// const WhatsappIcon = generateShareIcon('whatsapp')

const ShareBar = ({ shareUrl, title, image, language }) => (
  <div>
    <OuterDiv>
      <FacebookShareButton url={shareUrl} quote={title} hashtag="#arasaac">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      {/* <Span>
        <FacebookShareCount url={shareUrl}>
          {(count) => count}
        </FacebookShareCount>
      </Span> */}
      <div>&nbsp;</div>
    </OuterDiv>

    <OuterDiv>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <div>&nbsp;</div>
    </OuterDiv>

    <OuterDiv>
      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={40} round />
      </TelegramShareButton>

      <div>&nbsp;</div>
    </OuterDiv>

    <OuterDiv>
      <WhatsappShareButton url={shareUrl} title={title} separator=" ">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <div>&nbsp;</div>
    </OuterDiv>

    <OuterDiv>
      <PinterestShareButton
        url={String(window.location)}
        media={`${String(window.location)}/${image}`}
        windowWidth={1000}
        windowHeight={730}
      >
        <PinterestIcon size={40} round />
      </PinterestShareButton>
      {/* <Span>
        <PinterestShareCount url={String(window.location)} />
      </Span> */}
      <div>&nbsp;</div>
    </OuterDiv>
    {language === "ru" && (
      <OuterDiv>
        <VKShareButton
          url={shareUrl}
          image={`${String(window.location)}/${image}`}
          windowWidth={660}
          windowHeight={460}
        >
          <VKIcon size={40} round />
        </VKShareButton>
        {/* <Span>
          <VKShareCount url={String(window.location)} />
        </Span> */}
        <div>&nbsp;</div>
      </OuterDiv>
    )}
    {language === "ru" && (
      <OuterDiv>
        <OKShareButton
          url={shareUrl}
          image={`${String(window.location)}/${image}`}
          windowWidth={660}
          windowHeight={460}
        >
          <OKIcon size={40} round />
        </OKShareButton>
        {/* <Span>
          <OKShareCount url={String(window.location)} />
        </Span> */}
        <div>&nbsp;</div>
      </OuterDiv>
    )}
  </div>
);

ShareBar.propTypes = {
  // onClick: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  language: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default ShareBar;
