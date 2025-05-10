
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

export interface Screenshot {
  src: string;
  alt: string;
  title: string;
}

export const screenshots: Screenshot[] = [
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
