import { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

// Mock data for doctors
const initialDoctors = [
  {
    id: "d1",
    firstName: "Ahmed",
    lastName: "Mahros",
    nationalId: "2910284714",
    email: "ahmed.mahros@curaagent.com",
    mobile: "+201123456789",
    specialty: "Cardiology",
    role: "doctor"
  },
  {
    id: "d2",
    firstName: "Mohamed",
    lastName: "Ali",
    nationalId: "2910285812",
    email: "mohamed.ali@curaagent.com",
    mobile: "+201123456790",
    specialty: "Neurology",
    role: "doctor"
  },
  {
    id: "d3",
    firstName: "Karim",
    lastName: "Hassan",
    nationalId: "2910283698",
    email: "karim.hassan@curaagent.com",
    mobile: "+201123456791",
    specialty: "Pediatrics",
    role: "doctor"
  }
];

const Doctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateDoctor = (doctorData: any) => {
    // In a real application, you would call an API to create the doctor
    const newDoctor = {
      id: `d${Date.now()}`,
      ...doctorData
    };
    setDoctors([...doctors, newDoctor]);
    setFormOpen(false);
  };

  const handleUpdateDoctor = (id: string, doctorData: any) => {
    // In a real application, you would call an API to update the doctor
    setDoctors(doctors.map(doctor => 
      doctor.id === id ? {...doctor, ...doctorData} : doctor
    ));
  };

  const handleDeleteDoctor = (id: string) => {
    // In a real application, you would call an API to delete the doctor
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const handleViewDoctor = (doctor: any) => {
    // In a real application, you would navigate to a detailed view page
    alert(`Viewing doctor: ${doctor.firstName} ${doctor.lastName}`);
  };

  const filteredDoctors = doctors.filter(
    doctor =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.nationalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageLayout
      title="Doctors Management"
      actionButton={{
        label: "Add Doctor",
        onClick: () => setFormOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      onSearch={setSearchQuery}
    >
      <UserList
        users={filteredDoctors}
        userType="doctor"
        onUserCreate={handleCreateDoctor}
        onUserUpdate={handleUpdateDoctor}
        onUserDelete={handleDeleteDoctor}
        onUserView={handleViewDoctor}
      />

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateDoctor}
        userType="doctor"
      />
    </PageLayout>
  );
};

export default Doctors; 