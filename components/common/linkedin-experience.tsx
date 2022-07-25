import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function OutlinedCard({ experiences }: { experiences: any }) {
  console.log(experiences)
  const updatedAt = new Date(experiences.from).toLocaleString();
  return (
    <Box sx={{ minWidth: 275, mb: 1.5, maxWidth: '50%' }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {experiences.position}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {updatedAt}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {experiences.description}
            </Typography>

          </CardContent>

        </React.Fragment>
      </Card>
    </Box >
  );
}
