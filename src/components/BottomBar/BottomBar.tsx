import React from 'react';
import { MdEmail } from 'react-icons/md';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import styled from 'styled-components';
import config from '../../config/config';
import { Label } from '../../styles/typography';

const SOCIAL_SIZE = 30;

const BottomBarWrapper = styled.div`
  width: 100%;
  background: #121212;
  text-align: center;
`;

const BottomBar: React.FC = () => {
  return (
    <>
      <BottomBarWrapper style={{ paddingBottom: 20 }}>
        <Label style={{ paddingTop: 40, marginBottom: 40, fontSize: 24 }}>Contact Us</Label>
        <div style={{ marginBottom: 80 }}>
          <a href={config.discord} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
            <SiDiscord style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
          </a>
          <a href={config.twitter} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
            <SiTwitter style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
          </a>
          {config.email && (
            <a href={'mailto:'.concat(config.email)} target="_blank" style={{ marginRight: 20, marginLeft: 20 }}>
              <MdEmail style={{ width: SOCIAL_SIZE, height: SOCIAL_SIZE }} />
            </a>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <a href={config.documentation} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
            Docs
          </a>
          <a href={config.terms} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
            Terms
          </a>
          <a href={config.policy} target="_blank" style={{ marginRight: 10, marginLeft: 10 }}>
            Privacy
          </a>
        </div>
        <div style={{ marginBottom: 20 }}>© 2022 Clipto. All Rights Reserved</div>
      </BottomBarWrapper>
    </>
  );
};

export { BottomBar };
