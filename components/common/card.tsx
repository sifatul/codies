import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { githubTopRepoType } from '../../Utils/github';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

import StarIcon from '@mui/icons-material/Star';
import { Chip } from '@mui/material';
export default function OutlinedCard({ topRepo }: { topRepo: githubTopRepoType }) {
  const updatedAt = new Date(topRepo.updated_at).toLocaleString();
  return (
    <Box sx={{ minWidth: 275, mb: 1.5 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {topRepo.homepage}
            </Typography>
            <Typography variant="h5" component="div">

              {topRepo.url?.replace('https://api.github.com/repos/', '')}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {updatedAt}
            </Typography>

            {topRepo.language && <Chip sx={{ mb: 1.5 }} label={topRepo.language} color="primary" />}


            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {topRepo.description}
            </Typography>

          </CardContent>

          <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Button size="small"> {topRepo.homepage}</Button> */}
            <IconButton aria-label="add to favorites">
              <StarIcon />
              <Typography color="text.secondary" >
                {topRepo.stargazers_count}
              </Typography>
            </IconButton>

            <Link href={topRepo.html_url}
              target="_blank"
              variant="body2">
              <Button size="small">
                Visit
              </Button>
            </Link>


          </CardActions>
        </React.Fragment>
      </Card>
    </Box >
  );
}
