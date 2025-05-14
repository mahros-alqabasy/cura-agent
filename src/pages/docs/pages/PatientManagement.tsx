
import React from "react";
import DocContent from "../components/DocContent";

const PatientManagement = () => {
  // Table of contents for this page
  const tableOfContents = [
    { id: "overview", title: "Overview", level: 2 },
    { id: "patient-registration", title: "Patient Registration", level: 2 },
    { id: "searching-patients", title: "Searching for Patients", level: 2 },
    { id: "patient-profile", title: "Patient Profile", level: 2 },
    { id: "medical-history", title: "Medical History", level: 3 },
    { id: "appointments", title: "Appointments", level: 3 },
    { id: "lab-results", title: "Lab Results", level: 3 },
    { id: "prescriptions", title: "Prescriptions", level: 3 },
    { id: "editing-patient", title: "Editing Patient Information", level: 2 },
    { id: "archiving-patients", title: "Archiving Patients", level: 2 },
  ];

  return (
    <DocContent
      title="Patient Management"
      lastUpdated={new Date("2025-05-12")}
      author="Cura Documentation Team"
      tableOfContents={tableOfContents}
    >
      <h2 id="overview">Overview</h2>
      <p>
        The Patient Management module is the central hub for all patient-related information in Cura Agent. It allows healthcare providers to register new patients, search for existing patients, view comprehensive medical records, and manage patient information.
      </p>

      <h2 id="patient-registration">Patient Registration</h2>
      <p>
        Registering a new patient is typically handled by reception staff but can be performed by any user with appropriate permissions. Follow these steps to register a new patient:
      </p>

      <ol className="list-decimal pl-5 space-y-3 mb-6">
        <li>
          <strong>Navigate to the Patients module</strong> by clicking "Patients" in the sidebar menu.
        </li>
        <li>
          <strong>Click the "Add Patient" button</strong> in the top right corner of the Patients page.
        </li>
        <li>
          <strong>Complete the patient registration form</strong> with the following information:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Personal Information:</strong> First name, last name, date of birth, gender, national ID</li>
            <li><strong>Contact Information:</strong> Mobile number, email address, residential address</li>
            <li><strong>Emergency Contact:</strong> Name, relationship, and contact number</li>
            <li><strong>Insurance Information:</strong> Provider, policy number, coverage details (if applicable)</li>
            <li><strong>Medical Information:</strong> Allergies, chronic conditions, blood type (if known)</li>
          </ul>
        </li>
        <li>
          <strong>Upload patient photo (optional)</strong> by clicking the camera icon.
        </li>
        <li>
          <strong>Click "Save"</strong> to complete the registration process.
        </li>
      </ol>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-blue-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Note</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                The National ID is used as a unique identifier for patients in the system. If a patient does not have a National ID, the system will generate a temporary identifier.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="searching-patients">Searching for Patients</h2>
      <p>
        Cura Agent offers multiple ways to find patients in the system:
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="font-medium mb-2">Quick Search:</h4>
          <p>
            Use the search bar at the top of the Patients page to search by name, National ID, or mobile number. Results will appear as you type.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Advanced Search:</h4>
          <p>
            Click the filter icon next to the search bar to access advanced search options including:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Date of birth range</li>
            <li>Insurance provider</li>
            <li>Last visit date</li>
            <li>Assigned doctor</li>
            <li>Medical conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Recent Patients:</h4>
          <p>
            The system automatically displays recently accessed patients on your dashboard for quick access.
          </p>
        </div>
      </div>

      <h2 id="patient-profile">Patient Profile</h2>
      <p>
        After selecting a patient, you'll be taken to their comprehensive profile, which includes:
      </p>

      <h3 id="medical-history" className="mt-4">Medical History</h3>
      <p>
        The Medical History tab displays a chronological record of the patient's:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li><strong>Past Diagnoses:</strong> Previously documented conditions and diagnoses</li>
        <li><strong>Surgeries:</strong> Records of surgical procedures with dates</li>
        <li><strong>Chronic Conditions:</strong> Ongoing health issues requiring regular management</li>
        <li><strong>Family History:</strong> Relevant hereditary conditions</li>
        <li><strong>Allergies and Sensitivities:</strong> Known allergic reactions and their severity</li>
      </ul>

      <h3 id="appointments">Appointments</h3>
      <p>
        The Appointments tab shows:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li><strong>Upcoming Appointments:</strong> Scheduled future visits with date, time, and provider</li>
        <li><strong>Past Appointments:</strong> Historical record of previous visits and their outcomes</li>
        <li><strong>Canceled/Missed Appointments:</strong> Record of no-shows or cancellations</li>
      </ul>
      <p>
        From this tab, you can also schedule new appointments by clicking the "Schedule Appointment" button.
      </p>

      <h3 id="lab-results">Lab Results</h3>
      <p>
        The Lab Results tab contains:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li><strong>Recent Results:</strong> Latest laboratory tests with highlighted abnormal values</li>
        <li><strong>Historical Results:</strong> Complete history of laboratory tests</li>
        <li><strong>Pending Tests:</strong> Tests that have been ordered but not yet completed</li>
        <li><strong>Trending Data:</strong> Graphs showing trends for key values like blood glucose, cholesterol, etc.</li>
      </ul>
      <p>
        Click on any result to view detailed information, including reference ranges and doctor's notes.
      </p>

      <h3 id="prescriptions">Prescriptions</h3>
      <p>
        The Prescriptions tab provides:
      </p>
      <ul className="list-disc pl-5 mt-2 mb-4">
        <li><strong>Current Medications:</strong> Active prescribed medications with dosage and instructions</li>
        <li><strong>Medication History:</strong> Previously prescribed medications</li>
        <li><strong>Refill Status:</strong> Information about when prescriptions need to be renewed</li>
        <li><strong>Pharmacy Details:</strong> Where prescriptions were sent</li>
      </ul>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-green-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Tip</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Doctors can create a new prescription directly from the patient profile by clicking "New Prescription" in the Prescriptions tab.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="editing-patient">Editing Patient Information</h2>
      <p>
        To update a patient's information:
      </p>
      <ol className="list-decimal pl-5 space-y-2 mb-6">
        <li>Navigate to the patient's profile</li>
        <li>Click the "Edit" button in the top right corner of the profile</li>
        <li>Make the necessary changes to the patient's information</li>
        <li>Click "Save" to confirm the changes</li>
      </ol>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-amber-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Warning</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                Changes to critical patient information (such as National ID, date of birth) are logged and require additional verification. These changes may be subject to approval by a supervisor in some facilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="archiving-patients">Archiving Patients</h2>
      <p>
        When a patient is no longer active (e.g., deceased, transferred to another facility, or requested removal):
      </p>
      <ol className="list-decimal pl-5 space-y-2 mb-6">
        <li>Navigate to the patient's profile</li>
        <li>Click the "Options" menu (three dots) in the top right corner</li>
        <li>Select "Archive Patient"</li>
        <li>Provide a reason for archiving from the dropdown menu</li>
        <li>Add any additional notes if necessary</li>
        <li>Click "Confirm" to archive the patient record</li>
      </ol>
      <p>
        Archived patient records are not deleted but are hidden from regular searches. Only users with appropriate permissions can access or restore archived records.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-blue-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Note</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Patient data retention is subject to local healthcare regulations and hospital policies. The system will maintain archived records for the legally required period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DocContent>
  );
};

export default PatientManagement;
