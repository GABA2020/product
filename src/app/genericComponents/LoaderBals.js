import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function LoaderBals() {
  return (
    <LoadBal>
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
    </LoadBal>
  );
}

const circle = keyframes`
0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
`;
const shadow = keyframes`
0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
`;

const LoadBal = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(#131a4f, #050b36);

  .wrapper {
    width: 200px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: #eeaa35;
    left: 15%;
    transform-origin: 50%;
    animation: ${circle} 0.5s alternate infinite ease;
  }
  ​ ​.circle:nth-child(2) {
    right: 20px;
    left: auto;
    animation-delay: 0.2s;
    background-color: #7280da;
  }
  .circle:nth-child(3) {
    left: auto;
    right: 15%;
    background-color: #59b88d;
    animation-delay: 0.3s;
  }
  .circle:nth-child(4) {
    left: auto;
    right: -80px;
    background-color: #7280da;
    animation-delay: 0.2s;
  }
  .shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: ${shadow} 0.5s alternate infinite ease;
  }
  ​ .shadow:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }
  .shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
  .shadow:nth-child(6) {
    left: auto;
    right: -80px;
    animation-delay: 0.2s;
  }
`;
