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

export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [email.name]: '',
    [gender.name]: '',
    [userName.name]: '',
    [password.name]: '',
    [linkedin_url.name]: '',
    [github.name]: '',
    [leetcode_url.name]: '',
    [hackerrank_url.name]: '',
    [codepen_url.name]: '',
    [medium_url.name]: '',
    [codeforces_url.name]: '',
};
