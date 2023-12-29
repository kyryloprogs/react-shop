import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCookies } from 'react-cookie'
import LoginBlock from '../components/LoginBlock';
import RegisterBlock from '../components/RegisterBlock';

const style = {
    position: 'absolute' as 'absolute',
    //   display: 'flex',
    //   flexDirection: "row",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 0,
    //   width: 400,
    //   bgcolor: 'background.paper',
    // border: '0px',
    //   boxShadow: 24,
    //   p: 4,
};

const LoginPage = () => {
    const [cookies, setCookie] = useCookies(['bestproducts']);

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const data = sessionStorage.getItem('session');
        if (!cookies.bestproducts) {
            setOpen(true);
        }
    }, [])

    return (

        <Box sx={style}>
            <div className='flex flex-row gap-[87px]'>
                <LoginBlock />
                <RegisterBlock />
            </div>


        </Box>


    )
}

export default LoginPage;