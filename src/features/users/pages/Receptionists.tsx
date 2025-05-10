import { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

// Mock data for receptionists
const initialReceptionists = [
  {
    id: "r1",
    firstName: "Hesham",
    lastName: "Fawzy",
    nationalId: "2940162734",
    email: "hesham.fawzy@curaagent.com",
    mobile: "+201323456789",
    role: "receptionist"
  },
  {
    id: "r2",
    firstName: "Sherif",
    lastName: "Nouh",
    nationalId: "2940165831",
    email: "sherif.nouh@curaagent.com",
    mobile: "+201323456790",
    role: "receptionist"
  },
  {
    id: "r3",
    firstName: "Amgad",
    lastName: "Talaat",
    nationalId: "2940163742",
    email: "amgad.talaat@curaagent.com",
    mobile: "+201323456791",
    role: "receptionist"
  }
];

const Receptionists = () => {
  const [receptionists, setReceptionists] = useState(initialReceptionists);
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateReceptionist = (receptionistData: any) => {
    // In a real application, you would call an API to create the receptionist
    const newReceptionist = {
      id: `r${Date.now()}`,
      ...receptionistData
    };
    setReceptionists([...receptionists, newReceptionist]);
    setFormOpen(false);
  };

  const handleUpdateReceptionist = (id: string, receptionistData: any) => {
    // In a real application, you would call an API to update the receptionist
    setReceptionists(receptionists.map(receptionist => 
      receptionist.id === id ? {...receptionist, ...receptionistData} : receptionist
    ));
  };

  const handleDeleteReceptionist = (id: string) => {
    // In a real application, you would call an API to delete the receptionist
    setReceptionists(receptionists.filter(receptionist => receptionist.id !== id));
  };

  const handleViewReceptionist = (receptionist: any) => {
    // In a real application, you would navigate to a detailed view page
    alert(`Viewing receptionist: ${receptionist.firstName} ${receptionist.lastName}`);
  };

  const filteredReceptionists = receptionists.filter(
    receptionist =>
      receptionist.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receptionist.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receptionist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receptionist.nationalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Receptionists Management"
      actionButton={{
        label: "Add Receptionist",
        onClick: () => setFormOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      onSearch={setSearchQuery}
    >
      <UserList
        users={filteredReceptionists}
        userType="receptionist"
        onUserCreate={handleCreateReceptionist}
        onUserUpdate={handleUpdateReceptionist}
        onUserDelete={handleDeleteReceptionist}
        onUserView={handleViewReceptionist}
      />

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateReceptionist}
        userType="receptionist"
      />
    </PageLayout>
  );
};

export default Receptionists; 