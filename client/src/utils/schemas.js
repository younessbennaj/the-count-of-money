//Shema for form validation with Yup
import * as Yup from 'yup';

export const AuthenticationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});