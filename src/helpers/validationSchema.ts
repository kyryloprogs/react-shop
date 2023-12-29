import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().required('Please enter email or phone number'),
    password: Yup.string().required('Please enter your password'),
    rememberUser: Yup.boolean()
});

export const validationSchemaUpdate= Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    lastName: Yup.string().required('Please enter your last name'),
    password: Yup.string().matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
        'Please valid password. One uppercase, one lowercase, one special character. Minimum 8 symbols.'
    ),
    confirmPassword: Yup.string()
        // .required('Required')
        .test('password-match', 'Password must match', function (value) {
            return this.parent.password === value;
        }),
    email: Yup.string().email().required('Enter a valid email'),
    getUpdates: Yup.boolean(),
    avatar: Yup.string(),
    phone: Yup.string().matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        'Please valid phone number.'
    )
});


export const validationSchemaRegister = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    lastName: Yup.string().required('Please enter your last name'),
    password: Yup.string().matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
        'Please valid password. One uppercase, one lowercase, one special character. Minimum 8 symbols.'
    ).required('Please valid password.'),
    confirmPassword: Yup.string()
        .required('Required')
        .test('password-match', 'Password must match', function (value) {
            return this.parent.password === value;
        }),
    email: Yup.string().email().required('Enter a valid email'),
    getUpdates: Yup.boolean()
});

export const initialValuesRegister = {
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    getUpdates: false
};

export const initialValuesLogin = {
    email: '',
    password: '',
    rememberUser: false
};


export const updateProfile = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    getUpdates: false,
    avatar: '',
};
