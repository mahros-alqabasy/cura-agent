
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Plus, Pencil, Trash2, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { departmentService } from '@/services/api';
import isDevelopment from '@/conf/Conf';

// Types
interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialty?: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  doctors: Doctor[];
}

// Mock data for development
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Yasser',
    email: 'ahmed.yasser@example.com',
    phone: '01000000000',
    role: 'Senior Doctor',
    specialty: 'Cardiology'
  },
  {
    id: '2',
    name: 'Dr. Sara Mohamed',
    email: 'sara.mohamed@example.com',
    phone: '01111111111',
    role: 'Specialist',
    specialty: 'Neurology'
  },
  {
    id: '3',
    name: 'Dr. Karim Atwa',
    email: 'karim.atwa@example.com',
    phone: '01222222222',
    role: 'Consultant',
    specialty: 'Pediatrics'
  },
  {
    id: '4',
    name: 'Dr. Noha Ali',
    email: 'noha.ali@example.com',
    phone: '01333333333',
    role: 'Specialist',
    specialty: 'Orthopedics'
  },
  {
    id: '5',
    name: 'Dr. Mohamed Hassan',
    email: 'mohamed.hassan@example.com',
    phone: '01444444444',
    role: 'Consultant',
    specialty: 'Dermatology'
  }
];

const MOCK_DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: 'Cardiology',
    description: 'Department specializing in heart-related conditions and treatments.',
    doctors: [MOCK_DOCTORS[0]]
  },
  {
    id: '2',
    name: 'Neurology',
    description: 'Department focused on disorders of the nervous system.',
    doctors: [MOCK_DOCTORS[1]]
  },
  {
    id: '3',
    name: 'Pediatrics',
    description: 'Department focused on medical care of infants, children, and adolescents.',
    doctors: [MOCK_DOCTORS[2]]
  }
];

// Form validation schema
const departmentFormSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  description: z.string().min(1, 'Description is required'),
  doctorIds: z.array(z.string()).min(1, 'At least one doctor must be assigned')
});

type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  
  // Initialize the form with react-hook-form
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      doctorIds: []
    }
  });

  // Load departments data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isDevelopment) {
          // Simulate loading delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setDepartments(MOCK_DEPARTMENTS);
          setDoctors(MOCK_DOCTORS);
        } else {
          const departmentsData = await departmentService.getAllDepartments();
          setDepartments(departmentsData);
          // Assuming there's a way to fetch all doctors
          const doctorsData = await fetch('/api/doctors').then(res => res.json());
          setDoctors(doctorsData);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
        toast.error('Failed to load departments data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateDialog = () => {
    setCurrentDepartment(null);
    form.reset({
      name: '',
      description: '',
      doctorIds: []
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (department: Department) => {
    setCurrentDepartment(department);
    form.reset({
      name: department.name,
      description: department.description,
      doctorIds: department.doctors.map(doctor => doctor.id)
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDepartment = async (departmentId: string) => {
    if (!confirm('Are you sure you want to delete this department?')) return;
    
    try {
      setIsLoading(true);
      
      if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDepartments(prevDepartments => 
          prevDepartments.filter(dep => dep.id !== departmentId)
        );
      } else {
        await departmentService.deleteDepartment(departmentId);
        setDepartments(prevDepartments => 
          prevDepartments.filter(dep => dep.id !== departmentId)
        );
      }
      
      toast.success('Department deleted successfully');
    } catch (error) {
      console.error('Failed to delete department:', error);
      toast.error('Failed to delete department. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      setIsLoading(true);
      
      // Get the selected doctors based on IDs
      const selectedDoctors = doctors.filter(doc => data.doctorIds.includes(doc.id));
      
      // Create the department object
      const departmentData = {
        name: data.name,
        description: data.description,
        doctors: selectedDoctors
      };

      if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (currentDepartment) {
          // Update existing department
          const updatedDepartment = {
            ...currentDepartment,
            ...departmentData
          };
          
          setDepartments(prevDepartments => 
            prevDepartments.map(dep => 
              dep.id === currentDepartment.id ? updatedDepartment : dep
            )
          );
          
          toast.success(`Department "${data.name}" updated successfully`);
        } else {
          // Create new department
          const newDepartment: Department = {
            id: `dep_${Date.now()}`, // Generate a mock ID
            ...departmentData
          };
          
          setDepartments(prevDepartments => [...prevDepartments, newDepartment]);
          toast.success(`Department "${data.name}" created successfully`);
        }
      } else {
        if (currentDepartment) {
          // Update existing department
          await departmentService.updateDepartment(currentDepartment.id, departmentData);
          
          // Refresh departments list
          const updatedDepartments = await departmentService.getAllDepartments();
          setDepartments(updatedDepartments);
          
          toast.success(`Department "${data.name}" updated successfully`);
        } else {
          // Create new department
          await departmentService.createDepartment(departmentData);
          
          // Refresh departments list
          const updatedDepartments = await departmentService.getAllDepartments();
          setDepartments(updatedDepartments);
          
          toast.success(`Department "${data.name}" created successfully`);
        }
      }
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      form.reset();
      
    } catch (error) {
      console.error('Failed to save department:', error);
      toast.error('Failed to save department. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments Management</h1>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create Department
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10 w-full md:max-w-xs"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">Loading departments...</div>
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No departments found</p>
          <Button onClick={handleOpenCreateDialog} variant="outline">
            Create your first department
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{department.name}</CardTitle>
                    <CardDescription className="mt-1">{department.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenEditDialog(department)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteDepartment(department.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-start mb-3">
                  <User className="w-4 h-4 text-gray-500 mr-2 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Doctors ({department.doctors.length})</p>
                  </div>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-3 pl-6">
                  {department.doctors.length > 0 ? (
                    department.doctors.map((doctor) => (
                      <div key={doctor.id} className="text-sm">
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-gray-500 text-xs">{doctor.specialty || doctor.role}</p>
                        <p className="text-gray-500 text-xs">{doctor.email}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No doctors assigned</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between">
                <Badge variant="outline" className="text-xs">
                  {department.doctors.length} {department.doctors.length === 1 ? 'doctor' : 'doctors'}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => handleOpenEditDialog(department)}>
                  <Pencil className="mr-2 h-3 w-3" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Department Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentDepartment ? 'Edit Department' : 'Create New Department'}
            </DialogTitle>
            <DialogDescription>
              {currentDepartment
                ? 'Update department information and doctor assignments.'
                : 'Enter details for the new department and assign doctors.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter department description"
                        {...field}
                        className="resize-none"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="doctorIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Doctors</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const selectedValues = value.split(',');
                          field.onChange(selectedValues);
                        }}
                        value={field.value.join(',')}
                        multiple
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select doctors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Doctors</SelectLabel>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialty || doctor.role}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.getValues('doctorIds').length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Doctors:</Label>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues('doctorIds').map(id => {
                      const doctor = doctors.find(d => d.id === id);
                      return doctor ? (
                        <Badge key={id} variant="secondary" className="text-xs py-1">
                          {doctor.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading 
                    ? 'Saving...' 
                    : currentDepartment 
                      ? 'Update Department' 
                      : 'Create Department'
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;
