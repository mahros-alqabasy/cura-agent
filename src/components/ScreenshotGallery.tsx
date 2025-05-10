
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import all screenshots
import adminDashboardImage from '/screenshots/admin-dashboard.png';
import aiAssistantImage from '/screenshots/ai-assistatn.png';
import appointmentsImage from '/screenshots/appointments.png';
import doctorDashboardImage from '/screenshots/doctor-dashboard.png';
import helpCenterImage from '/screenshots/help-center.png';
import keyboardShortcutImage from '/screenshots/keyboard-shortcuts.png';
import labResultsImage from '/screenshots/lab-results.png';
import logsPageImage from '/screenshots/logs-page.png';
import medicalRecordsImage from '/screenshots/medical-records.png';
// import patientsManagementImage from '/screenshots/patients-management.png';
import prescriptionsImage from '/screenshots/prescriptions.png';
import profileInformationImage from '/screenshots/profile-information.png';
import profileSettingsImage from '/screenshots/profile-settings.png';
import settingsImage from '/screenshots/settings.png';
import signinPageImage from '/screenshots/signin-page.png';
import signinImage from '/screenshots/signin.png';
import signupImage from '/screenshots/signup-page.png';

interface Screenshot {
  src: string;
  alt: string;
  title: string;
}

const screenshots: Screenshot[] = [
  { src: adminDashboardImage, alt: 'Admin Dashboard', title: 'Admin Dashboard' },
  { src: aiAssistantImage, alt: 'AI Assistant', title: 'AI Assistant' },
  { src: appointmentsImage, alt: 'Appointments', title: 'Appointments' },
  { src: doctorDashboardImage, alt: 'Doctor Dashboard', title: 'Doctor Dashboard' },
  { src: helpCenterImage, alt: 'Help Center', title: 'Help Center' },
  { src: keyboardShortcutImage, alt: 'Keyboard Shortcuts', title: 'Keyboard Shortcuts' },
  { src: labResultsImage, alt: 'Lab Results', title: 'Lab Results' },
  { src: logsPageImage, alt: 'Logs Page', title: 'Logs Page' },
  { src: medicalRecordsImage, alt: 'Medical Records', title: 'Medical Records' },
  // { src: patientsManagementImage, alt: 'Patients Management', title: 'Patients Management' },
  { src: prescriptionsImage, alt: 'Prescriptions', title: 'Prescriptions' },
  { src: profileInformationImage, alt: 'Profile Information', title: 'Profile Information' },
  { src: profileSettingsImage, alt: 'Profile Settings', title: 'Profile Settings' },
  { src: settingsImage, alt: 'Settings', title: 'Settings' },
  { src: signinPageImage, alt: 'Sign In Page', title: 'Sign In Page' },
  { src: signinImage, alt: 'Sign In', title: 'Sign In' },
  { src: signupImage, alt: 'Sign Up Page', title: 'Sign Up Page' },
];

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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the key features and user interfaces of Cura Agent
          </p>
        </div>

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
              ))}
            </CarouselContent>
            
            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex justify-center gap-2 mt-4">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
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
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotGallery;
