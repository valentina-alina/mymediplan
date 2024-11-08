import React from 'react';
import { Container, Typography } from '@mui/material';

const Apropos: React.FC = () => (
  <Container maxWidth="md" style={{ marginTop: '10rem' }}>
    <Typography variant="h3">À propos</Typography>
    <Typography variant="body1">Informations sur le site ou l'équipe.</Typography>
  </Container>
);

export default Apropos;
