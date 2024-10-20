import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <Sidebar
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
          />
          <div className="main-content">
            <CarouselBanner />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id/:type" element={<BlogDetails blog={selectedBlog} />} />
              <Route path="/vegetable-crop" element={<VegetableCrop />} />
              <Route path="/paddy-crop" element={<PaddyCrop />} />
              <Route path="/fruit-crop" element={<FruitCrop />} />
            </Routes>
          </div>
        </div>
        <svg
            className="butterfly"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path
              fill="yellow"
              d="M25 0C11.193 0 0 11.193 0 25s11.193 25 25 25 25-11.193 25-25S38.807 0 25 0zm0 46c-11.046 0-20-8.954-20-20S13.954 6 25 6s20 8.954 20 20-8.954 20-20 20z"
            />
          </svg>
      </div>
    </Router>
  );
}

export default App;
