// import React, { useState, useEffect } from 'react';

import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <Container maxWidth="md" style={{ marginTop: '10rem' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('title')}
              </Typography>
        <Typography variant="subtitle1">
          {t('subtitle')}
        </Typography>
      </Box>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
              {t('howItWorks')}
              </Typography>
              <Typography>
              {t('howItWorksDescription')}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('features.persistence')}
              </Typography>
              <Typography>
                {t('features.persistenceDescription')}
              </Typography>
            </CardContent>
          </Card>
    
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('features.accessibility')}
              </Typography>
              <Typography>
                {t('features.accessibilityDescription')}
              </Typography>
            </CardContent>
          </Card>
     

      <Box mt={2} textAlign="center">
      <Link to="/" style={{ textDecoration: 'none' }}>
   <Button
          component="label"
          role={undefined}
          disableRipple
          disableElevation
          tabIndex={-1}
          sx={{
            margin: '10px',
            ':hover': {
              backgroundColor: 'transparent',
            },
            ':focus': {
              outline: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
            ':active': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-customBlue relative flex gap-2 p-1 mt-2'>
            <span className="relative text-white m-1">  {t('accessForm')} </span>
                     </span>
          <VisuallyHiddenInput
            type="file"
        
            multiple
          />
        </Button>
</Link>
      </Box>

     
    </Container>
  );
};

export default HomePage;
