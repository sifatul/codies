import Button, { ButtonType } from "../common/Button"
import Styled from '@emotion/styled';

const BtnWrapper = Styled.div`
    max-width:280px
`;
const AddBtn = (props: any) => {
  const { onClick } = props
  return <>
    <BtnWrapper>
      <Button
        onClick={onClick}
        type={ButtonType.ADD}
        label='Add work experience'
        actionType='submit'
      />
    </BtnWrapper>
  </>
}
export default AddBtn