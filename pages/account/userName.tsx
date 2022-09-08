import { Button, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import * as Yup from 'yup';
import InputField from '../../components/form/FormField/InputField';

export default function userName() {

  const router = useRouter()

  const { platform, token } = router.query


  const onSubmit = async (values: any) => {
    console.log("values:  " + values)

    if (!values) return;
    const { username } = values;

    const res = await fetch('/api/auth/social', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform, token, userName: username }),
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
    'username': '',
  }
  const CreateUserFormValidation = Yup.object().shape({
    'username': Yup.string()
      .required('username is required'),
  })
  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h4' align='center'>
          user name is missing
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
                  <InputField name='username' label='Username' fullWidth />
                </Grid>

                <Button sx={{ mt: 3, ml: 1 }} type='submit'>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
}
