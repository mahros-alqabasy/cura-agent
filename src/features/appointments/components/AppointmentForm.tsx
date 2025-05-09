
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

// Define appointment schema
const appointmentSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AppointmentFormValues & { id?: string }) => void;
  currentAppointment: (AppointmentFormValues & { id?: string }) | null;
}

const AppointmentForm = ({ open, onOpenChange, onSubmit, currentAppointment }: AppointmentFormProps) => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: currentAppointment?.patientName || "",
      doctorName: currentAppointment?.doctorName || "",
      date: currentAppointment?.date || "",
      time: currentAppointment?.time || "",
      status: currentAppointment?.status || "Scheduled",
      notes: currentAppointment?.notes || "",
    }
  });

  const handleSubmit = (values: AppointmentFormValues) => {
    const submissionData = currentAppointment?.id 
      ? { ...values, id: currentAppointment.id }
      : values;
    
    onSubmit(submissionData);
    onOpenChange(false);
    toast.success(`Appointment ${currentAppointment ? 'updated' : 'created'} successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {currentAppointment ? "Edit Appointment" : "Create New Appointment"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for this appointment. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4 py-4">
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="w-full border border-gray-200 rounded-md h-10 px-3"
                        {...field}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
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
                      <Textarea placeholder="Additional notes" {...field} />
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

export default AppointmentForm;
