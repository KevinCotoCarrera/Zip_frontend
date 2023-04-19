import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const SignupSchema = Yup.object().shape({
    username: Yup.string().min(5,'Please provide an username with at least 5 characters').max(30, 'Please provide an username with less than 30 characters').required('Username is required'),
    password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
        passwordRules,
        "Pelase enter a stronger password"
      ),
  confirmPassword: Yup
    .string()
    .required('Confirm your password')
    .oneOf([Yup.ref("password")], "Passwords must match")
})