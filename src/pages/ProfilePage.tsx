import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, FormikProps } from 'formik';
import { Avatar, Grid, InputLabel, TextField, styled } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { redirect, useNavigate } from 'react-router-dom';
import { updateProfile, validationSchemaUpdate } from '../helpers/validationSchema';

// Styles for the component
const style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: 'white',
    border: '1px solid white',
    borderRadius: '15px',
    boxShadow: 24,
    width: '1250px',
    minHeight: '800px',
};

// Styled button component with specific styles
const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    border: '1px solid',
    backgroundColor: '#766ED3',
    borderColor: '#766ED3',
    width: '100%',
    padding: '11px 0 11px 0',
});

// Styled button component for registration with specific styles
const BootstrapButtonRegister = styled(Button)({
    textTransform: 'none',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    backgroundColor: 'white',
    borderRadius: '7px',
    border: '1px solid rgba(0, 0, 0, 0.40)',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
    color: '#766ED3',
    width: '380px',
    margin: '0 auto',
    padding: '11px 0 11px 0',
});

// Interface for the form values
interface FormValues {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    avatar: string;
    getUpdates: boolean;
}

// React component for the login block
const ProfilePage = () => {
    const [serverError, setServerError] = useState<string>("");
    const [okStatus, setOkStatus] = useState<string>('');
    const [token, setToken] = useCookies(['bestproducts']);
    const [userData, setUserData] = useState<FormValues>(updateProfile);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from the server
                const { data } = await axios.get('http://127.0.0.1:4500/userdata', {
                    headers: {
                        Authorization: token.bestproducts,
                    },
                });
                setUserData(data);
            } catch (error) {
                console.error(error);
                history('/login');
            }
        };

        // Call the fetchData function on component mount
        fetchData();
    }, []);

    return (
        // Main container for the component
        <Box sx={style}>
            {/* Formik component for form management */}
            <Formik
                initialValues={userData}
                enableReinitialize
                onSubmit={async (values: FormValues, actions) => {
                    try {
                        console.log("!")
                        setServerError("");
                        // Make a POST request to update user data
                        const response = await axios.post('http://localhost:4500/userdata', values, {
                            headers: {
                                Authorization: token.bestproducts,
                            },
                        });

                        if (response.status === 201) {
                            setToken('bestproducts', response.data?.token || '');
                            setOkStatus('Data updated!');
                        } else {
                            // Set an error message for login failure
                            setServerError('Error login! Check your data.');
                        }
                    } catch (error) {
                        // Set an error message for login failure
                        setServerError('Error login! Check your data.');
                    }
                }}
                validationSchema={validationSchemaUpdate}
            >
                {(props: FormikProps<FormValues>) => {
                    const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;

                    return (
                        // Form container
                        <Form className="w-full">
                            {/* Grid container for layout */}
                            <Grid container spacing={2}>
                                {/* Display success status if available */}



                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <h1 className='w-full text-center mt-[24px]' >
                                        <Typography variant='modalHeader' sx={{ width: "100%" }}>
                                            Account Setting
                                        </Typography>
                                    </h1>
                                </Grid>

                                <Grid
                                    item
                                    lg={6} md={6} sm={6} xs={6}
                                    container
                                    justifyContent="space-around"
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={values.avatar}
                                        alt={values.avatar}
                                        sx={{ width: 380, height: 380 }}
                                    />
                                    <Grid item lg={10} md={10} sm={10} xs={10}
                                        sx={{ margin: "20px 0", display: "flex", justifyContent: "center" }}
                                    >
                                        <BootstrapButtonRegister
                                            type="submit"
                                            variant="contained"
                                            disableRipple
                                            disabled={isSubmitting}
                                        >
                                            Change Foto
                                        </BootstrapButtonRegister>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    lg={6} md={6} sm={6} xs={6}
                                    container
                                    justifyContent="space-around"
                                    alignItems="center"
                                >
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="name" sx={{ color: 'black' }}>
                                            First Name
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            id="name"
                                            label=""
                                            value={values.name}
                                            type="text"
                                            helperText={
                                                errors.name && touched.name
                                                    ? errors.name
                                                    : ''
                                            }
                                            error={
                                                errors.name && touched.name
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="lastName" sx={{ color: 'black' }}>
                                            Last Name
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="lastName"
                                            id="lastName"
                                            label=""
                                            value={values.lastName}
                                            type="text"
                                            helperText={
                                                errors.lastName && touched.lastName
                                                    ? errors.lastName
                                                    : ''
                                            }
                                            error={
                                                errors.lastName && touched.lastName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="email" sx={{ color: 'black' }}>
                                            Email address
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            id="email"
                                            label=""
                                            value={values.email}
                                            type="text"
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : ''
                                            }
                                            error={
                                                errors.email && touched.email
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="phone" sx={{ color: 'black' }}>
                                            Phone
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="phone"
                                            id="phone"
                                            label=""
                                            value={values.phone}
                                            type="text"
                                            helperText={
                                                errors.phone && touched.phone
                                                    ? errors.phone
                                                    : ''
                                            }
                                            error={
                                                errors.phone && touched.phone
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="password" sx={{ color: 'black' }}>
                                            New password
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="password"
                                            id="password"
                                            label=""
                                            value={values.password}
                                            type="password"
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : ''
                                            }
                                            error={
                                                errors.password && touched.password
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                        <InputLabel shrink htmlFor="confirmPassword" sx={{ color: 'black' }}>
                                            Confirm password
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            label=""
                                            value={values.confirmPassword}
                                            type="password"
                                            helperText={
                                                errors.confirmPassword && touched.confirmPassword
                                                    ? errors.confirmPassword
                                                    : ''
                                            }
                                            error={
                                                errors.confirmPassword && touched.confirmPassword
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10}
                                        sx={{ marginTop: '17px', width: "100%", textAlign: 'center' }}
                                    >
                                        <Checkbox sx={{ width: "24px", height: "22px" }}
                                            name="forever"
                                            value={values.getUpdates} />
                                        <label className="ml-[12px]">
                                            <Typography variant='rememberButton'>
                                                Get updates on our shop news and promotions
                                            </Typography>
                                        </label>
                                    </Grid>
                                    {serverError && (
                                        <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: '10px', color: 'red' }}>
                                            <Typography variant="body2">{serverError}</Typography>
                                        </Grid>
                                    )}

                                    {okStatus && (
                                        <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: '10px', color: 'red' }}>
                                            <Typography variant="body2" sx={{ color: 'green' }}>{okStatus}</Typography>
                                        </Grid>
                                    )}

                                    <Grid item lg={10} md={10} sm={10} xs={10}
                                        sx={{ marginTop: '16px' }}
                                    >
                                        <BootstrapButton
                                            type="submit"
                                            variant="contained"
                                            disableRipple
                                        >
                                            Continue
                                        </BootstrapButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik >
        </Box >
    )
}

export default ProfilePage;

