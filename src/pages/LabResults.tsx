import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Beaker, Plus, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
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
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

// Define lab result schema
const labResultSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  testType: z.string().min(1, "Test type is required"),
  resultDate: z.string().min(1, "Date is required"),
  result: z.string().min(1, "Result is required"),
  referenceRange: z.string().optional(),
  notes: z.string().optional(),
  orderedBy: z.string().min(1, "Ordering doctor is required"),
});

type LabResultType = z.infer<typeof labResultSchema>;

// Sample lab results data
const initialLabResults: LabResultType[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "P-12345",
    testType: "Complete Blood Count (CBC)",
    resultDate: "2025-05-01",
    result: "Normal",
    referenceRange: "WBC: 4.5-11.0 K/uL, RBC: 4.5-5.9 M/uL, HGB: 13.5-17.5 g/dL",
    notes: "Follow-up in 6 months recommended.",
    orderedBy: "Dr. Smith",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "P-23456",
    testType: "Lipid Panel",
    resultDate: "2025-05-02",
    result: "Abnormal",
    referenceRange: "LDL: <130 mg/dL, HDL: >40 mg/dL, Total Chol: <200 mg/dL",
    notes: "LDL elevated at 145 mg/dL. Dietary changes recommended.",
    orderedBy: "Dr. Johnson",
  },
  {
    id: "3",
    patientName: "Robert Brown",
    patientId: "P-34567",
    testType: "Comprehensive Metabolic Panel",
    resultDate: "2025-05-03",
    result: "Normal",
    referenceRange: "Multiple parameters within normal limits",
    notes: "",
    orderedBy: "Dr. Lee",
  },
];

const LabResults = () => {
  const [labResults, setLabResults] = useState<LabResultType[]>(initialLabResults);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<LabResultType | null>(null);

  const form = useForm<LabResultType>({
    resolver: zodResolver(labResultSchema),
    defaultValues: {
      patientName: "",
      patientId: "",
      testType: "",
      resultDate: "",
      result: "",
      referenceRange: "",
      notes: "",
      orderedBy: "",
    },
  });

  // Filter results based on search query
  const filteredResults = labResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateResult = () => {
    setCurrentResult(null);
    form.reset({
      patientName: "",
      patientId: "",
      testType: "",
      resultDate: "",
      result: "",
      referenceRange: "",
      notes: "",
      orderedBy: "",
    });
    setIsFormOpen(true);
  };

  const handleEditResult = (result: LabResultType) => {
    setCurrentResult(result);
    form.reset(result);
    setIsFormOpen(true);
  };

  const handleViewResult = (result: LabResultType) => {
    setCurrentResult(result);
    setIsViewOpen(true);
  };

  const handleDeletePrompt = (result: LabResultType) => {
    setCurrentResult(result);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteResult = () => {
    if (currentResult?.id) {
      setLabResults(labResults.filter((r) => r.id !== currentResult.id));
      toast.success("Lab result deleted successfully");
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = (data: LabResultType) => {
    if (currentResult?.id) {
      // Update existing result
      setLabResults(
        labResults.map((r) => (r.id === currentResult.id ? { ...data, id: currentResult.id } : r))
      );
      toast.success("Lab result updated successfully");
    } else {
      // Create new result
      const newResult = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setLabResults([...labResults, newResult]);
      toast.success("Lab result created successfully");
    }
    setIsFormOpen(false);
  };

  return (
    <PageLayout
      title="Lab Results"
      actionButton={{
        label: "Upload Results",
        onClick: handleCreateResult,
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
              <TableHead>Test Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No lab results found
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.patientName}</TableCell>
                  <TableCell>{result.patientId}</TableCell>
                  <TableCell>{result.testType}</TableCell>
                  <TableCell>{result.resultDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${result.result.toLowerCase() === "normal"
                        ? "bg-green-100 text-green-800"
                        : result.result.toLowerCase() === "abnormal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {result.result}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewResult(result)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditResult(result)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePrompt(result)}
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

      {/* Lab Result Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{currentResult ? "Edit Lab Result" : "Upload New Lab Result"}</DialogTitle>
            <DialogDescription>
              Fill in the details for this lab result. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <Form {...form}>
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
                    name="testType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter test type" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resultDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Result Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="result"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Result</FormLabel>
                          <FormControl>
                            <select
                              className="w-full border border-gray-200 rounded-md h-10 px-3"
                              {...field}
                            >
                              <option value="">Select result</option>
                              <option value="Normal">Normal</option>
                              <option value="Abnormal">Abnormal</option>
                              <option value="Inconclusive">Inconclusive</option>
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orderedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ordered By</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter doctor name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="referenceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Range</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter reference range" {...field} />
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
                            placeholder="Additional notes about the results"
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
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* View Lab Result Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Lab Result Details</DialogTitle>
          </DialogHeader>
          {currentResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient Name</p>
                  <p>{currentResult.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p>{currentResult.patientId}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Test Type</p>
                <p>{currentResult.testType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Result Date</p>
                <p>{currentResult.resultDate}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Result</p>
                  <p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${currentResult.result.toLowerCase() === "normal"
                        ? "bg-green-100 text-green-800"
                        : currentResult.result.toLowerCase() === "abnormal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {currentResult.result}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ordered By</p>
                  <p>{currentResult.orderedBy}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Reference Range</p>
                <p className="text-gray-700">
                  {currentResult.referenceRange || "No reference range provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {currentResult.notes || "No notes provided"}
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
              This will permanently delete the lab result for{" "}
              {currentResult?.patientName || "this patient"}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteResult} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default LabResults;
