import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const CarouselBanner = () => {
  return (
    <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
      <div>
        <img src="https://golden-harvest-s3.s3.amazonaws.com/banner-slider/fruitcrop.webp" alt="Slide 1" />
      </div>
      <div>
        <img src="https://golden-harvest-s3.s3.amazonaws.com/banner-slider/paddycrop.webp" alt="Slide 2" />
      </div>
      <div>
        <img src="https://golden-harvest-s3.s3.amazonaws.com/banner-slider/vegetablecrop.webp" alt="Slide 3" />
      </div>
    </Carousel>
  );
};

export default CarouselBanner;
