import styled from 'styled-components';
import background1 from '../../assets/images/homepage/page1/background.png';
import background2 from '../../assets/images/homepage/page2/background.png';
import background3 from '../../assets/images/homepage/page3/background.png';

export const BackgroundWrapper = styled.div`
  background-image: url(${(props) => (props.page === 0 ? background1 : props.page === 1 ? background2 : background3)});
  background-size: cover;
  background-color: black;
  width: 100%;
  height: 100%;
`;
