import { UseAppSelector } from "../store";
import { getUserState } from "../store/user/basicInfo";

const BasicInfo = () => {
  const {

    name = '',
    email = '',
    country = '',
    gender = '',
    dob = '',
    profilePic = '',
  } = UseAppSelector(getUserState);

  return <>
    <p>name : {name} </p>
    <p>email : {email} </p>
    <p>country : {country} </p>
    <p>gender : {gender} </p>
    <p>dob : {dob} </p>
    <p>profilePic : {profilePic} </p>
  </>
}
export default BasicInfo