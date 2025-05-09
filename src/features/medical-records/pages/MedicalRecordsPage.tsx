
import { useState } from "react";
import PageLayout from "@/shared/components/PageLayout";
import { FileText, Plus, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { toast } from "sonner";
import MedicalRecordForm from "../components/MedicalRecordForm";
import DeleteConfirmation from "@/shared/components/DeleteConfirmation";

// Define medical record type
interface MedicalRecordType {
  id?: string;
  patientName: string;
  patientId: string;
  recordDate: string;
  diagnosis: string;
  doctorName: string;
  notes?: string;
}

// Sample medical records data
const initialMedicalRecords: MedicalRecordType[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "P-12345",
    recordDate: "2025-05-01",
    diagnosis: "Hypertension",
    doctorName: "Dr. Smith",
    notes: "Blood pressure: 140/90. Prescribed Lisinopril 10mg daily.",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "P-23456",
    recordDate: "2025-05-02",
    diagnosis: "Diabetes Type 2",
    doctorName: "Dr. Johnson",
    notes: "Blood glucose: 180 mg/dL. Prescribed Metformin 500mg twice daily.",
  },
  {
    id: "3",
    patientName: "Robert Brown",
    patientId: "P-34567",
    recordDate: "2025-05-03",
    diagnosis: "Acute Bronchitis",
    doctorName: "Dr. Lee",
    notes: "Prescribed antibiotics and cough syrup. Follow-up in 1 week.",
  },
];

const MedicalRecordsPage = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordType[]>(initialMedicalRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecordType | null>(null);

  // Filter records based on search query
  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateRecord = () => {
    setCurrentRecord(null);
    setIsFormOpen(true);
  };

  const handleEditRecord = (record: MedicalRecordType) => {
    setCurrentRecord(record);
    setIsFormOpen(true);
  };

  const handleViewRecord = (record: MedicalRecordType) => {
    setCurrentRecord(record);
    setIsViewOpen(true);
  };

  const handleDeletePrompt = (record: MedicalRecordType) => {
    setCurrentRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRecord = () => {
    if (currentRecord?.id) {
      setMedicalRecords(medicalRecords.filter((r) => r.id !== currentRecord.id));
      toast.success("Medical record deleted successfully");
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmitRecord = (data: MedicalRecordType) => {
    if (data.id) {
      // Update existing record
      setMedicalRecords(
        medicalRecords.map((r) => (r.id === data.id ? data : r))
      );
    } else {
      // Create new record
      const newRecord = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setMedicalRecords([...medicalRecords, newRecord]);
    }
  };

  return (
    <PageLayout
      title="Medical Records"
      actionButton={{
        label: "New Record",
        onClick: handleCreateRecord,
        icon: <Plus className="h-4 w-4" />,
      }}
      onSearch={handleSearch}
    >
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Patient ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No medical records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.patientName}</TableCell>
                  <TableCell>{record.patientId}</TableCell>
                  <TableCell>{record.recordDate}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.doctorName}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewRecord(record)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRecord(record)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePrompt(record)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Medical Record Form Dialog */}
      <MedicalRecordForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmitRecord}
        currentRecord={currentRecord}
      />

      {/* View Medical Record Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Medical Record Details</DialogTitle>
          </DialogHeader>
          {currentRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient Name</p>
                  <p>{currentRecord.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p>{currentRecord.patientId}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Record Date</p>
                <p>{currentRecord.recordDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Diagnosis</p>
                <p>{currentRecord.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor Name</p>
                <p>{currentRecord.doctorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {currentRecord.notes || "No notes provided"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRecord}
        title="Are you sure?"
        description={`This will permanently delete the medical record for ${currentRecord?.patientName || "this patient"}. This action cannot be undone.`}
      />
    </PageLayout>
  );
};

export default MedicalRecordsPage;
