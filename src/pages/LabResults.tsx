
import PageLayout from "@/components/PageLayout";
import { Beaker, Plus } from "lucide-react";

const LabResults = () => {
  return (
    <PageLayout
      title="Lab Results"
      actionButton={{
        label: "Upload Results",
        onClick: () => alert("Upload lab results functionality will be implemented here"),
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="bg-white rounded-md border p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center text-gray-500">
            <Beaker className="h-12 w-12 mb-4" />
            <p className="text-lg">Lab results management coming soon</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LabResults;
