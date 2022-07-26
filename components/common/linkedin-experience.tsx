import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { LinkedinExperienceType } from '../linkedin-area';

export default function OutlinedCard({ experience }: { experience: LinkedinExperienceType }) {

  const updatedAt = new Date(experience.from).toLocaleString();

  return (
    <Box sx={{ minWidth: 275, mb: 1.5, maxWidth: '50%' }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {experience.position}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {updatedAt}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {experience.description}
            </Typography>

          </CardContent>

        </React.Fragment>
      </Card>
    </Box >
  );
}
