import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Calendar, Plus, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
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
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

// Define appointment schema
const appointmentSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional(),
});

type AppointmentType = z.infer<typeof appointmentSchema>;

// Sample appointments data
const initialAppointments: AppointmentType[] = [
  {
    id: "1",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    date: "2025-05-10",
    time: "09:00",
    status: "Scheduled",
    notes: "Regular checkup",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctorName: "Dr. Johnson",
    date: "2025-05-11",
    time: "10:30",
    status: "Confirmed",
    notes: "Follow-up appointment",
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctorName: "Dr. Lee",
    date: "2025-05-12",
    time: "14:00",
    status: "Pending",
    notes: "Initial consultation",
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentType | null>(null);

  const form = useForm<AppointmentType>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
      status: "Scheduled",
      notes: "",
    },
  });

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateAppointment = () => {
    setCurrentAppointment(null);
    form.reset({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
      status: "Scheduled",
      notes: "",
    });
    setIsFormOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentType) => {
    setCurrentAppointment(appointment);
    form.reset(appointment);
    setIsFormOpen(true);
  };

  const handleViewAppointment = (appointment: AppointmentType) => {
    setCurrentAppointment(appointment);
    setIsViewOpen(true);
  };

  const handleDeletePrompt = (appointment: AppointmentType) => {
    setCurrentAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAppointment = () => {
    if (currentAppointment?.id) {
      setAppointments(appointments.filter((a) => a.id !== currentAppointment.id));
      toast.success("Appointment deleted successfully");
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = (data: AppointmentType) => {
    if (currentAppointment?.id) {
      // Update existing appointment
      setAppointments(
        appointments.map((a) => (a.id === currentAppointment.id ? { ...data, id: currentAppointment.id } : a))
      );
      toast.success("Appointment updated successfully");
    } else {
      // Create new appointment
      const newAppointment = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setAppointments([...appointments, newAppointment]);
      toast.success("Appointment created successfully");
    }
    setIsFormOpen(false);
  };

  return (
    <PageLayout
      title="Appointments"
      actionButton={{
        label: "New Appointment",
        onClick: handleCreateAppointment,
        icon: <Plus className="h-4 w-4" />,
      }}
      onSearch={handleSearch}
    >
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${appointment.status === "Scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {appointment.status}
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
                        <DropdownMenuItem onClick={() => handleViewAppointment(appointment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePrompt(appointment)}
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

      {/* Appointment Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {currentAppointment ? "Edit Appointment" : "Create New Appointment"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for this appointment. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* View Appointment Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {currentAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient Name</p>
                  <p>{currentAppointment.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Doctor Name</p>
                  <p>{currentAppointment.doctorName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{currentAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p>{currentAppointment.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${currentAppointment.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : currentAppointment.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {currentAppointment.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="text-gray-700">{currentAppointment.notes || "No notes provided"}</p>
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
              This will permanently delete the appointment for{" "}
              {currentAppointment?.patientName || "this patient"}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAppointment} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default Appointments;
