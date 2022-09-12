import React from 'react';

import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import {
    Field,
    FieldArray,
    Form,
    Formik,
    FormikProvider,
    SharedRenderProps,
    useFormik,
} from 'formik';
import { Slider } from '@mui/material';

const Container = Styled.div`
    padding-bottom: 12px;
`;

const DesiredRolesHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
`;

const FormContainer = Styled.div`
    padding: 20px 0;
`;

interface experienceType {
    name: string;
    value: number;
}

interface FormValue {
    roles: any[];
    experience: experienceType[];
}

const initValues: FormValue = {
    roles: [],
    experience: [],
};

const DesiredRolesForm = () => {
    const formik = useFormik({
        initialValues: initValues,
        // validationSchema: SignupSchema,
        onSubmit: (val: any) => {
            console.log(val);
        },
    });

    const { handleChange, errors, values, setFieldValue } = formik;

    return (
        <Container>
            <DesiredRolesHeader>Desired Roles</DesiredRolesHeader>
            <FormContainer>
                <FormikProvider value={formik}>
                    <Form>
                        <div role='group' aria-labelledby='checkbox-group'>
                            <label>
                                <Field type='checkbox' name='roles' value='frontend' />
                                Frontend Engineer
                            </label>
                            <label>
                                <Field type='checkbox' name='roles' value='backend' />
                                Backend Engineer
                            </label>
                            <label>
                                <Field type='checkbox' name='roles' value='fullstack' />
                                Fullstack Developer
                            </label>
                        </div>
                        <div role='group' aria-labelledby='checkbox-group'>
                            <label>
                                <Field type='checkbox' name='roles' value='project-manager' />
                                Project Manager
                            </label>
                            <label>
                                <Field type='checkbox' name='roles' value='team-lead' />
                                Team Lead
                            </label>
                        </div>
                        <div>
                            <FieldArray
                                name='experience'
                                render={({ insert, remove, push }) => (
                                    <div>
                                        {values.roles &&
                                            values.roles.length > 0 &&
                                            values.roles.map((ex: experienceType, index) => (
                                                <div>
                                                    <Slider
                                                        name={`${ex.name}`}
                                                        min={1}
                                                        max={5}
                                                        step={0.1}
                                                        defaultValue={1}
                                                        valueLabelDisplay='auto'
                                                        marks={sliderMarks}
                                                        value={values.experience[index]?.value}
                                                        onChange={(e: any) => {
                                                            const { target } = e;

                                                            if (target && target.value) {
                                                                if (values.experience.length > 0) {
                                                                    const objIndex =
                                                                        values.experience.findIndex(
                                                                            (obj: experienceType) =>
                                                                                obj.name == ex.name
                                                                        );
                                                                    const newObj = {
                                                                        name: ex.name,
                                                                        value: target.value,
                                                                    };
                                                                    values.experience[objIndex] =
                                                                        newObj;
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                )}
                            />
                        </div>
                    </Form>
                </FormikProvider>
            </FormContainer>
        </Container>
    );
};

export default DesiredRolesForm;

const sliderMarks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
];
