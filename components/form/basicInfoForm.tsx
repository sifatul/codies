import Grid from '@mui/material/Grid';
import * as React from 'react';
import InputField from './FormField/InputField';
import SelectField from './FormField/SelectField';
import { genderArr } from '../../helper/helperValues';

function BasicInfoForm({ formField }: any) {
    const { firstName, lastName, email, gender, userName, password } = formField;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputField name={firstName.name} label='First Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name={lastName.name} label='Last Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField name={userName.name} label='Username' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectField
                        name={gender.name as string}
                        label={'Gender'}
                        data={genderArr}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={email.name} label='Email' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <InputField name={password.name} label='Password' fullWidth type='password' />
                </Grid>
            </Grid>
        </div>
    );
}

export default BasicInfoForm;
