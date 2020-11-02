import React from 'react';
import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const ContentContainer: any = styled.div`
  display: flex;
  align-self: center;
  margin-top: 50px;
  ${props => props.theme.rules.narrowWidth}
  ${(props: any) => props.justify ? `justify-content: ${props.justify};` : ''}
`;

const _Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/* Use this for creating the narrow width effect on your pages layouts */
export const Container = (props: { children: any, justify?: string }) => (
  <_Container>
    <ContentContainer justify={props.justify}>
      {props.children}
    </ContentContainer>
  </_Container>
);
