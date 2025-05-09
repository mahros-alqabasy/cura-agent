
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { toast } from "sonner";

// Define medical record schema
const medicalRecordSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  recordDate: z.string().min(1, "Date is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  notes: z.string().optional(),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

interface MedicalRecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MedicalRecordFormValues & { id?: string }) => void;
  currentRecord: (MedicalRecordFormValues & { id?: string }) | null;
}

const MedicalRecordForm = ({ open, onOpenChange, onSubmit, currentRecord }: MedicalRecordFormProps) => {
  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      patientName: currentRecord?.patientName || "",
      patientId: currentRecord?.patientId || "",
      recordDate: currentRecord?.recordDate || "",
      diagnosis: currentRecord?.diagnosis || "",
      doctorName: currentRecord?.doctorName || "",
      notes: currentRecord?.notes || "",
    }
  });

  const handleSubmit = (values: MedicalRecordFormValues) => {
    const submissionData = currentRecord?.id 
      ? { ...values, id: currentRecord.id }
      : values;
    
    onSubmit(submissionData);
    onOpenChange(false);
    toast.success(`Medical record ${currentRecord ? 'updated' : 'created'} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {currentRecord ? "Edit Medical Record" : "Create New Medical Record"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for this medical record. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                      <FormMessage />
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
                      <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordForm;
