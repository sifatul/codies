import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    gender: Yup.string().required('Required'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
};

export default function AddressForm() {
    const [gender, setgender] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setgender(event.target.value);
    };
    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
        Basic Informations
      </Typography> */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id='firstName'
                        name='firstName'
                        label='First name'
                        fullWidth
                        autoComplete='given-name'
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id='lastName'
                        name='lastName'
                        label='Last name'
                        fullWidth
                        autoComplete='family-name'
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id='email'
                        name='email'
                        label='Email address'
                        fullWidth
                        variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id='demo-simple-select-helper-label'>Gender</InputLabel>
                        <Select
                            labelId='demo-simple-select-helper-label'
                            id='demo-simple-select-helper'
                            value={gender}
                            label='Gender'
                            onChange={handleChange}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                            <MenuItem value={30}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
