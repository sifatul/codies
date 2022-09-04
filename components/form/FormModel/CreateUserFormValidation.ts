import {
    getCodepenUrlRegex,
    getGithubUrlRegex,
    getHackerrankUrlRegex,
    getLeetcodeUrlRegex,
    getLinkedInUrlRegex,
    getEmailRegex,
} from './../../../helper/regex';
import * as Yup from 'yup';
import CreateUserFormModel from './CreateUserFormModel';

const {
    formField: {
        firstName,
        lastName,
        email,
        gender,
        userName,
        password,
        linkedin_url,
        leetcode_url,
        github,
        hackerrank_url,
        codepen_url,
        codeforces_url,
        medium_url,
    },
} = CreateUserFormModel;

export default [
    Yup.object().shape({
        [firstName.name]: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name is required'),
        [lastName.name]: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last name is required'),
        [email.name]: Yup.string()
            .email('Invalid email')
            .matches(getEmailRegex, 'Invalid email')
            .required('Email is required'),
        [password.name]: Yup.string().required().min(8, 'Minimum 8 character long'),
        [userName.name]: Yup.string().required('Username is required'),
        [gender.name]: Yup.string().nullable().required('Gender is Required'),
    }),
    Yup.object().shape({
        [linkedin_url.name]: Yup.string().matches(getLinkedInUrlRegex, 'Invalid linkedIn url'),
        [github.name]: Yup.string().matches(getGithubUrlRegex, 'Invalid github url'),
        [leetcode_url.name]: Yup.string().matches(
            getLeetcodeUrlRegex,
            'Invalid leetcode profile url'
        ),
        [hackerrank_url.name]: Yup.string().matches(
            getHackerrankUrlRegex,
            'Invalid hackerrank url'
        ),
        [codepen_url.name]: Yup.string().matches(getCodepenUrlRegex, 'Invalid codepen url'),
        [medium_url.name]: Yup.string().url('Invalid medium url'),
        [codeforces_url.name]: Yup.string().url('Invalid url'),
    }),
];
