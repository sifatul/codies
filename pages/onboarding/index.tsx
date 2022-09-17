import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ProfileWrapper from "../../Hoc/profileWrapper"
import SectionMetaInfo from "../../components//common/formSectionMetaInfo"
import Styled from '@emotion/styled';


const Container = Styled.div`
  height: 100vh;
  width: 100 %;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;

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
  margin: 10px 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #a3a3a3;
  border-radius: 5px;
  `



// .drop_box h4 {
// font - size: 16px;
// font - weight: 400;
// color: #2e2e2e;
// }


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


// .btn: hover{
//   text - decoration: none;
//   background - color: #ffffff;
//   color: #005af0;
//   padding: 10px 20px;
//   border: none;
//   outline: 1px solid #010101;
// }
const FormInput = Styled.input`
  margin: 10px 0;
  width: 100%;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
`



const fileTypes = ["JPEG", "PNG", "GIF"];

export default function OnBoarding() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);


  const uploadToClient = (file) => {
    setImage(file);
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };



  return <ProfileWrapper>


    <div>
      <SectionMetaInfo
        label="Hello Sifatul! Let's create your profile!"
        description="Please let us know the basics!"
      />

      <Container>
        <Card >
          <DropBox >
            <header>
              <h4>Select File here</h4>
            </header>
            <Subtitle>Files Supported: PDF, TEXT, DOC , DOCX</Subtitle>
            <FormInput type="file" hidden accept=".doc,.docx,.pdf" id="fileID" style={{ display: 'none' }} />
            <Btn >Choose File</Btn>
          </DropBox>

        </Card>
      </Container>




      {/* <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        // multiple={true}
        handleChange={uploadToClient}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>

      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
        </button> */}
    </div>
  </ProfileWrapper>

}

