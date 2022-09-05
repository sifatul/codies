import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PreateProfileMain from '../../components/form/createProfileMain';
import { Button } from '@mui/material';
import { getGoogleRedirectResult, googleLogin } from "../../Hooks/socailLogin"

function Copyright(props: any) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Find Profile
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function UserDataInputForm() {

    React.useEffect(() => {
        getGoogleRedirectResult()
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random/?developer,office)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <PreateProfileMain />
                        <button onClick={e => googleLogin()}> Continue with google </button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
