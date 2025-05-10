
import { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from '@/components/ui/carousel';

import { screenshots } from './gallery/ScreenshotData';
import ScreenshotItem from './gallery/ScreenshotItem';
import CarouselNavigation from './gallery/CarouselNavigation';

const ScreenshotGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Set up auto-play functionality
  useEffect(() => {
    if (!api) return;

    // Set up an interval to automatically advance the carousel
    const autoPlayInterval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(autoPlayInterval);
  }, [api]);

  // Use the onSelect callback to update activeIndex
  const onSelect = useCallback(() => {
    if (!api) return;
    const currentSlide = api.selectedScrollSnap();
    setActiveIndex(currentSlide);
  }, [api]);

  // Setup the carousel API and event listeners
  useEffect(() => {
    if (!api) return;

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="py-1 bg-white">
      <div className="container mx-auto px-0">
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              align: "center",
              dragFree: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {screenshots.map((screenshot, index) => (
                <ScreenshotItem 
                  key={index} 
                  screenshot={screenshot} 
                  index={index} 
                />
              ))}
            </CarouselContent>

            <CarouselNavigation 
              screenshots={screenshots} 
              activeIndex={activeIndex} 
              onDotClick={handleDotClick}
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotGallery;
