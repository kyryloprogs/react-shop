
import { ReactComponent as BestProductsLogo } from "../assets/bg-logo.svg";
import { ReactComponent as CartLogo } from "../assets/cart-logo.svg";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SideBar from "./SideBar";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    },
    height: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    // paddingRight: "10px",
    width: "70px",
    height: "58px",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
    // border: "3px solid #EAEAEA",
    borderRadius: "16px 0px 0px 16px",

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    fontSize: "20px",

    '& .MuiInputBase-input': {
      padding: theme.spacing(2, 2, 2, 0),
      
      paddingLeft: `86px`,
      width: '490px',
    },
  }));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl
    ] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ backgroundColor: "#FFFFFF" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>

                    <CartLogo className="w-[85px] h-[85px]" />
                    <BestProductsLogo />

                    <Box sx={{ flexGrow: 1 }} />
                    {/* <div className="w-[58px] h-[58px]">
                        <SearchIcon />
                    </div> */}
                    {/* #FBF8F8 */}
                
                    <Search sx={{ height: "58px", width: "490px", background: "#FBF8F8", borderRadius: "18px 0 0 18px" }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase 
                            placeholder="Search"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle style={{ color: '#766ED3' }} sx={{ width: "62px", height: "62px" }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <SideBar />
        </Box>
    );
}
