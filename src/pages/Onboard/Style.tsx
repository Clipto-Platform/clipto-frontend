import styled from 'styled-components';
import { OutlinedContainer } from '../../components/layout/Common';
import { Text } from '../../styles/typography';

export const OnboardTitle = styled.h1`
  font-family: 'Scto Grotesk A';
  font-weight: normal;
  text-align: center;
  font-size: 32px;
  line-height: 140%;
  font-style: normal;
  font-weight: bold;
  max-width: 500px;
  display: block;
  margin: auto;
  margin-bottom: 30px;
`;

export const Subtitle = styled(Text)`
  text-align: center;
  font-size: 18px;
`;

export const StepsContainer = styled(OutlinedContainer)`
  display: block;
  margin: auto;
  margin-top: 45px;
`;

export const StepLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
`;

export const OnboardingHr = styled.hr`
  margin-left: -20px;
  width: calc(100% + 40px);
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.border};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StepDescription = styled(Text)`
  font-size: 18px;
  line-height: 140%;
`;
