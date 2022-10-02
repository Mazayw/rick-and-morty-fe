import MainPage from './components/pages/main-page/index';
import './app.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/not-found/index';
import Menu from 'components/header';
import About from 'components/pages/about';

function App() {
  return (
    <div className="dotted">
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
