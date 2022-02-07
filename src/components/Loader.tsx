import React from 'react';
import ReactLoading from 'react-loading';
import styled, { CSSProperties } from 'styled-components';

const LoaderDiv = styled.div`
  width:200px;
  height:200px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Loader = () => {
  return (
    <LoaderDiv>
      <ReactLoading type={'spin'} color="#fff" height={75} width={75} />
    </LoaderDiv>
  );
};

export { Loader };
