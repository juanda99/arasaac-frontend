import React, { PropTypes } from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'
import OuterDiv from './OuterDiv'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton
} = ShareButtons

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount
} = ShareCounts

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const PinterestIcon = generateShareIcon('pinterest')
const VKIcon = generateShareIcon('vk')
const OKIcon = generateShareIcon('ok')
const TelegramIcon = generateShareIcon('telegram')
const WhatsappIcon = generateShareIcon('whatsapp')

const ShareBar = ({ shareUrl, title, exampleImage }) => (
  <div>
    <OuterDiv>
      <FacebookShareButton url={shareUrl} title={title} picture={`${String(window.location)}/${exampleImage}`}>
        <FacebookIcon size={40} round logoFillColor={'yellow'} iconBgStyle={'fill'} />
      </FacebookShareButton>

      <FacebookShareCount url={shareUrl}>
        {(count) => count}
      </FacebookShareCount>
    </OuterDiv>

    <OuterDiv>
      <TwitterShareButton url={shareUrl} title={title} >
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <div>
        &nbsp;
      </div>
    </OuterDiv>

    <OuterDiv>
      <TelegramShareButton url={shareUrl} title={title} >
        <TelegramIcon size={40} round />
      </TelegramShareButton>

      <div>
        &nbsp;
      </div>
    </OuterDiv>

    <OuterDiv>
      <WhatsappShareButton url={shareUrl} title={title} separator=':: '>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <div>
        &nbsp;
      </div>
    </OuterDiv>

    <OuterDiv>
      <GooglePlusShareButton url={shareUrl}>
        <GooglePlusIcon size={40} round />
      </GooglePlusShareButton>

      <GooglePlusShareCount url={shareUrl} >
        {(count) => count}
      </GooglePlusShareCount>
    </OuterDiv>

    <OuterDiv>
      <LinkedinShareButton url={shareUrl} title={title} windowWidth={750} windowHeight={600}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>

      <LinkedinShareCount url={shareUrl}>
        {(count) => count}
      </LinkedinShareCount>
    </OuterDiv>

    <OuterDiv>
      <PinterestShareButton url={String(window.location)} media={`${String(window.location)}/${exampleImage}`} windowWidth={1000} windowHeight={730}>
        <PinterestIcon size={40} round />
      </PinterestShareButton>

      <PinterestShareCount url={String(window.location)} />
    </OuterDiv>

    <OuterDiv>
      <VKShareButton url={shareUrl} image={`${String(window.location)}/${exampleImage}`} windowWidth={660} windowHeight={460}>
        <VKIcon size={40} round />
      </VKShareButton>

      <VKShareCount url={String(window.location)} />
    </OuterDiv>

    <OuterDiv>
      <OKShareButton url={shareUrl} image={`${String(window.location)}/${exampleImage}`} windowWidth={660} windowHeight={460} >
        <OKIcon size={40} round />
      </OKShareButton>

      <OKShareCount url={String(window.location)} />
    </OuterDiv>
  </div>
)

ShareBar.propTypes = {
  // onClick: PropTypes.func.isRequired,
  shareUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  exampleImage: PropTypes.string
}

export default ShareBar
