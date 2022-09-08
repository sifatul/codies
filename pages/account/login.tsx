import { Button, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import InputField from '../../components/form/FormField/InputField';
import { getEmailRegex } from '../../helper/regex';
import github from '../../store/platforms/github';
import SocialAuth from './socialAuth';


const steps = ['Basic Information', 'Profile informations'];





export default function LoginProfileMain() {


  const onSubmit = async (values: any) => {
    console.log("values:  " + values)

    if (!values) return;

    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    res.json().then((result) => {
      // if (result?.status === 'success') {
      //   alert("success")
      // }
      console.log(result)
      alert(JSON.stringify(result))
    });
  };
  const CreateUserFormInitValue = {
    'password': '',
    'email': '',
  }
  const CreateUserFormValidation = Yup.object().shape({
    'email': Yup.string()
      .email('Invalid email')
      .matches(getEmailRegex, 'Invalid email')
      .required('Email is required'),
    'password': Yup.string().required().min(8, 'Minimum 8 character long'),
  })
  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h4' align='center'>
          Login
                </Typography>



        <div>
          <Formik
            initialValues={CreateUserFormInitValue}
            validationSchema={CreateUserFormValidation}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={"formId"}>
                <Grid item xs={12}>
                  <InputField name='email' label='Email' fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <InputField name='password' label='password' fullWidth />
                </Grid>
                <Button sx={{ mt: 3, ml: 1 }} type='submit'>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
      <SocialAuth />
    </Container>
  );
}
