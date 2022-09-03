import { Typography } from '@mui/material';
import React from 'react';

const CreateUserSuccess = () => {
    return (
        <React.Fragment>
            <Typography variant='h5' gutterBottom>
                Thank you for registering with us.
            </Typography>
            <Typography variant='subtitle1'>
                You can use your credentials and login into your account!
            </Typography>
        </React.Fragment>
    );
};

export default CreateUserSuccess;
