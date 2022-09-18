import { useState } from "react";
import ProfileCollectForm from "../../components/ProfilePageComponent/programingSection/ProfileCollectForm";
import ProfileWrapper from "../../Hoc/profileWrapper";
import UploadResume from "./uploadResume";



export default function OnBoarding() {

  return <ProfileWrapper>
    <UploadResume />

    <ProfileCollectForm />
  </ProfileWrapper>

}

