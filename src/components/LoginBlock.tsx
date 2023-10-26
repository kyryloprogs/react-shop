import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, FormikProps } from 'formik';
import { Grid, InputLabel, TextField, styled } from '@mui/material';
import { initialValuesLogin, validationSchemaLogin } from '../helpers/validationSchema';

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
    height: "503px"
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
    // padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#766ED3',
    borderColor: '#766ED3',
    width: "100%",
    padding: "11px 0 11px 0"
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
    email: string
    password: string
    rememberUser: boolean
}

const LoginBlock = (props: Props) => {

    
    return (
        <Box sx={style}>
            <Formik
                initialValues={initialValuesLogin}

                onSubmit={(values: FormValues, actions) => {
                    console.log("OK")
                }}
                validationSchema={validationSchemaLogin}
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
                                            SIGN IN
                                        </Typography>
                                    </h1>
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} sx={{ marginTop: "10px" }}>
                                    <InputLabel shrink htmlFor="email" sx={{ color: 'black' }}>
                                        Email address or mobile phone number
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        id="email"
                                        label="address@gmail.com"
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
                                        autoComplete='on'
                                        name="password"
                                        id="password"
                                        label="Password"
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

                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ marginTop: '17px', width: "100%", textAlign: 'center' }}
                                >
                                    <Checkbox sx={{ width: "24px", height: "22px" }}
                                        name="SomeName"
                                        value="SomeValue" />
                                    <label className="ml-[12px]">
                                        <Typography variant='rememberButton'>
                                            Remember me
                                        </Typography>
                                    </label>
                                </Grid>

                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ marginTop: '16px' }}
                                >
                                    <BootstrapButton
                                        type="submit"
                                        variant="contained"
                                        disableRipple
                                        disabled={isSubmitting}
                                    >
                                        Continue
                                    </BootstrapButton>
                                </Grid>

                                <div className="w-[488px] h-[22px] relative mt-[26px]">
                                    <div className="w-[236px] h-[22px] left-[126px] top-0 absolute text-center text-black text-lg font-normal font-['Inter']">Don't have an account yet?</div>
                                    <div className="w-[119px] h-[0px] left-0 top-[12px] absolute border-2 border-indigo-500"></div>
                                    <div className="w-[119px] h-[0px] left-[369px] top-[12px] absolute border-2 border-indigo-500"></div>
                                </div>

                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ marginTop: '20px' }}
                                >
                                    <BootstrapButtonRegister
                                        type="submit"
                                        variant="contained"
                                        disableRipple
                                        disabled={isSubmitting}
                                    >
                                        Create your Best Product account
                                    </BootstrapButtonRegister>
                                </Grid>

                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default LoginBlock;