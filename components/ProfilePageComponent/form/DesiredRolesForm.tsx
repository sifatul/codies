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
    padding: 20px;
`;

const CheckboxGroupContainer = Styled.div`
    display: flex;
`;

const CustomCheckboxClass = css`
    padding: 8px 12px;
    border: 1px solid blue;
    margin: 6px 6px 4px 0;
    border-radius: 30px;
    display: block;
`;

const CheckboxGroupHeader = Styled.h4`
    margin: 18px 0 12px 0;
    font-weight: 500;
    font-size: 18px;
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Button = Styled.button`
    padding: 8px 36px;
    background: teal;
    color: #fff;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 30px;
    cursor: pointer;
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
                        <CheckboxGroupHeader>Software Engineer</CheckboxGroupHeader>
                        <CheckboxGroupContainer role='group' aria-labelledby='checkbox-group'>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='frontend' />
                                <span>Frontend Engineer</span>
                            </label>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='backend' />
                                Backend Engineer
                            </label>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='fullstack' />
                                Fullstack Developer
                            </label>
                        </CheckboxGroupContainer>
                        <CheckboxGroupHeader>Leadership</CheckboxGroupHeader>
                        <CheckboxGroupContainer role='group' aria-labelledby='checkbox-group'>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='project-manager' />
                                Project Manager
                            </label>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='team-lead' />
                                Team Lead
                            </label>
                        </CheckboxGroupContainer>
                        <CheckboxGroupHeader>Infrastructure</CheckboxGroupHeader>
                        <CheckboxGroupContainer role='group' aria-labelledby='checkbox-group'>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='cloud' />
                                Cloud Engineer
                            </label>
                            <label className={cx(CustomCheckboxClass)}>
                                <Field type='checkbox' name='roles' value='devops' />
                                DevOps
                            </label>
                        </CheckboxGroupContainer>
                        <div>
                            <FieldArray
                                name='experience'
                                render={({ insert, remove, push }) => (
                                    <div>
                                        {values.roles &&
                                            values.roles.length > 0 &&
                                            values.roles.map((ex: experienceType, index) => (
                                                <div key={index}>
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
                        <ButtonContainer>
                            <Button type='submit'>Submit</Button>
                        </ButtonContainer>
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
        label: '1 year',
    },
    {
        value: 2,
        label: '2 year',
    },
    {
        value: 3,
        label: '3 year',
    },
    {
        value: 4,
        label: '4 year',
    },
    {
        value: 5,
        label: '5 year',
    },
];
