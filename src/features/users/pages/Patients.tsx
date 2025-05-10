import { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

// Mock data for patients
const initialPatients = [
    {
        id: "p1",
        firstName: "Eslam",
        lastName: "Mohamed",
        nationalId: "2920184923",
        email: "eslam.mohamed@example.com",
        mobile: "+201023456789",
        role: "patient"
    },
    {
        id: "p2",
        firstName: "Omar",
        lastName: "Ahmed",
        nationalId: "2920185124",
        email: "omar.ahmed@example.com",
        mobile: "+201023456790",
        role: "patient"
    },
    {
        id: "p3",
        firstName: "Mahmoud",
        lastName: "Samir",
        nationalId: "2920183821",
        email: "mahmoud.samir@example.com",
        mobile: "+201023456791",
        role: "patient"
    }
];

const Patients = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [formOpen, setFormOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleCreatePatient = (patientData: any) => {
        // In a real application, you would call an API to create the patient
        const newPatient = {
            id: `p${Date.now()}`,
            ...patientData
        };
        setPatients([...patients, newPatient]);
        setFormOpen(false);
    };

    const handleUpdatePatient = (id: string, patientData: any) => {
        // In a real application, you would call an API to update the patient
        setPatients(patients.map(patient =>
            patient.id === id ? { ...patient, ...patientData } : patient
        ));
    };

    const handleDeletePatient = (id: string) => {
        // In a real application, you would call an API to delete the patient
        setPatients(patients.filter(patient => patient.id !== id));
    };

    const handleViewPatient = (patient: any) => {
        // In a real application, you would navigate to a detailed view page
        alert(`Viewing patient: ${patient.firstName} ${patient.lastName}`);
    };

    const filteredPatients = patients.filter(
        patient =>
            patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.nationalId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PageLayout
            title="Patients Management"
            actionButton={{
                label: "Add Patient",
                onClick: () => setFormOpen(true),
                icon: <Plus className="h-4 w-4" />
            }}
            onSearch={setSearchQuery}
        >
            <UserList
                users={filteredPatients}
                userType="patient"
                onUserCreate={handleCreatePatient}
                onUserUpdate={handleUpdatePatient}
                onUserDelete={handleDeletePatient}
                onUserView={handleViewPatient}
            />

            <UserForm
                open={formOpen}
                onOpenChange={setFormOpen}
                onSubmit={handleCreatePatient}
                userType="patient"
            />
        </PageLayout>
    );
};

export default Patients; 