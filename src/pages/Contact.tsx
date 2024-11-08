import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Contact: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = `mailto:valentina.raileanu@yahoo.fr?subject=Mon Sujet&body=Message ici`;
  };

  return (
    <Container style={{ marginTop: '8rem', textAlign: 'center' }}>
    <Typography sx={{ fontSize: '1rem', fontFamily: 'Kalam', display: 'inline' }}>
      Une question qui vous trotte en tête, une idée de génie, un petit mot, un commentaire ou une suggestion qui décoiffe ? Dites-nous tout ! <br />Nous sommes à l’écoute et prêts à vous répondre
    </Typography>
    <Button
      variant="text" // Choisir "text" pour un bouton sans bordure
      color="primary"
      onClick={handleEmailClick}
      sx={{
        fontSize: '1rem',
        fontFamily: 'Kalam',
        marginLeft: '0.5rem',
        textTransform: 'none',
        padding: 0,
        minWidth: 'auto'
      }}
    >
      Envoyer un e-mail
    </Button>
  </Container>
  );
};

export default Contact;
