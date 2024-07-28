import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CarouselBanner from './components/CarouselBanner';
import './App.css';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Sidebar selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />
          <div className="main-content">
            <CarouselBanner />
            <div class="text-center mt-3">
            <span class="section-topic">Vegetable Crop Blogs</span>
            </div>
            <Routes>
              <Route path="/" element={<BlogList selectedDistrict={selectedDistrict} />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
