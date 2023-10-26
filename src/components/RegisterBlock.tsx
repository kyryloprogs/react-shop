import React from 'react'
import Box from '@mui/material/Box';

type Props = {}

const style = {
    // position: 'absolute' as 'absolute',
    display: 'flex',
    flexDirection: "row",
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    marginLeft: "87px",
    // marginLeft: "10px",
    width: "577px",
    height: "697px",
    borderRadius: "15px",
    borderColor: "none"
};

const RegisterBlock = (props: Props) => {
    return (
        <Box sx={style}>
            {/* <form>

            </Form> */}
        </Box>
    )
}

export default RegisterBlock;