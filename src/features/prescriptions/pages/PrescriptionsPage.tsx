
import PageLayout from "@/shared/components/PageLayout";
import { PillIcon, Plus } from "lucide-react";

const Prescriptions = () => {
  return (
    <PageLayout
      title="Prescriptions"
      actionButton={{
        label: "New Prescription",
        onClick: () => alert("Create prescription functionality will be implemented here"),
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="bg-white rounded-md border p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center text-gray-500">
            <PillIcon className="h-12 w-12 mb-4" />
            <p className="text-lg">Prescription management coming soon</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Prescriptions;
