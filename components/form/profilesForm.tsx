import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function AddressForm() {
  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Recommended 
      </Typography> */}
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            id="linkedin-url"
            name="linkedin-url"
            label="Linkedin profile url"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="github"
            name="github"
            label="Github profile link"
            fullWidth
            variant="standard"
          />
        </Grid>



        <Grid item xs={12}>
          <TextField
            id="leetcode-url"
            name="leetcode-url"
            label="Leetcode profile link"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="hackerrank-url"
            name="hackerrank-url"
            label="Hackerrank profile link"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="codepen-url"
            name="codepen-url"
            label="Codepen profile link"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="medium-url"
            name="medium-url"
            label="Medium profile link"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}