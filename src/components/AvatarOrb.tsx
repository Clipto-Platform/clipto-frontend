import styled from 'styled-components';

const AvatarOrb = styled.div`
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  border-radius: 100%;
  background: linear-gradient(134.17deg, #ff9900 0%, #fff627 86.27%);
`;

const XAvatarOrb = styled(AvatarOrb)`
height: 60px;
  min-height: 60px;
  max-height: 60px;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
`


export { AvatarOrb, XAvatarOrb };
