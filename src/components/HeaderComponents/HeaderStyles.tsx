import { styled, alpha } from "@mui/material/styles";
import { InputBase, } from "@mui/material";
export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(25),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
    },
    height: "100%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    width: "70px",
    height: "58px",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: "16px 0px 0px 16px",

}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    fontSize: "20px",

    '& .MuiInputBase-input': {
        padding: theme.spacing(2, 2, 2, 0),
        paddingLeft: `86px`,
        width: '460px',
    },
}));