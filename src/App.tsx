// App.tsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav.tsx';
import { CircularProgress } from '@mui/material';
import Footer from './components/Footer.tsx';
const Home = lazy(() => import('./pages/HomePage.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Apropos = lazy(() => import('./pages/Apropos.tsx'));
const Planner= lazy(() => import('./pages/Planner.tsx'));
const App: React.FC = () => {
  const navItems = [
    { icon: "Accueil", path: "/home" },
    { icon: "Planner", path: "/" },
    // { icon: "👥", path: "/contact" },
    // { icon: "📝", path: "/about" },
  ];
  return (
    <>
      {/* <Navbar navItems={['🏠', '👥', '📝']} /> */}
      <Navbar navItems={navItems} /> 

      <Routes>
        <Route path="/home" element=
          {
           <Suspense fallback={<CircularProgress />}>
            <Home />
          </Suspense>}
        />
<Route
          path="/contact"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Apropos />
            </Suspense>
          }
        />
  <Route
          path="/"
          element={
            <Suspense fallback={<CircularProgress />}>
            <Planner />
            </Suspense>
          }
        />

        {/* <Route path="/generer-mediplan" element={<GenererMediplan />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<Apropos />} /> */}
      </Routes>
      <Footer/>
    </>
  );
};

export default App;

