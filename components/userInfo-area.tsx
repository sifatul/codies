import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Box, Collapse, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import React from "react";
const UserInfoArea = (props: any) => {

  const { email, languages, leetcode_url, blog, github_url, linkedin_url } = props;
  console.log("props: ", props)
  return <>

    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        borderColor: 'primary.dark',
        // bgcolor: 'blue'
      }}
    >


      {email && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Email' secondary={email} />
        </ListItem>
      )}


      {blog && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Blog' secondary={blog} />
        </ListItem>
      )}
      {github_url && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <GitHubIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='Github'
            secondary={github_url}
          />
        </ListItem>
      )}

      {/* {linkedin_url && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LinkedInIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='LinkedIn'
            secondary={linkedin_url}
          />
        </ListItem>
      )} */}

      {leetcode_url && (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='LeetCode'
            secondary={leetcode_url}
          />
        </ListItem>
      )}

      {languages?.length > 0 && (
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Language' />
          </ListItem>

          <Collapse in={true} timeout='auto' unmountOnExit>
            <Stack spacing={1} alignItems='center'>
              {/* <Stack direction='row' spacing={1}>
                                            {userInfo.hackerrank.languages.map((item, idx) => {
                                                return (
                                                    <Chip
                                                        label={item[0]}
                                                        color='primary'
                                                        key={idx}
                                                    />
                                                );
                                            })}
                                        </Stack> */}
            </Stack>
          </Collapse>
        </>
      )}
    </Box>


  </>

}
export default UserInfoArea;