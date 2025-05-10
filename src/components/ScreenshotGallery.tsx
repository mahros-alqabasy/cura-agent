import { useState } from 'react';
import { cn } from '@/lib/utils';



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

  const goToPrev = () => {
    setActiveIndex(prev => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the key features and user interfaces of Cura Agent
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${screenshots.length * 100}%` }}
          >
            {screenshots.map((screenshot, index) => (
              <div key={index} className="w-full flex-shrink-0 flex items-center justify-center">
                <div className="relative w-full h-[600px] px-4">
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-3 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-900 text-lg">{screenshot.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-colors duration-200',
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotGallery;
