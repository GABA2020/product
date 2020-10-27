/**
 * inside styled component styled, you can receivve this values by doing ${props => props.theme.PROPERTY}
 * Note: add any style constant that you need
 */

export default {
  color: {
    primary: 'rgb(0, 101, 242)',
    gabaYellow: '#EEAA35',
    softYellow: 'rgba(238, 170, 53, 0.11)',
    white: '#FFFFFF',
    softGray: '#F9F9F9',
    darkBlue: '#111741',
    softPurple: 'rgba(114, 128, 219, 0.22)'
  },
  breakpoint: {
    phone: '@include for-size(phone-only)',
    portraitTablet: '@include for-size(tablet-portrait-up)',
    landscapeTablet: '@include for-size(tablet-landscape-up)',
    desktop: '@include for-size(desktop-up)',
    bigDesktop: '@include for-size(big-desktop-up)'
  }
};
