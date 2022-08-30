import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    linkedin_url: Yup.string().matches(
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/,
        'Invalid linkedIn url'
    ),
    github: Yup.string().matches(
        /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim,
        'Invalid github url'
    ),
    leetcode_url: Yup.string().matches(
        /^(https?:\/\/)?(www\.)?leetcode\.com\/[a-zA-Z0-9_]{1,25}$/gim,
        'Invalid leetcode profile url'
    ),
    hackerrank_url: Yup.string().matches(
        /^(https?:\/\/)?(www\.)?hackerrank\.com\/[a-zA-Z0-9_]{1,25}$/gim,
        'Invalid hackerrank url'
    ),
    codepen_url: Yup.string().matches(/^(https?:\/\/)?(www\.)?codepen\.io\/[a-zA-Z0-9_]{1,25}$/gim),
    medium_url: Yup.string().url(),
    codeforces_url: Yup.string().url('Invalid url'),
});

const initialValues = {
    linkedin_url: '',
    github: '',
    leetcode_url: '',
    hackerrank_url: '',
    codepen_url: '',
    medium_url: '',
    codeforces_url: '',
};

export default function AddressForm() {
    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
        Recommended 
      </Typography> */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id='linkedin-url'
                        name='linkedin-url'
                        label='Linkedin profile url'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='github'
                        name='github'
                        label='Github profile link'
                        fullWidth
                        variant='standard'
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id='leetcode-url'
                        name='leetcode-url'
                        label='Leetcode profile link'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='hackerrank-url'
                        name='hackerrank-url'
                        label='Hackerrank profile link'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='codepen-url'
                        name='codepen-url'
                        label='Codepen profile link'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='medium-url'
                        name='medium-url'
                        label='Medium profile link'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
