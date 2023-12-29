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
    priceOutside?: React.CSSProperties;
    productStatsInside?: React.CSSProperties;
    overheadFont?: React.CSSProperties;
    saleFont?: React.CSSProperties;
    productCard?: React.CSSProperties;
    buttonLower?: React.CSSProperties;
    filterTitle?: React.CSSProperties;
    description?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    productTitle?: React.CSSProperties;
    productStats?: React.CSSProperties;
    rememberButton?: React.CSSProperties;
    modalHeader?: React.CSSProperties;
    priceInside?: React.CSSProperties;
    itemButton?: React.CSSProperties;
    priceOutside?: React.CSSProperties;
    productStatsInside?: React.CSSProperties;
    overheadFont?: React.CSSProperties;
    saleFont?: React.CSSProperties;
    productCard?: React.CSSProperties;
    buttonLower?: React.CSSProperties;
    filterTitle?: React.CSSProperties;
    description?: React.CSSProperties;
    productSettings?: React.CSSProperties;
    sideBarName?: React.CSSProperties;
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
    priceOutside: true;
    productStatsInside: true;
    overheadFont: true;
    saleFont: true;
    productCard: true;
    buttonLower: true;
    filterTitle: true;
    description: true;
    productSettings: true;
    sideBarName: true;
    // h3: false;
  }
}


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
    buttonLower: {
      color: "#FFF",
      textAlign: "center",
      fontFamily: "Inter",
      fontSize: 22,

      fontWeight: 400,
      wordWrap: "break-word"
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
    priceOutside: {
      color: "#000",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      fontSize: 28,
      wordWrap: "break-word"
    },
    itemButton: {
      color: "#000",
      textAlign: "center",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      fontSize: 24,
    },
    productStatsInside: {
      color: 'black',
      fontSize: '24px',
      fontFamily: 'Inter',
      fontWeight: 400,
      wordWrap: 'break-word'
    },
    overheadFont: {
      color: "#171313",
      fontSize: "20px",
      fontFamily: "Inter",
      fontWeight: "400",
      wordWrap: "break-word"
    },
    saleFont: {
      color: "#524F5E",
      fontSize: "20px",
      fontFamily: "Inter",
      fontWeight: 400,
      textDecoration: "line-through",
      wordWrap: "break-word"
    },
    productCard: {
      color: "black",
      fontSize: "20px",
      fontFamily: "Inter",
      fontWeight: 400,
      wordWrap: "break-word"
    },
    filterTitle: {
      // Price
      color: "#524F5E",
      fontSize: "22px",
      fontFamily: "Inter",
      fontWeight: 600,
      wordWrap: "break-word"
    },
    description: {
      color: "#000",
      fontFamily: "Inter",
      fontSize: 24,
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0.84
    },
    productSettings: {
      color: "#000",
      fontFamily: "Inter",
      fontSize: 20,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal"
    },
    sideBarName: {
      color: '#524F5E',
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: '400',
      wordWrap: 'break-word'
    }
  },
});

export default theme;
