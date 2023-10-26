import * as React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    productTitle: React.CSSProperties;
    productStats?: React.CSSProperties;
    rememberButton?: React.CSSProperties;
    modalHeader?: React.CSSProperties;
    priceInside?: React.CSSProperties;
    itemButton?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    productTitle?: React.CSSProperties;
    productStats?: React.CSSProperties;
    rememberButton?: React.CSSProperties;
    modalHeader?: React.CSSProperties;
    priceInside?: React.CSSProperties;
    itemButton?: React.CSSProperties;
  }
}
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    productTitle: true;
    productStats: true;
    rememberButton: true;
    modalHeader: true;
    priceInside: true;
    itemButton: true;
    // h3: false;
  }
}

// const theme = createTheme({
//   // typography: {

//   //   productTitle: {
//   //     fontFamily: [
//   //       'Inter',
//   //     ].join(','),
//   //     fontSize: 30
//   //   }

//   // },
//   typography: {
//     poster: {
//       fontSize: 64,
//       color: 'red',
//     },
//     // Disable h3 variant
//     h3: undefined,
//   },
// });

const theme = createTheme({
  typography: {
    productTitle: {
      fontSize: 32,
      fontFamily: "Inter",
      color: "#171313",
      fontStyle: "normal",
      fontWeight: 600,
    },
    productStats: {
      fontSize: 24,
      fontFamily: "Inter",
      color: "#000000",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal"
    },
    rememberButton: {
      color: "#766ED3",
      fontFamily: "Inter",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal"
    },
    button: {
      color: "#FFF",
      textAlign: "center",
      fontFamily: "Inter",
      fontSize: 22,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal"
    },
    modalHeader: {
      color: "#435C6B",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      textShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
      fontSize: 40,
    },
    priceInside: {
      color: "#000",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      fontSize: 40,
    },
    itemButton: {
      color: "#000",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      fontSize: 24,
    }
  },
});

export default theme;
