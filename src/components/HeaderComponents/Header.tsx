
import { ReactComponent as BestProductsLogo } from "../../assets/bg-logo.svg";
import { ReactComponent as CartLogo } from "../../assets/cart-logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import * as React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./HeaderStyles"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SideBar from "../SideBar/SideBar";

import { useNavigate } from "react-router-dom";
import { Avatar, List, ListItemAvatar, ListItemButton, Paper, Popover } from "@mui/material";
import { useCookies } from 'react-cookie';
import instance from "../../config/axios";


type SearchType = {
    result: [
        {
            text: string
        }
    ],
    products: [
        {
            id: number,
            name: string,
            main_img: string
        }
    ]
}





export default function PrimarySearchAppBar() {
    const [
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl
    ] = React.useState<null | HTMLElement>(null);
    const [cookies] = useCookies(['bestproducts']);
    const [avatar, setAvatar] = React.useState<string>();
    const [searchValue, setSearchValue] = React.useState<string>();
    const [searchResults, setSearchResults] = React.useState<SearchType>();

    const history = useNavigate();
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleChangeEvent = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchValue(inputValue);
        const reqResult = await instance.get('/searchBase', {
            params: {
                text: searchValue
            }
        })
        console.log(reqResult)
        const searchData: SearchType = {
            result: reqResult.data.result,
            products: reqResult.data.products
        };

        setSearchResults(searchData)
        setIsOpen(true);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitted:', searchValue);
        const res = await instance.post(`/searchBase?text=${searchValue}`)
        if (typeof searchValue === 'string') {
            history(`/search/?query=${searchValue}`)
        }
        console.log(res)
        setIsOpen(false);
    };

    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await instance.get("http://127.0.0.1:4500/userdata", {
                headers: {
                    Authorization: cookies.bestproducts
                }
            });
            setAvatar(data.data.avatar);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        <Box sx={{ flexGrow: 1, position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)", 
                    zIndex: 999, 
                }}
            />
            <AppBar sx={{ backgroundColor: "#FFFFFF" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>

                    <CartLogo className="w-[85px] h-[85px]" />
                    <BestProductsLogo />

                    <Box sx={{ flexGrow: 1 }} />

                    <form onSubmit={handleSubmit}>
                        <Search sx={{ height: "58px", background: "#FBF8F8" }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{ "aria-label": "search" }}
                                onChange={handleChangeEvent}
                            />

                            <Popover
                                onClose={() => setIsOpen(false)}
                                open={isOpen}
                                // anchorEl={anchorEl}
                                disableAutoFocus
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                                sx={{ top: "-20px", }}
                            >
                                {searchResults?.result && (
                                    <Paper sx={{ width: "490px", borderTop: "1px solid rgba(82, 79, 94, 0.50)", borderRadius: 0 }}>
                                        <List>

                                            {searchResults?.result.slice(0, 3).map((suggestion, index) => (
                                                <ListItemButton key={index} onClick={() => {
                                                    history(`/search/?query=${suggestion.text}`)
                                                    setIsOpen(false);
                                                }}>
                                                    {suggestion.text}
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Paper>
                                )}

                                <Paper sx={{ width: "490px", borderTop: "1px solid rgba(82, 79, 94, 0.50)", borderRadius: 0 }}>
                                    <List>
                                        {searchResults?.products.map((product, index) => (
                                            <ListItemButton
                                                key={index}
                                                onClick={() => history(`/products/${product.id}`)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={product.main_img}
                                                        alt={product.name}
                                                        sx={{ width: 50, height: 50, borderRadius: 0 }}
                                                    />
                                                </ListItemAvatar>
                                                {product.name}
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Paper>
                            </Popover>

                        </Search>
                    </form>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={() => history(`/profile`)}
                            color="inherit"
                        >
                            {
                                avatar ? (
                                    <Avatar
                                        src={avatar}
                                        alt={avatar}
                                        sx={{ width: "62px", height: "62px" }} 
                                    />
                                ) : (
                                    <AccountCircle style={{ color: '#766ED3' }} sx={{ width: "62px", height: "62px" }} />
                                )
                            }

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
            <SideBar />
        </Box>
    );
}
