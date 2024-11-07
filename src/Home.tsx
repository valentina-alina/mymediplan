// import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';


const { t } = useTranslation();

const HomePage: React.FC = () => {

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <Typography variant="subtitle1">
          {t('subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('features.form')}
              </Typography>
              <Typography>
                {t('features.formDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('features.schedule')}
              </Typography>
              <Typography>
                {t('features.scheduleDescription')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
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
        </Grid>

        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h4" component="h2" gutterBottom>
          {t('howItWorks')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('howItWorksDescription')}
        </Typography>
        <Button variant="contained" color="primary">
          {t('accessForm')}
        </Button>
      </Box>

     
    </Container>
  );
};

export default HomePage;
