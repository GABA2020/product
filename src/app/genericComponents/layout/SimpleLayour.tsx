import React from 'react';
import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-self: center;
`;

const _Container = styled.div`
  display: flex;
  flex-direction: column;

  ${props => props.theme.rules.narrowWidth}
`;
/* Use this for creating the narrow width effect on your pages layours */

export const Container = (props: { children: any }) => (
  <_Container>
    <ContentContainer>
      {props.children}
    </ContentContainer>
  </_Container>
);
