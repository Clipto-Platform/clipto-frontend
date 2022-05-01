import React from 'react';
import { MdEmail } from 'react-icons/md';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import styled from 'styled-components';
import { DISCORD_LINK, DOCS_LINK, HELP_EMAIL, PRIVACY_LINK, TERMS_LINK, TWITTER_LINK } from '../../config/config';
import { Label } from '../../styles/typography';
const BottomBar: React.FC = () => {
  return (
    <>
      <BottomBarWrapper style={{ paddingBottom: 20 }}>
        <Label style={{ paddingTop: 40, marginBottom: 40, fontSize: 24 }}>Contact Us</Label>
        <div style={{ marginBottom: 80 }}>
          {DISCORD_LINK && (
            <a href={DISCORD_LINK} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
              <SiDiscord style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
            </a>
          )}
          {TWITTER_LINK && (
            <a href={TWITTER_LINK} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
              <SiTwitter style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
            </a>
          )}
          {HELP_EMAIL && (
            <a href={'mailto:' + HELP_EMAIL} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
              <MdEmail style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
            </a>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          {DOCS_LINK && (
            <a href={DOCS_LINK} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
              Docs
            </a>
          )}
          {TERMS_LINK && (
            <a href={TERMS_LINK} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
              Terms
            </a>
          )}
          {PRIVACY_LINK && (
            <a href={PRIVACY_LINK} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
              Privacy
            </a>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>© 2022 Clipto. All Rights Reserved</div>
      </BottomBarWrapper>
    </>
  );
};

const SOCIAL_SIZE = 30;

const BottomBarWrapper = styled.div`
  width: 100%;
  background: #121212;
  text-align: center;
`;

export { BottomBar };
