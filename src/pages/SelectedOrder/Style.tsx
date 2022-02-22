import styled from 'styled-components';

export const BookingCard = styled.div`
  background: ${(props) => props.theme.lessDarkGray};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
  height: 512px;
  border: 2.5px dashed #2a2a2a;
  box-sizing: border-box;
  border-radius: 16px;
`;

export const ImageCardContainer = styled.div`
  object-fit: fill;
  border-radius: 16px;
  :not(:last-child) {
    margin-right: 24px;
  }
`;

export const ImageCardImg = styled.img`
  object-fit: fill;
  user-select: none;
  max-height: 450px;
`;

export const UploadStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ComboButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: space-between;

    button {
      margin-top: 10px;
    }
  }
`;
