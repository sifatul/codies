import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import * as React from 'react';
import BasicInfoForm from './basicInfoForm';
import CreateUserSuccess from './createUserSuccess';
import CreateUserFormInitValue from './FormModel/CreateUserFormInitValue';
import CreateUserFormModel from './FormModel/CreateUserFormModel';
import CreateUserFormValidation from './FormModel/CreateUserFormValidation';
import ProfilesForm from './profilesForm';

const steps = ['Basic Information', 'Profile informations'];

const { formId, formField } = CreateUserFormModel;

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <BasicInfoForm formField={formField} />;
        case 1:
            return <ProfilesForm formField={formField} />;

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

    const onSubmit = async (values: any) => {
        if (!isLastStep()) {
            handleNext();
            return;
        }

        if (!values) return;

        const res = await fetch('/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    };

    return (
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
            <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component='h1' variant='h4' align='center'>
                    Create profile
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((item, index) => (
                        <Step key={index}>
                            <StepLabel>{item}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <Formik
                        initialValues={CreateUserFormInitValue}
                        validationSchema={CreateUserFormValidation[activeStep]}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form id={formId}>
                                <React.Fragment>
                                    {activeStep === steps.length && <CreateUserSuccess />}
                                    {activeStep !== steps.length && (
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
                                                <Button sx={{ mt: 3, ml: 1 }} type='submit'>
                                                    {isLastStep() ? 'Submit' : 'Next'}
                                                </Button>
                                            </Box>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </Container>
    );
}
