
import PageLayout from "@/components/PageLayout";
import { Calendar, Plus } from "lucide-react";

const Appointments = () => {
  return (
    <PageLayout
      title="Appointments"
      actionButton={{
        label: "New Appointment",
        onClick: () => alert("Create appointment functionality will be implemented here"),
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="bg-white rounded-md border p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center text-gray-500">
            <Calendar className="h-12 w-12 mb-4" />
            <p className="text-lg">Appointment calendar and scheduling coming soon</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Appointments;
