
import { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from "@/shared/components/PageLayout";
import UserList from "@/shared/components/UserList";
import UserForm from "@/shared/components/UserForm";

// Mock data for nurses
const initialNurses = [
  {
    id: "n1",
    firstName: "Adel",
    lastName: "Ibrahim",
    nationalId: "2930172834",
    email: "adel.ibrahim@curaagent.com",
    mobile: "+201223456789",
    role: "nurse"
  },
  {
    id: "n2",
    firstName: "Kareem",
    lastName: "Mostafa",
    nationalId: "2930175631",
    email: "kareem.mostafa@curaagent.com",
    mobile: "+201223456790",
    role: "nurse"
  },
  {
    id: "n3",
    firstName: "Yaser",
    lastName: "Taha",
    nationalId: "2930173942",
    email: "yaser.taha@curaagent.com",
    mobile: "+201223456791",
    role: "nurse"
  }
];

const Nurses = () => {
  const [nurses, setNurses] = useState(initialNurses);
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateNurse = (nurseData: any) => {
    // In a real application, you would call an API to create the nurse
    const newNurse = {
      id: `n${Date.now()}`,
      ...nurseData
    };
    setNurses([...nurses, newNurse]);
    setFormOpen(false);
  };

  const handleUpdateNurse = (id: string, nurseData: any) => {
    // In a real application, you would call an API to update the nurse
    setNurses(nurses.map(nurse => 
      nurse.id === id ? {...nurse, ...nurseData} : nurse
    ));
  };

  const handleDeleteNurse = (id: string) => {
    // In a real application, you would call an API to delete the nurse
    setNurses(nurses.filter(nurse => nurse.id !== id));
  };

  const handleViewNurse = (nurse: any) => {
    // In a real application, you would navigate to a detailed view page
    alert(`Viewing nurse: ${nurse.firstName} ${nurse.lastName}`);
  };

  const filteredNurses = nurses.filter(
    nurse =>
      nurse.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nurse.nationalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Nurses Management"
      actionButton={{
        label: "Add Nurse",
        onClick: () => setFormOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      onSearch={setSearchQuery}
    >
      <UserList
        users={filteredNurses}
        userType="nurse"
        onUserCreate={handleCreateNurse}
        onUserUpdate={handleUpdateNurse}
        onUserDelete={handleDeleteNurse}
        onUserView={handleViewNurse}
      />

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateNurse}
        userType="nurse"
      />
    </PageLayout>
  );
};

export default Nurses;
