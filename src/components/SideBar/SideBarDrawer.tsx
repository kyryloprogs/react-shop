import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 360;

const openedMixin = (theme: Theme): CSSObject => ({
    marginBottom: "90px",
    marginTop: "90px",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),

    overflowX: 'hidden',
    ".Mui-selected": {
        backgroundColor: "#766ED3",
        color: "white",
        "&:hover": {
            backgroundColor: "#766ED3"
        },

    },
    ".MuiListItemButton-root": {
        margin: "0 auto",
        borderRadius: "10px",
        width: '335px',
    },
    ".main-hidden": {
        display: "block",
        width: "310px",
        marginLeft: "40px"
    },
    ".main-multitag": {
        background: "none"
    }
});

const closedMixin = (theme: Theme): CSSObject => ({
    marginBottom: "90px",
    marginTop: "90px",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '84px',
    // [theme.breakpoints.up('sm')]: {
    //     width: `calc(${theme.spacing(8)} + 1px)`,
    // },

    ".Mui-selected": {
        backgroundColor: "#766ED3",
        color: "white",

    },
    ".MuiListItemButton-root": {
        margin: "0 auto",
        borderRadius: "10px",
        width: '65px',
    },
    ".main-hidden": {
        display: "none"
    },

});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        
        marginTop: "64px",
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),



    }),
);


export default Drawer;