import * as React from 'react';

import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material/';

import { List } from '@mui/material';
import Icons from '../components/Icons';
import Drawer from './SideBarDrawer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Fonts';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useLocation
} from "react-router-dom";


const routes = {
    Home: "/",
    Category: "/category",
    Favorites: "/favorites"
};

const SideBar = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (

        <Drawer variant="permanent"
            open={open}
            onMouseEnter={handleDrawerOpen}
            onMouseLeave={handleDrawerClose}
        >


            <List sx={{ marginTop: "120px" }}>
                <Link to={routes.Home} style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem key={"Home"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            selected={pathname === routes.Home}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icons.SvgIconHome active={pathname === routes.Home} />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={routes.Favorites} style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem key={"Favorites"} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            selected={pathname === routes.Favorites}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icons.SvgIconFavorite active={pathname === routes.Favorites} />

                            </ListItemIcon>
                            <ListItemText primary={"Favorites"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={routes.Category} style={{ textDecoration: 'none', color: 'black' }} >
                    <ListItem key={"Category"} disablePadding sx={{ display: 'block' }} className='main-multitag'> 

                        <ListItemButton 
                            selected={pathname.startsWith(routes.Category)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >

                                <Icons.SvgIconCategory  active={pathname.startsWith(routes.Category)} />

                            </ListItemIcon>
                            <ListItemText primary={"Category"} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Link to={`${routes.Category}/cars`} style={{ textDecoration: 'none', color: 'black' }} >
                <ListItem key={"Cars"} disablePadding sx={{ display: 'block' }} className='main-hidden'>

                    <ListItemButton
                    selected={pathname === `${routes.Category}/cars`}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                        <Icons.SvgIconCar active={pathname === `${routes.Category}/cars`}/>


                        </ListItemIcon>
                        <ListItemText primary={"Cars"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to={`${routes.Category}/electronics`} style={{ textDecoration: 'none', color: 'black' }} >
                <ListItem key={"Electronics"} disablePadding sx={{ display: 'block' }} className='main-hidden'>

                    <ListItemButton
                    selected={pathname === `${routes.Category}/electronics`}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                        <Icons.SvgIconPC active={pathname === `${routes.Category}/electronics`}/>


                        </ListItemIcon>
                        <ListItemText primary={"Electronics"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to={`${routes.Category}/clothes`} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem key={"Clothes"} disablePadding sx={{ display: 'block' }} className='main-hidden'>

                    <ListItemButton
                    selected={pathname === `${routes.Category}/clothes`}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                        <Icons.SvgIconClothes active={pathname === `${routes.Category}/clothes`}/>


                        </ListItemIcon>
                        <ListItemText primary={"Clothes"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </Link>
            
            {/* <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Drawer>

    )
}

export default SideBar;