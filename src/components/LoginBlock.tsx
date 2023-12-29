import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, FormikProps } from 'formik';
import { Grid, InputLabel, TextField, styled } from '@mui/material';
import { initialValuesLogin, validationSchemaLogin } from '../helpers/validationSchema';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {}

const style = {
    display: 'flex',
    flexDirection: "row",
    bgcolor: 'white',
    border: '1px solid white',
    borderRadius: "15px",
    boxShadow: 24,
    width: "577px",
    minHeight: "503px",
    maxHeight: "530px"
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
    const [serverError, setServerError] = useState<string | null>(null);
    const [cookies, setCookie] = useCookies(['bestproducts']);
    const history = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:4500/validate', {
            token: cookies.bestproducts
        },)
            .then(e => e.data && history("/"))
            .catch(e => console.log(e));
    }, [])
    return (
        <Box sx={style}>
            <Formik
                initialValues={initialValuesLogin}
                onSubmit={async (values: FormValues, actions) => {
                    try {
                        setServerError(null);
                        const response = await axios.post('http://localhost:4500/login', values,)
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
                                        name="forever"
                                        value={values.rememberUser} />
                                    <label className="ml-[12px]">
                                        <Typography variant='rememberButton'>
                                            Remember me
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
                                        Continue
                                    </BootstrapButton>
                                </Grid>

                                <div className="w-[488px] h-[22px] relative mt-[26px]">
                                    <div className="w-[236px] h-[22px] left-[126px] top-0 absolute text-center text-black text-lg font-normal font-['Inter']">Don't have an account yet?</div>
                                    <div className="w-[119px] h-[0px] left-0 top-[12px] absolute border-2 border-indigo-500"></div>
                                    <div className="w-[119px] h-[0px] left-[369px] top-[12px] absolute border-2 border-indigo-500"></div>
                                </div>

                                <Grid item lg={10} md={10} sm={10} xs={10}
                                    sx={{ margin: "20px 0" }}
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