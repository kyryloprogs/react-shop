import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, FormikProps } from 'formik';
import { Grid, InputLabel, TextField, styled } from '@mui/material';
import { initialValuesLogin, initialValuesRegister, validationSchemaLogin, validationSchemaRegister } from '../helpers/validationSchema';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    border: '1px solid white',
    borderRadius: "15px",
    boxShadow: 24,
    width: "577px",
    minHeight: "503px"
};


const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    border: '1px solid',
    backgroundColor: '#766ED3',
    borderColor: '#766ED3',
    width: "100%",
    padding: "11px 0 11px 0",
    marginBottom: "30px"
});

const BootstrapButtonRegister = styled(Button)({
    textTransform: 'none',
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    // padding: '6px 12px',
    backgroundColor: 'white',
    borderRadius: "7px",
    border: "1px solid rgba(0, 0, 0, 0.40)",
    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.15)",
    color: "#766ED3",
    width: "100%",
    padding: "11px 0 11px 0"
});

interface FormValues {
    name: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    email: string,
    getUpdates: boolean
};

const RegisterBlock = (props: Props) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(['bestproducts']);
    const history = useNavigate();

    return (
        <Box sx={style}>
            <Formik
                initialValues={initialValuesRegister}
                onSubmit={async (values: FormValues, actions) => {
                    try {
                        setServerError(null);
                        console.log(values)
                        const response = await axios.post('http://localhost:4500/users', values,)
                        console.log(response);
                        if (response.status === 201) {
                            setCookie('bestproducts', response.data?.token || "")
                            history('/')
                        } else {
                            setServerError('Error login! Check your data.');
                        }
                    } catch (error) {
                        setServerError('Error login! Check your data.');
                    }
                }}
                validationSchema={validationSchemaRegister}
            >
                {(props: FormikProps<FormValues>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                        setFieldValue
                    } = props

                    return (
                        <Form>
                            <Grid
                                container
                                justifyContent="space-around"
                                alignItems="center"
                            >

                                <Grid item lg={10} md={10} sm={10} xs={10} >
                                    <h1 className='w-full text-center mt-[24px]' >
                                        <Typography variant='modalHeader' sx={{ width: "100%" }}>
                                            SIGN UP
                                        </Typography>
                                    </h1>
                                </Grid>
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
                                <Grid
                                    item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: '10px' }}
                                    className="textField"
                                >
                                    <InputLabel shrink htmlFor="password" sx={{ color: 'black' }}>
                                        Password
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
                                                ? 'Please enter password.' : ""
                                        }
                                        error={
                                            errors.password && touched.password ? true : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid
                                    item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: '10px' }}
                                    className="textField"
                                >
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
                                                ? 'Please enter password.' : ""
                                        }
                                        error={
                                            errors.confirmPassword && touched.confirmPassword ? true : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ marginTop: '17px', width: "100%", textAlign: 'center' }}
                                >
                                    <Checkbox sx={{ width: "24px", height: "22px" }}
                                        name="getUpdates"
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
                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ marginTop: '16px' }}
                                >
                                    <BootstrapButton
                                        type="submit"
                                        variant="contained"
                                        disableRipple
                                        disabled={isSubmitting}
                                    >
                                        Create Account
                                    </BootstrapButton>
                                </Grid>

                              

                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default RegisterBlock;