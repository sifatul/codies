import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';

function OtpVerificationForm() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '400px',
            }}
        >
            <Box>
                <TextField
                    name='otp'
                    type={'string'}
                    sx={{
                        marginRight: '6px',
                        width: { sm: 60, md: 80 },
                        '& .MuiInputBase-root': {
                            height: 60,
                        },
                    }}
                />
                <TextField
                    name='otp'
                    type={'string'}
                    sx={{
                        marginRight: '6px',
                        width: { sm: 60, md: 80 },
                        '& .MuiInputBase-root': {
                            height: 60,
                        },
                    }}
                />
                <TextField
                    name='otp'
                    type={'string'}
                    sx={{
                        marginRight: '6px',
                        width: { sm: 60, md: 80 },
                        '& .MuiInputBase-root': {
                            height: 60,
                        },
                    }}
                />
                <TextField
                    name='otp'
                    type={'string'}
                    sx={{
                        marginRight: '6px',
                        width: { sm: 60, md: 80 },
                        '& .MuiInputBase-root': {
                            height: 60,
                        },
                    }}
                />
            </Box>
            <Box mt={'22px'}>
                <Button variant='contained' color='primary' size='large'>
                    Verify Email
                </Button>
            </Box>
        </Box>
    );
}

export default OtpVerificationForm;
