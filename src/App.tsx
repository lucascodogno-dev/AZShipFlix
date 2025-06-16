import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './pages/Home';
import { EpisodeDetail } from './pages/EpisodeDetail';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';
import { BackToTopButton } from './components/BackToTopButton';
import { Header } from './components/Header';
import { CharacterList } from './pages/CharacterList';
import { ScrollToTopPage } from './components/ScrollToTopPage';
import { useEffect, useState } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ScrollToTopPage />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={{
            initial: { opacity: 0, x: -100 },
            in: { opacity: 1, x: 0 },
            out: { opacity: 0, x: 100 },
          }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/episode/:id" element={<EpisodeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <BackToTopButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;