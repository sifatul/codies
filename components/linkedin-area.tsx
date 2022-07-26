import { Divider, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { PostData } from "../Utils/fetchData"
import LinkedinExperience from './common/linkedin-experience'
interface LinkedinExperienceType {
  description: string
  position: string
  from: string
}

const LinkedinArea = (props: any) => {
  const { linkedin_url } = props

  const [linkedinInfo, setLinkedinInfo] = useState({ workExperience: [] })
  const getLinkedinUserInfo = React.useCallback(async (linkedinUserName: string) => {

    const linkinedApi = '/api/linkedin'

    const linkedinInfo: any = await PostData(linkinedApi, linkedinUserName)
    setLinkedinInfo(prevState => {
      return {
        ...prevState,
        ...linkedinInfo
      }
    })
  }, [])


  React.useEffect(() => {

    const linkedInUrl = new URL(linkedin_url)
    let { pathname } = linkedInUrl
    if (pathname.substr(-1) === "/") pathname = pathname.slice(0, -1);
    const linkedinUserName = pathname.split("/").pop()

    if (!linkedinUserName) return

    getLinkedinUserInfo(linkedinUserName)


  }, [])


  return <>

    {(linkedinInfo?.workExperience || [])?.length > 0 && <>
      <Typography variant="h5" component="div">
        Experience
    </Typography>

      <Divider sx={{ mb: 5 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        {linkedinInfo?.workExperience.map((experience: LinkedinExperienceType, idx: number) => <LinkedinExperience experience={experience} key={'repo' + idx} />)}
      </div>
    </>}
  </>
}
export default LinkedinArea