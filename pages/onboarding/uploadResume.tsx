
import { useCallback, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ProfileWrapper from "../../Hoc/profileWrapper"
import SectionMetaInfo from "../../components/common/formSectionMetaInfo"
import Styled from '@emotion/styled';
import Button, { ButtonType } from '../../components/common/Button';
import { PostData } from "../../Utils/fetchData";
import ProfileCollectForm from "../../components/ProfilePageComponent/programingSection/ProfileCollectForm"
import { getDomain } from "js-string-helper";
import { UseAppDispatch, UseAppSelector } from "../../store";
import { getUserState, setUserInfo } from "../../store/user/basicInfo";

const Container = Styled.div`
width: 100%;
align-items: center;
display: flex;
justify-content: center;


margin-top: 30px;
// border: 1px solid red;

`;
const ButtonWrapper = Styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
padding-top: 50px;
justify-content: end;

& > Button {
  max-width: 25%
}

`;


const Card = Styled.div`
border-radius: 10px;
box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
width: 600px;
height: 260px;
background - color: #ffffff;
padding: 10px 30px 40px;
`


const DropBox = Styled.div`
padding: 30px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
border: 3px dotted #a3a3a3;
border-radius: 5px;
`


const Subtitle = Styled.p`
margin-top: 10px;
margin-bottom: 20px;
font-size: 12px;
color: #a3a3a3;
`


const Btn = Styled.button`
text-decoration: none;
background-color: #005af0;
color: #ffffff;
padding: 10px 20px;
border: none;
outline: none;
transition: 0.3s;`

const fileTypes = ["PDF"];

const UploadResume = () => {

  const dispatch = UseAppDispatch();
  const { userInfo } = UseAppSelector(getUserState);
  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [dataFromCv, setDataFromCv] = useState<any>(null)



  const uploadToClient = (file: string) => {
    setImage(file);
  };

  const uploadToServer = async () => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);


    const response: any = await PostData("/api/upload", body);
    if (response?.status != 200) return
    const { text, error, data, json } = response
    debugger
    setDataFromCv(json)
    console.log(json)
    manageUrls()

  };

  const manageUrls = useCallback(() => {
    console.log(dataFromCv)
    const urls = dataFromCv?.urls || []
    console.log("urls: ", urls)
    if (urls.length <= 0) return

    const links = { github_url: '', leetcode_url: '', hackerrank_url: '' }
    urls.map((item: string) => {
      const domain = getDomain(item);
      if (domain === 'github.com') {
        links.github_url = item
      } else if (domain === 'leetcode.com') {
        links.leetcode_url = item
      }
      else if (domain === 'hackerrank.com') {
        links.hackerrank_url = item
      }

    })
    dispatch(setUserInfo({ ...userInfo, ...links }))
  }, [dataFromCv])
  return <>

    <div>
      <SectionMetaInfo
        label="Hello Sifatul! Let's create your profile!"
        description="Auto fill information from your CV."
      />

      <Container>
        <FileUploader type="file" hidden accept=".pdf" id="fileID"

          handleChange={uploadToClient}
          types={fileTypes}
        >

          <Card >
            <DropBox >
              <header>
                <h4>You may drag and drop your CV here</h4>
              </header>
              <Subtitle>Files Supported: PDF</Subtitle>

              <Btn >Upload your CV</Btn>
            </DropBox>

          </Card>

        </FileUploader>
      </Container>

      <ButtonWrapper>

        <Button
          type={ButtonType.SECONDARY}
          label='Skip'
          actionType='submit'
        />

        <Button
          type={ButtonType.PRIMARY}
          label='Submit'
          actionType='submit'
          onClick={uploadToServer}
        />



      </ButtonWrapper>


    </div>


  </>
}
export default UploadResume