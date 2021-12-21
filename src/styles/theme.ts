/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, DefaultTheme } from 'styled-components';

import type { Colors } from './styled';

export const MAX_CONTENT_WIDTH = 1130;
export const MAX_CONTENT_WIDTH_PX = `${MAX_CONTENT_WIDTH}px`;

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1500,
};

export type AvailableBreakpoints = keyof typeof MEDIA_WIDTHS;

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = '#FFFFFF';
const blackPure = '#000000';

const black = '#040404';

export const colors: Colors = {
  // Palette
  white,
  black,
  blackPure,
  lightGray: '#B3B3B3',
  gray: '#686868',
  darkGray: '0E0E0E',
  twitterBlue: '#1DA1F2',
  green: '#1DB954',
  yellow: '#EDE641',
  red: '#FF6868',
  // Semantic colors
  primary: white,
  secondary: '#888F96',
  border: '#2A2A2A',
};

export const theme: DefaultTheme = {
  ...colors,

  grids: {
    sm: 8,
    md: 12,
    lg: 24,
  },

  // media queries
  mediaWidth: mediaWidthTemplates,

  breakpoints: MEDIA_WIDTHS,

  // css snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `,
};
