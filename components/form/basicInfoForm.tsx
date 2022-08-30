import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Gender } from '../../types/common.types';
import { InputLabel } from '@mui/material';

function AddressForm() {
    const [gender, setgender] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setgender(event.target.value);
    };
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>
        Basic Informations
      </Typography> */}
            <div>
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Field name='firstName' component={TextField} label='First Name' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name='lastName'
                                component={TextField}
                                label='Last Name'
                                value={'hello'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field name='email' component={TextField} label='Email' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <InputLabel htmlFor='gender'>Gender</InputLabel>
                                <Field
                                    as='select'
                                    name='gender'
                                    component={Select}
                                    fullWidth
                                    label='Gender'
                                >
                                    <option value={Gender.MALE}>Male</option>
                                    <option value={Gender.FEMALE}>Female</option>
                                    <option value={Gender.OTHER}>Other</option>
                                </Field> */}
                        </Grid>
                    </Grid>
                </>
            </div>
        </>
    );
}

AddressForm.label = 'Profile info';

AddressForm.initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    // gender: '',
};

AddressForm.validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid email'
        )
        .required('Required'),
    // gender: Yup.string().required('Required'),
});

export default AddressForm;
