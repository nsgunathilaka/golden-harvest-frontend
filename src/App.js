import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import VegetableCrop from './components/VegetableCrop';
import PaddyCrop from './components/PaddyCrop';
import FruitCrop from './components/FruitCrop';
import CarouselBanner from './components/CarouselBanner';
import Home from './components/Home';
import './App.css';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <PageWithSidebar
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
          />
          <MainContent />
        </div>
      </div>
    </Router>
  );
}

function PageWithSidebar({ selectedDistrict, setSelectedDistrict, selectedCenter, setSelectedCenter }) {
  const location = useLocation();
  const showSidebar = false;

  return (
    <>
      {showSidebar && (
        <Sidebar
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
        />
      )}
    </>
  );
}

function MainContent() {
  const location = useLocation();
  const showSidebarClass = ['/vegetable-crop', '/paddy-crop', '/fruit-crop'].includes(location.pathname);

  return (
    <div className={`main-content ${showSidebarClass ? 'vegetable-crop-content' : ''}`}>
      <CarouselBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id/:type" element={<BlogDetails />} />
        <Route path="/vegetable-crop" element={<VegetableCrop />} />
        <Route path="/paddy-crop" element={<PaddyCrop />} />
        <Route path="/fruit-crop" element={<FruitCrop />} />
      </Routes>
    </div>
  );
}

export default App;
