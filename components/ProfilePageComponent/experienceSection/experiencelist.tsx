import React, { useEffect, useState } from "react"
import { UseAppSelector } from "../../../store"
import { getUserState } from "../../../store/user/basicInfo"
import { GetData } from "../../../Utils/fetchData"
import { DateString } from "../../../Utils/timFormat"
import SkillTags from "../SkillTags"

import Styled from '@emotion/styled';
import ExperienceSectionModal from "./ExperienceSectionModal"
import EditButton from "../EditButton"


const ExperienceCards = Styled.div`
    padding: 8px 12px;
`;

const ExperienceCardHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
`;

const DesignationName = Styled.h4`
    font-weight: 500;
    font-size: 16px;
    margin: 0;
`;

const CompnayName = Styled.h4`
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    margin-top: 8px;
`;

const JobTimePeriod = Styled.p`
    margin: 0;
    font-weight: 300;
`;

const JobDescription = Styled.p`
    margin: 16px 0;
    font-weight: 300;
`;



const ExperienceList = () => {

  const { _id = '', } = UseAppSelector(getUserState);
  const [experiences, setExperiences] = useState([])
  const [editExperienceIdx, setIsEditExperienceIdx] = React.useState(-1);

  function openModal(index: number) {
    setIsEditExperienceIdx(index);
  }


  function closeModal() {
    setIsEditExperienceIdx(-1);
  }


  useEffect(() => {
    GetData('/api/experience?userId=' + _id).then((output: any) => {
      const { data = [], status } = output
      if (status == 201) setExperiences(data)
    })

  }, [])


  return <>
    <ExperienceSectionModal
      openModal={() => { }}
      modalIsOpen={editExperienceIdx >= 0}
      data={experiences[editExperienceIdx]}
      closeModal={closeModal}
    />

    {experiences.map((experience, idx) => {
      const { companyName = '', _id, position, startDate, summary, isPresentCompany, endDate } = experience
      const stateTime = DateString(startDate)
      const endTime = isPresentCompany ? 'ongoing' : DateString(endDate)

      return <div key={"experience" + _id}>

        <ExperienceCards>
          <ExperienceCardHeaderContainer>
            <div>
              <DesignationName>{position}</DesignationName>
              <CompnayName>{companyName}</CompnayName>
            </div>
            <div style={{ display: 'flex' }}>
              <JobTimePeriod>{stateTime} - {endTime}</JobTimePeriod>
              <EditButton onClick={() => openModal(idx)} />
            </div>


          </ExperienceCardHeaderContainer>
          <JobDescription>
            {summary}
          </JobDescription>
        </ExperienceCards>
        <SkillTags />
      </div>
    })}
  </>

}
export default ExperienceList