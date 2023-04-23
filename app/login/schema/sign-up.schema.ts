import * as Yup from 'yup'


export const SignupSchema = Yup.object().shape({
    username: Yup.string().min(5,'Your username has at least 5 characters').max(30, 'Your username has less than 30 characters').required('Username is required'),
    password: Yup
    .string()
    .required('Please Enter your password')
  
})