import styled from 'styled-components';

export const HeroTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  font-size: 40px;
  line-height: 125%;
  margin-bottom: 100px;
  max-width: 600px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 36px;
  `}
`;
