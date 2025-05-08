
import PageLayout from "@/components/PageLayout";
import { FileText, Plus } from "lucide-react";

const MedicalRecords = () => {
  return (
    <PageLayout
      title="Medical Records"
      actionButton={{
        label: "New Record",
        onClick: () => alert("Create medical record functionality will be implemented here"),
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="bg-white rounded-md border p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center text-gray-500">
            <FileText className="h-12 w-12 mb-4" />
            <p className="text-lg">Medical records management coming soon</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MedicalRecords;
