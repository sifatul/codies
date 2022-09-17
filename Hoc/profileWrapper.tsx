import Styled from '@emotion/styled';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from 'react';
import { UseAppDispatch, UseAppSelector } from '../store';
import { getUserState, resetState } from '../store/user/basicInfo';


const Container = Styled.div`
    margin: 0 auto;
    min-height: 100vh;
    max-width:1024px;
`;
const ProfileWrapper = (props: any) => {
  const router = useRouter()
  const { userName = '', _id } = UseAppSelector(getUserState);
  const dispatch = UseAppDispatch();


  useEffect(() => {
    // if (!userName || !_id) router.replace('/auth/signin')
    // router.push('/account/profile', `/${userName}`, { shallow: true })
  }, [])
  const logout = useCallback(() => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(resetState())
      router.replace('/auth/signin')
    }).catch((error) => {
      // An error happened.
      console.error(error)
      alert(error)
    });
  }, [])


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar  >
            <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto', display: 'flex' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
                Codies
          </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </div>


          </Toolbar>
        </AppBar>
      </Box >

      <Container>
        {props?.children}
      </Container>
    </>
  );
};

export default ProfileWrapper;
