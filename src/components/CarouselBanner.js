import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const CarouselBanner = () => {
  return (
    <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
      <div>
        <img src="http://golden-harvest.test/media/vege_banner_images/20240728063924_pro.jpeg" alt="Slide 1" />
      </div>
      <div>
        <img src="http://golden-harvest.test/media/vege_banner_images/20240728124209_pro.jpeg" alt="Slide 2" />
      </div>
      <div>
        <img src="http://golden-harvest.test/media/vege_banner_images/20240728124209_pro.jpeg" alt="Slide 3" />
      </div>
    </Carousel>
  );
};

export default CarouselBanner;
