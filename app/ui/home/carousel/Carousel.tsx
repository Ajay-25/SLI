'use client';

import React from 'react';
import useCarousel from './useCarousel';

//components
import { Video } from '../video';

const BannerImageSection = () => {
  return (
    <div className="h-[60rem] w-full bg-[url('/home/home-background.webp')] bg-cover bg-center"></div>
  );
};

const carouselItems = [BannerImageSection, Video];

const Carousel = () => {
  const { currentIndex, showPrev, showNext } = useCarousel(2);

  const CarouselItem = carouselItems[currentIndex];

  return (
    <div className="relative">
      <div
        className="absolute left-0 top-1/2 z-10 cursor-pointer rounded-full pl-4"
        onClick={showPrev}
      >
        <svg
          data-spaceweb="icon"
          viewBox="0 0 14 14"
          data-icon-name="SolidChevronLeft"
          className="h-12 w-12 fill-sos-primary-gold"
        >
          <path d="M10.693 13.728a.931.931 0 00-.001-1.316L5.282 7l5.41-5.41A.93.93 0 009.379.271h-.001l-6.07 6.07a.931.931 0 000 1.316l6.069 6.07a.931.931 0 001.316 0z"></path>
        </svg>
      </div>
      <div className="carousel-item">
        <CarouselItem />
      </div>
      <div
        className="absolute right-0 top-1/2 cursor-pointer rounded-full pr-4"
        onClick={showNext}
      >
        <svg
          data-spaceweb="icon"
          viewBox="0 0 14 14"
          data-icon-name="SolidChevronRight"
          className="h-12 w-12 fill-sos-primary-gold"
        >
          <path d="M3.307.272a.931.931 0 00.001 1.316L8.718 7l-5.41 5.41a.93.93 0 001.313 1.318h.001l6.07-6.07a.931.931 0 000-1.316L4.623.272a.931.931 0 00-1.316 0z"></path>
        </svg>
      </div>
    </div>
  );
};

export { Carousel };
