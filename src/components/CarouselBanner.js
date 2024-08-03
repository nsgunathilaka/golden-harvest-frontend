import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const CarouselBanner = () => {
  return (
    <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
      <div>
        <img src="https://png.pngtree.com/background/20210710/original/pngtree-healthy-fruits-and-vegetables-green-leaves-literary-green-banner-picture-image_1035930.jpg" alt="Slide 1" />
      </div>
      <div>
        <img src="https://t4.ftcdn.net/jpg/07/43/02/57/360_F_743025736_bJAbsrYxwsiKALpyf8wv1bPrPOds5NJW.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="https://www.shutterstock.com/image-photo/fresh-vegetables-fruits-over-green-260nw-344971007.jpg" alt="Slide 3" />
      </div>
    </Carousel>
  );
};

export default CarouselBanner;
