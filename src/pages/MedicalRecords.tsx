
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { FileText, Plus, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

// Define medical record schema
const medicalRecordSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  recordDate: z.string().min(1, "Date is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  notes: z.string().optional(),
});

type MedicalRecordType = z.infer<typeof medicalRecordSchema>;

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

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordType[]>(initialMedicalRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecordType | null>(null);

  const form = useForm<MedicalRecordType>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      patientName: "",
      patientId: "",
      recordDate: "",
      diagnosis: "",
      doctorName: "",
      notes: "",
    },
  });

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
    form.reset({
      patientName: "",
      patientId: "",
      recordDate: "",
      diagnosis: "",
      doctorName: "",
      notes: "",
    });
    setIsFormOpen(true);
  };

  const handleEditRecord = (record: MedicalRecordType) => {
    setCurrentRecord(record);
    form.reset(record);
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

  const onSubmit = (data: MedicalRecordType) => {
    if (currentRecord?.id) {
      // Update existing record
      setMedicalRecords(
        medicalRecords.map((r) => (r.id === currentRecord.id ? { ...data, id: currentRecord.id } : r))
      );
      toast.success("Medical record updated successfully");
    } else {
      // Create new record
      const newRecord = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setMedicalRecords([...medicalRecords, newRecord]);
      toast.success("Medical record created successfully");
    }
    setIsFormOpen(false);
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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {currentRecord ? "Edit Medical Record" : "Create New Medical Record"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for this medical record. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient ID" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="recordDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter diagnosis" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter doctor name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional notes and treatment details"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the medical record for{" "}
              {currentRecord?.patientName || "this patient"}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRecord} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default MedicalRecords;
