import React, { useState } from 'react';
import Styled from '@emotion/styled';
import { cx, css } from '@emotion/css';
import { Field, Form, FormikProvider, useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { UseAppSelector } from '../../../store';
import { getUserState } from '../../../store/user/basicInfo';
import { PostData } from '../../../Utils/fetchData';

const Container = Styled.div`
    padding-bottom: 12px;
`;

const FromHeader = Styled.h3`
    font-weight: 600;
    font-size: 24px;
    margin: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #e1e1e1;
`;

const FormContainer = Styled.div`
    padding: 20px;
`;
const FormWrapper = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
`;

const InputField = css`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid gray;
    display: block;
`;

const Button = Styled.button`
    padding: 8px 36px;
    background: #2255F7;
    border-radius: 8px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
`;

const ButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ErrorMessageClass = css`
    margin-top: 8px;
    color: red;
    font-weight: 300;
    font-size: 14px;
`;

const SkillsTagContainer = Styled.div`
    padding: 8px 12px;
    display: flex;
    flex-wrap: wrap;
`;

const SkillTag = Styled.p`
    margin: 4px 5px;
    padding: 4px 8px;
    background-color: #e1e1e1;
    font-size: 14px;
    color: #73777B;
    border: 1px solid gray;
    border-radius: 4px;
    font-weight: 500;
`;

const RemoveIconButtonClass = css`
    margin-left: 8px;
    cursor: pointer;
`;

const validationSchema = Yup.object().shape({
    skillTag: Yup.string().required('Skill tag is required'),
});

const SkillsSectionForm: React.FC<{ closeModal: () => void; skillTags: [] }> = ({
    closeModal,
    skillTags,
}) => {
    const { _id = '' } = UseAppSelector(getUserState);
    const [tags, setTags] = useState<any>(skillTags || []);
    const formik = useFormik({
        initialValues: {
            skillTag: '',
        },
        validationSchema: validationSchema,
        onSubmit: (val: any) => {
            const isExist = tags.includes(val?.skillTag);

            if (!isExist) {
                setTags((prevState: any) => [...prevState, val.skillTag]);
                resetForm();
            } else {
                alert('already added');
                resetForm();
            }
        },
    });

    const handleRemove = (index: number) => {
        tags.splice(index, 1);
        setTags([...tags]);
    };

    const handleSave = async () => {
        if (!tags && !tags.length) return;

        const res: any = await PostData(
            '/api/skills',
            JSON.stringify({ userId: _id, techStack: [...tags] })
        );

        if (res?.status === 201) {
            closeModal();
            alert('skills added successfully');
        } else {
            alert('please try again');
        }
    };

    const { handleChange, errors, values, setFieldValue, resetForm } = formik;

    return (
        <Container>
            <FromHeader>Skills</FromHeader>
            <div>
                <h4>Whats is your tech stack?</h4>
                <p>Feel free to add skills such as Git, TDD, Agile, etc.</p>
            </div>
            <FormContainer>
                <FormikProvider value={formik}>
                    <Form>
                        <FormWrapper>
                            <Field
                                className={cx(InputField)}
                                label='Skill tag'
                                placeholder='Skill Tag'
                                name='skillTag'
                            />
                            <Button type='submit'>Add</Button>
                        </FormWrapper>
                        <div className={cx(ErrorMessageClass)}>
                            <ErrorMessage name='skillTag' />
                        </div>
                    </Form>
                </FormikProvider>
            </FormContainer>
            <SkillsTagContainer>
                {tags.map((item: string, index: number) => (
                    <SkillTag key={index}>
                        {item}
                        <span
                            onClick={() => handleRemove(index)}
                            className={cx(RemoveIconButtonClass)}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </SkillTag>
                ))}
            </SkillsTagContainer>
            <ButtonContainer>
                <Button onClick={handleSave}>Save</Button>
            </ButtonContainer>
        </Container>
    );
};

export default SkillsSectionForm;
