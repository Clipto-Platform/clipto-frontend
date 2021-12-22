export type Color = string;
export interface Colors {
  // palette
  white: Color;
  black: Color;
  blackPure: Color;
  lightGray: Color;
  gray: Color;
  darkGray: Color;
  twitterBlue: Color;
  green: Color;
  yellow: Color;
  red: Color;
  // semantic
  primary: Color;
  secondary: Color;
  border: Color;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    breakpoints: {
      upToExtraSmall: number;
      upToSmall: number;
      upToMedium: number;
      upToLarge: number;
      upToExtraLarge: number;
    };
    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
      upToExtraLarge: ThemedCssFunction<DefaultTheme>;
    };
    grids: {
      sm: number;
      md: number;
      lg: number;
    };
    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
