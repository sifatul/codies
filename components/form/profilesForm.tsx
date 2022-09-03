import Grid from '@mui/material/Grid';
import * as React from 'react';
import InputField from './FormField/InputField';

function ProfilesForm({ formField }: any) {
    const {
        linkedin_url,
        leetcode_url,
        github,
        hackerrank_url,
        codepen_url,
        codeforces_url,
        medium_url,
    } = formField;

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputField name={linkedin_url.name} label='Linkedin profile url' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={github.name} label='Github profile link' fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <InputField name={leetcode_url.name} label='Leetcode profile link' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={hackerrank_url.name}
                        label='Hackerrank profile link'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={codepen_url.name} label='Codepen profile link' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={medium_url.name} label='Medium profile link' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField
                        name={codeforces_url.name}
                        label='Codeforces profile link'
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ProfilesForm;
