import styled from 'styled-components';
import { MAX_CONTENT_WIDTH_PX } from '../../styles/theme';

export const MAX_HEADER_WIDTH_IN_PX = MAX_CONTENT_WIDTH_PX;

export const HEADER_HEIGHT_IN_PX = '64px';

export const HeaderWrapperOuter = styled.div`
  display: flex;
  flex: 1;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${HEADER_HEIGHT_IN_PX};
  max-height: ${HEADER_HEIGHT_IN_PX};
  min-height: ${HEADER_HEIGHT_IN_PX};
  background: ${(props) => props.theme.black};
  z-index: 100;

  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}
`;

export const ChainContainer = styled.div`
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px;
  // margin-top: ${HEADER_HEIGHT_IN_PX};
  background: ${(props) => props.theme.yellow};
  color: black;
  font-weight: bold;
`;

export const HeaderWrapperInner = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: space-between;
  max-width: ${MAX_HEADER_WIDTH_IN_PX};

  color: #ffffff;
  margin: 0 auto 0 auto;
`;

export const LeftWrapper = styled.div`
  display: flex;
  text-decoration: inherit;
  justify-content: flex-start;
  align-items: center;
`;

export const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export const DropDownItem = styled.div`
  display: block;
  width: 100%;
  padding: 10px 60px 10px 30px;
  color: #888f96;
  font-weight: bold;
  :hover {
    color: #ffffff;
  }
`;

export const Divider = styled.hr`
  border: 1px solid #121212;
`;

export const StyledSpan = styled.span`
  display: block;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;
  transition: color 0.15s ease;
  :hover {
    color: #ffffff;
  }
`;

export const ConnectWallet = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 18;
  text-align: 'left';
`;

export const Error = styled.div`
  margin-bottom: 12px;
  color: #ff6868;
  text-align: left;
`;

export const ConnectWalletPopup = styled.div`
  display: flex;
  vertical-align: middle;
`;

export const DesktopHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const MobileHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction:column;
  align-items: initial;
  position: absolute;
  right: 0px;
  top: 50px;
  z-index: 100;
  background-color: rgba(0,0,0);
  border: 1px solid #504d4d;
  border-radius: 10px;
  width: auto;
  padding:40px 20px;
  box-sizing:border-box;
  &  ${StyledSpan}{
    margin-bottom:20px;
    border
   }

  @media screen and (min-width: 600px){
    display:none;
  }
`;

export const MenuContainer = styled.span`
  padding: 5px 0px 0px 5px;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;
export const MenuButton = styled.button`
  background: none;
  border: none;
`;
export const Wrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
export const LinkWrapper = styled.span`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const DiscordWrapper = styled.span`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
