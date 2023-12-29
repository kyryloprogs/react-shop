import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';
import Icons from '../UtilsComponents/Icons';
import Drawer from './SideBarDrawer';
import instance from '../../config/axios';
import { Link, useLocation } from 'react-router-dom';

const routes = {
  Home: '/',
  Category: '/category',
  Favorites: '/favorites',
};

type SearchRes = {
  name: string;
  result: Array<{
    id: number;
    full_name: string;
  }>;
};

const SideBar: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [subcategories, setSubcategories] = useState<SearchRes | undefined>();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, value: number, name: string) => {
    try {
      instance
        .get(`/categories/${value}`)
        .then((response) => {
          setSubcategories({ ...response.data, name });
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }

    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Drawer variant="permanent" open={open} onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
      <List sx={{ marginTop: '120px' }}>
        <Link to={routes.Home} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
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
              <ListItemText primary={<Typography variant="sideBarName">Home</Typography>} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={routes.Favorites} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem key="Favorites" disablePadding sx={{ display: 'block' }}>
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
              <ListItemText primary={<Typography variant="sideBarName">Favorites</Typography>} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={routes.Category} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem key="Category" disablePadding sx={{ display: 'block' }} className="main-multitag">
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
                <Icons.SvgIconCategory active={pathname.startsWith(routes.Category)} />
              </ListItemIcon>
              <ListItemText primary={<Typography variant="sideBarName">Category</Typography>} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Link to={`${routes.Category}/cars`} style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem key="Cars" disablePadding sx={{ display: 'block' }} className="main-hidden">
          <ListItemButton
            onMouseEnter={(e) => handleMenuOpen(e, 1, 'cars')}
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
              <Icons.SvgIconCar active={pathname === `${routes.Category}/cars`} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="sideBarName">Cars</Typography>} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={`${routes.Category}/electronics`} style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem key="Electronics" disablePadding sx={{ display: 'block' }} className="main-hidden">
          <ListItemButton
            onMouseEnter={(e) => handleMenuOpen(e, 2, 'electronics')}
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
              <Icons.SvgIconPC active={pathname === `${routes.Category}/electronics`} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="sideBarName">Electronics</Typography>} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={`${routes.Category}/clothes`} style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem key="Clothes" disablePadding sx={{ display: 'block' }} className="main-hidden">
          <ListItemButton
            onMouseEnter={(e) => handleMenuOpen(e, 3, 'clothes')}
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
              <Icons.SvgIconClothes active={pathname === `${routes.Category}/clothes`} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="sideBarName">Clothes</Typography>} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Link>
      <div className="shadow-none">
        <Popover
          open={Boolean(menuAnchor) && Boolean(subcategories?.result.length)}
          anchorEl={menuAnchor}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          sx={{ left: 250 }}
          slotProps={{ paper: { style: { boxShadow: 'none' } } }}
        >
          <div className="p-4 h-[300px] flex flex-col border-[3px] border-[#766ED3] rounded-[20px] overflow-hidden shadow-none transform-none">
            {subcategories?.result.map((e) => (
              <Link to={`${routes.Category}/${subcategories.name}/${e.id}`} key={e.id}>
                <div className="block w-full h-[50px]">
                  <Typography variant="sideBarName">{e.full_name}</Typography>
                </div>
              </Link>
            ))}
          </div>
        </Popover>
      </div>
    </Drawer>
  );
};

export default SideBar;
