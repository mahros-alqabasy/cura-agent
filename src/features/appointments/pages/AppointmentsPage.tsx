
import { useState } from "react";
import PageLayout from "@/shared/components/PageLayout";
import { Plus, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
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
import { AlertDialog } from "@/shared/ui/alert-dialog";
import { toast } from "sonner";
import AppointmentForm from "../components/AppointmentForm";
import DeleteConfirmation from "@/shared/components/DeleteConfirmation";

// Define appointment schema
interface AppointmentType {
  id?: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
}

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

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentType | null>(null);

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
    setIsFormOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentType) => {
    setCurrentAppointment(appointment);
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

  const handleSubmitAppointment = (data: AppointmentType) => {
    if (data.id) {
      // Update existing appointment
      setAppointments(
        appointments.map((a) => (a.id === data.id ? data : a))
      );
    } else {
      // Create new appointment
      const newAppointment = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      setAppointments([...appointments, newAppointment]);
    }
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
      <AppointmentForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleSubmitAppointment}
        currentAppointment={currentAppointment}
      />

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
      <DeleteConfirmation
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteAppointment}
        title="Are you sure?"
        description={`This will permanently delete the appointment for ${currentAppointment?.patientName || "this patient"}. This action cannot be undone.`}
      />
    </PageLayout>
  );
};

export default AppointmentsPage;
