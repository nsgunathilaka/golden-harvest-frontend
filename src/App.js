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
              <Route
                path="/"
                element={<BlogList selectedDistrict={selectedDistrict} selectedCenter={selectedCenter} setSelectedBlog={setSelectedBlog} />}
              />
              <Route path="/blog/:id/:type" element={<BlogDetails blog={selectedBlog} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
