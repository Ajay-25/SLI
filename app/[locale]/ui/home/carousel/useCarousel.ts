import { useState } from 'react';

const useCarousel = (
  totalItems: number,
): {
  currentIndex: number;
  showNext: () => void;
  showPrev: () => void;
} => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1,
    );
  };

  return {
    currentIndex,
    showNext,
    showPrev,
  };
};

export default useCarousel;
