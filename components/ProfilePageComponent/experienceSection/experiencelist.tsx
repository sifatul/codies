import Styled from '@emotion/styled'
import React from "react"
import { UseAppSelector } from "../../../store"
import { getUserState } from "../../../store/user/basicInfo"
import { getExperiences } from "../../../store/user/experience"
import { DateString } from "../../../Utils/timeFormat"
import EditButton from "../EditButton"
import SkillTags from "../skillSection/SkillTags"
import ExperienceSectionModal from "./ExperienceSectionModal"



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
  const [editExperienceIdx, setIsEditExperienceIdx] = React.useState(-1);
  const experiences = UseAppSelector(getExperiences);

  function openModal(index: number) {
    setIsEditExperienceIdx(index);
  }


  function closeModal() {
    setIsEditExperienceIdx(-1);
  }





  return <>
    <ExperienceSectionModal
      openModal={() => { }}
      modalIsOpen={editExperienceIdx >= 0}
      data={editExperienceIdx >= 0 ? experiences[editExperienceIdx] : null}
      closeModal={closeModal}
    />

    {experiences.map((experience, idx) => {
      const { companyName = '', _id, position, startDate, summary, isPresentCompany, endDate } = experience
      const stateTime = DateString(startDate)
      const endTime = isPresentCompany ? 'ongoing' : DateString(endDate)

      return <div key={"experience" + _id + idx}>

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