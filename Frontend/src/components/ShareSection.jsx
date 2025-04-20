import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import PropTypes from "prop-types";

const ShareSection = ({ url, title }) => {
  return (
    <div className="flex gap-1">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
    </div>
  );
};

ShareSection.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShareSection;
