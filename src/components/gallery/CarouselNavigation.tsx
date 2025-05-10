
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface CarouselNavigationProps {
  screenshots: { title: string }[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({ 
  screenshots, 
  activeIndex, 
  onDotClick 
}) => {
  return (
    <>
      <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex justify-center gap-2 mt-4">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-colors duration-200',
              index === activeIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow h-10 w-10">
        <ChevronLeft className="h-6 w-6" />
      </CarouselPrevious>

      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 shadow h-10 w-10">
        <ChevronRight className="h-6 w-6" />
      </CarouselNext>
    </>
  );
};

export default CarouselNavigation;
