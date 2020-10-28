import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  @mixin for-size($range) {
    $phone-upper-boundary: 600px;
    $tablet-portrait-upper-boundary: 900px;
    $tablet-landscape-upper-boundary: 1200px;
    $desktop-upper-boundary: 1800px;
  
    @if $range == phone-only {
      @media (max-width: #{$phone-upper-boundary - 1}) { @content; }
    } @else if $range == tablet-portrait-up {
      @media (min-width: $phone-upper-boundary) { @content; }
    } @else if $range == tablet-landscape-up {
      @media (min-width: $tablet-portrait-upper-boundary) { @content; }
    } @else if $range == desktop-up {
      @media (min-width: $tablet-landscape-upper-boundary) { @content; }
    } @else if $range == big-desktop-up {
      @media (min-width: $desktop-upper-boundary) { @content; }
    }
  }
`;
