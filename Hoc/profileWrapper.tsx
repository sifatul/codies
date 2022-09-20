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
    max-width:1440px;
`;
const ProfileWrapper = (props: any) => {
  const router = useRouter()
  const { _id } = UseAppSelector(getUserState);
  const dispatch = UseAppDispatch();


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
  const goToLogin = useCallback(() => {
    router.replace('/auth/signin')
  }, [])

  const goToHomepage = useCallback(() => {
    router.replace('/')
  }, [])


  return (
    <>
      <Box sx={{ flexGrow: 1, background: 'transparent' }}>
        <AppBar position="static" sx={{ background: 'transparent', color: 'black' }}>
          <Toolbar  >
            <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'flex' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '25px' }} onClick={goToHomepage}>
                Codies
          </Typography>
              {_id && <Button color="inherit" onClick={logout}>Logout</Button>}
              {!_id && <Button color="inherit" onClick={goToLogin}>Login</Button>}
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