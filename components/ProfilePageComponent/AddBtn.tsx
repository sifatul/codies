import Button, { ButtonType } from '../common/Button';
import Styled from '@emotion/styled';

const BtnWrapper = Styled.div`
    max-width:280px
`;

interface AddBtnProps {
    onClick: () => void;
    label?: string;
}

const AddBtn: React.FC<AddBtnProps> = (props) => {
    const { onClick, label } = props;
    return (
        <>
            <BtnWrapper>
                <Button
                    onClick={onClick}
                    type={ButtonType.ADD}
                    label={label || 'Add work experience'}
                    actionType='submit'
                />
            </BtnWrapper>
        </>
    );
};
export default AddBtn;
