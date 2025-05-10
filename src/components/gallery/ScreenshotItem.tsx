
import React from 'react';
import { Screenshot } from './ScreenshotData';
import { CarouselItem } from '@/components/ui/carousel';

interface ScreenshotItemProps {
  screenshot: Screenshot;
  index: number;
}

const ScreenshotItem: React.FC<ScreenshotItemProps> = ({ screenshot, index }) => {
  return (
    <CarouselItem key={index} className="md:basis-3/4 lg:basis-2/3">
      <div className="relative h-[500px] w-full p-1">
        <div className="overflow-hidden rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl h-full flex items-center justify-center bg-white">
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-3 rounded-lg shadow-md animate-fade-in">
            <h3 className="font-semibold text-gray-900 text-lg">{screenshot.title}</h3>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default ScreenshotItem;
