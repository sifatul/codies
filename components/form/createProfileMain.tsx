import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Form, Formik, useFormik } from 'formik';
import * as React from 'react';
import BasicInfoForm from './basicInfoForm';
import ProfilesForm from './profilesForm';

const steps = [BasicInfoForm, ProfilesForm];

const theme = createTheme();

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <BasicInfoForm />;
        case 1:
            return <ProfilesForm />;

        default:
            throw new Error('Unknown step');
    }
}

export default function PreateProfileMain() {
    const [activeStep, setActiveStep] = React.useState(0);

    const isLastStep = () => {
        return activeStep === steps.length - 1;
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onSubmit = (values: any) => {
        console.log('hello');
        if (!isLastStep()) {
            handleNext();
            return;
        }

        console.log(values);
    };

    const initialValues = steps.reduce(
        (values, { initialValues }) => ({
            ...values,
            ...initialValues,
        }),
        {}
    );
    const ActiveStep = steps[activeStep];

    return (
        // <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
            <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component='h1' variant='h4' align='center'>
                    Create profile
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((item, index) => (
                        <Step key={index}>
                            <StepLabel>{item?.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ActiveStep.validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, touched, values, errors }) => (
                            <Form>
                                <>
                                    <React.Fragment>
                                        {activeStep === steps.length ? (
                                            <React.Fragment>
                                                <Typography variant='h5' gutterBottom>
                                                    Thank you for registering with us.
                                                </Typography>
                                                <Typography variant='subtitle1'>
                                                    To cook your profile we have sent you an email
                                                    for confirmation, and your profile will be
                                                    served as soon as the verification is complete.
                                                </Typography>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                {getStepContent(activeStep)}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                    }}
                                                >
                                                    {activeStep !== 0 && (
                                                        <Button
                                                            onClick={handleBack}
                                                            sx={{ mt: 3, ml: 1 }}
                                                        >
                                                            Back
                                                        </Button>
                                                    )}
                                                    <Button disabled={isSubmitting} type='submit'>
                                                        {isLastStep() ? 'Submit' : 'Next'}
                                                    </Button>
                                                    {/* <p>{JSON.stringify(errors, null)}</p> */}
                                                </Box>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                </>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </Container>
        // </ThemeProvider>
    );
}
