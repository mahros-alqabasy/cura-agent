
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import {
  ArrowRight,
  RefreshCw,
  MoreVertical,
  Calendar,
  Phone,
  Video,
  FileText,
  Check,
  ChevronRight,
  ChevronLeft,
  Download,
  Clock,
  AlertCircle,
  Pill,
  MessageSquare,
  FileText as FileIcon,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Mock data for doctor dashboard appointments
const doctorAppointments = [
  {
    id: '1',
    patientName: 'Mahros Mohamed',
    appointmentType: 'Follow-up',
    department: 'Cardiology',
    time: '09:30 AM'
  },
  {
    id: '2',
    patientName: 'Karim Atwa',
    appointmentType: 'Initial Consultation',
    department: 'Neurology',
    time: '10:45 AM'
  },
  {
    id: '3',
    patientName: 'Esmail Ali',
    appointmentType: 'Medication Review',
    department: 'General',
    time: '01:15 PM'
  },
  {
    id: '4',
    patientName: 'Ahmed Mahros',
    appointmentType: 'Test Results',
    department: 'Oncology',
    time: '03:30 PM'
  },
];

// Mock data for doctor's patient activities
const doctorPatientActivities = [
  {
    id: '1',
    patientName: 'Ahmed Yaser',
    avatarUrl: '',
    action: 'Lab results uploaded:',
    detail: 'Blood Work Panel',
    time: '2 hours ago',
  },
  {
    id: '2',
    patientName: 'Mohamed Samir',
    avatarUrl: '',
    action: 'Prescription refill requested:',
    detail: 'Atorvastatin 20mg',
    time: 'Yesterday',
  },
  {
    id: '3',
    patientName: 'Shaker Mohamed',
    avatarUrl: '',
    action: 'Sent message:',
    detail: '"I\'ve been experiencing increased pain in my right knee..."',
    time: '2 days ago',
  },
];

// Mock tasks data for doctors
const doctorTasks = [
  {
    id: '1',
    title: 'Review lab results for Mahros Mohamed',
    dueDate: 'Due today',
    priority: 'High Priority',
    completed: false,
  },
  {
    id: '2',
    title: 'Sign off on discharge papers',
    dueDate: 'Due today',
    priority: 'Medium Priority',
    completed: false,
  },
  {
    id: '3',
    title: 'Complete CME course',
    dueDate: 'Due May 25, 2025',
    priority: 'Low Priority',
    completed: false,
  },
  {
    id: '4',
    title: 'Call pharmacy about prescription',
    dueDate: 'Completed today',
    priority: '',
    completed: true,
  },
];

// Mock data for patient dashboard
// Patient appointments
const patientAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    date: 'May 25, 2025',
    time: '10:30 AM',
    status: 'Confirmed',
    canReschedule: true,
    canCancel: true
  },
  {
    id: '2',
    doctorName: 'Dr. Sara Mohamed',
    specialty: 'Neurology',
    date: 'June 5, 2025',
    time: '02:15 PM',
    status: 'Pending',
    canReschedule: true,
    canCancel: true
  },
  {
    id: '3',
    doctorName: 'Dr. Mohamed Ali',
    specialty: 'General',
    date: 'June 15, 2025',
    time: '11:45 AM',
    status: 'Confirmed',
    canReschedule: true,
    canCancel: true
  }
];

// Patient lab results
const patientLabResults = [
  {
    id: '1',
    testName: 'Complete Blood Count',
    date: 'May 15, 2025',
    status: 'Completed',
    read: false
  },
  {
    id: '2',
    testName: 'Lipid Panel',
    date: 'May 10, 2025',
    status: 'Completed',
    read: true
  },
  {
    id: '3',
    testName: 'Urinalysis',
    date: 'April 30, 2025',
    status: 'Completed',
    read: true
  }
];

// Patient medical records
const patientMedicalRecords = [
  {
    id: '1',
    title: 'Annual Check-up',
    doctor: 'Dr. Ahmed Hassan',
    department: 'Cardiology',
    date: 'May 15, 2025',
    hasFile: true
  },
  {
    id: '2',
    title: 'Neurological Assessment',
    doctor: 'Dr. Sara Mohamed',
    department: 'Neurology',
    date: 'April 10, 2025',
    hasFile: true
  },
  {
    id: '3',
    title: 'Blood Work Analysis',
    doctor: 'Dr. Mohamed Ali',
    department: 'Laboratory',
    date: 'March 30, 2025',
    hasFile: true
  }
];

// Patient prescriptions
const patientPrescriptions = [
  {
    id: '1',
    medication: 'Atorvastatin',
    dosage: '20mg',
    instructions: 'Take once daily at night',
    doctor: 'Dr. Ahmed Hassan',
    startDate: 'May 15, 2025',
    endDate: 'August 15, 2025',
    refill: true,
    active: true
  },
  {
    id: '2',
    medication: 'Metformin',
    dosage: '500mg',
    instructions: 'Take twice daily with meals',
    doctor: 'Dr. Ahmed Hassan',
    startDate: 'May 15, 2025',
    endDate: 'August 15, 2025',
    refill: false,
    active: true
  },
  {
    id: '3',
    medication: 'Amoxicillin',
    dosage: '250mg',
    instructions: 'Take three times daily for 10 days',
    doctor: 'Dr. Mohamed Ali',
    startDate: 'April 10, 2025',
    endDate: 'April 20, 2025',
    refill: false,
    active: false
  }
];

// Patient messages
const patientMessages = [
  {
    id: '1',
    from: 'Dr. Ahmed Hassan',
    subject: 'Follow-up on your recent visit',
    preview: 'Hello, I wanted to check in about your progress since our last...',
    date: 'May 18, 2025',
    read: false
  },
  {
    id: '2',
    from: 'Dr. Sara Mohamed',
    subject: 'Your recent test results',
    preview: "I've reviewed your recent neurological assessment and would like to discuss...",
    date: 'May 12, 2025',
    read: true
  },
  {
    id: '3',
    from: 'Dr. Mohamed Ali',
    subject: 'Prescription renewal',
    preview: 'Your prescription for Metformin will expire soon. Please let me know...',
    date: 'May 5, 2025',
    read: true
  }
];

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, trend, icon }: StatsCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          {trend && (
            <p className={trend.positive ? "trend-positive flex items-center mt-1" : "trend-negative flex items-center mt-1"}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [taskList, setTaskList] = useState(doctorTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTaskList(taskList.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. {user?.lastName}. You have 8 appointments today.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search patients, records..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button className="bg-primary hover:bg-primary-700">
            <Calendar className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Appointments"
          value="8"
          trend={{ value: "12% from yesterday", positive: true }}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatsCard
          title="Patients Seen"
          value="3"
          trend={{ value: "On track for today", positive: true }}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>}
        />
        <StatsCard
          title="Pending Reports"
          value="5"
          trend={{ value: "2 urgent", positive: false }}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>}
        />
        <StatsCard
          title="New Messages"
          value="12"
          trend={{ value: "3 unread", positive: false }}
          icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorAppointments.map((appointment) => (
                  <div key={appointment.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.appointmentType} • {appointment.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-blue-500">{appointment.time}</span>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="rounded-full p-0 w-8 h-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full p-0 w-8 h-8">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full p-0 w-8 h-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/appointments" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Appointments <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Recent Patient Activity</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorPatientActivities.map((activity) => (
                  <div key={activity.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                          {activity.avatarUrl ? (
                            <img
                              src={activity.avatarUrl}
                              alt={activity.patientName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                              {activity.patientName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline">
                          <h4 className="font-medium text-gray-900">{activity.patientName}</h4>
                          <span className="ml-auto text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">{activity.action}</span>{' '}
                          <span className="text-gray-900">{activity.detail}</span>
                        </p>
                        <div className="mt-2 flex space-x-3">
                          {activity.action.includes('Lab results') && (
                            <>
                              <Button variant="outline" size="sm" className="text-xs">View Results</Button>
                              <Button variant="outline" size="sm" className="text-xs">Add Note</Button>
                            </>
                          )}
                          {activity.action.includes('Prescription') && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200 text-xs">Approve</Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 text-xs">Deny</Button>
                            </>
                          )}
                          {activity.action.includes('message') && (
                            <>
                              <Button variant="outline" size="sm" className="text-xs">Reply</Button>
                              <Button variant="outline" size="sm" className="text-xs">Patient History</Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/activity" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Activity <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Doctor Assistant</CardTitle>
                <Button size="sm" variant="outline">
                  Full Screen
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  Hello Dr. {user?.lastName}. How can I assist you today?
                </p>
              </div>
              <div className="p-4">
                <div className="bg-primary text-white rounded-lg py-2 px-3 max-w-[80%] ml-auto mb-4">
                  <p className="text-sm">
                    Show me a summary of Sarah Johnson's recent lab results
                  </p>
                </div>
                <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-[80%] mb-4">
                  <p className="text-sm text-gray-800">
                    Retrieving Sarah Johnson's lab results from May 15, 2025...
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ask a question or give a command..."
                    className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
                  />
                  <Button className="rounded-l-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </Button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs">Patient vitals</Button>
                  <Button variant="outline" size="sm" className="text-xs">Create note</Button>
                  <Button variant="ghost" size="sm" className="text-primary text-xs ml-auto">Suggested actions</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                <span className="text-xl font-semibold">+</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {taskList.map((task) => (
                  <div key={task.id} className={`flex items-start space-x-3 ${task.completed ? 'opacity-60' : ''}`}>
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className={task.completed ? 'bg-green-500 text-white border-green-500' : ''}
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.title}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                        {!task.completed && task.priority && (
                          <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${task.priority === 'High Priority' ? 'bg-red-50 text-red-700' :
                            task.priority === 'Medium Priority' ? 'bg-orange-50 text-orange-700' :
                              'bg-blue-50 text-blue-700'
                            }`}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </div>
                    {task.completed && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/tasks" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Tasks <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-2">
                <h3 className="font-medium">May 2025</h3>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="text-gray-500 py-1">S</div>
                <div className="text-gray-500 py-1">M</div>
                <div className="text-gray-500 py-1">T</div>
                <div className="text-gray-500 py-1">W</div>
                <div className="text-gray-500 py-1">T</div>
                <div className="text-gray-500 py-1">F</div>
                <div className="text-gray-500 py-1">S</div>

                {/* Previous month days - grayed out */}
                <div className="text-gray-300 py-1">27</div>
                <div className="text-gray-300 py-1">28</div>
                <div className="text-gray-300 py-1">29</div>
                <div className="text-gray-300 py-1">30</div>

                {/* Current month days */}
                <div className="py-1">1</div>
                <div className="py-1">2</div>
                <div className="py-1">3</div>
                <div className="py-1">4</div>
                <div className="py-1">5</div>
                <div className="py-1">6</div>
                <div className="py-1">7</div>
                <div className="py-1">8</div>
                <div className="py-1">9</div>
                <div className="py-1">10</div>
                <div className="py-1">11</div>
                <div className="py-1">12</div>
                <div className="py-1">13</div>
                <div className="py-1">14</div>
                <div className="py-1">15</div>
                <div className="py-1">16</div>
                <div className="py-1">17</div>
                <div className="py-1">18</div>
                <div className="py-1">19</div>
                <div className="py-1">20</div>
                <div className="bg-primary text-white rounded-full py-1">21</div>
                <div className="py-1">22</div>
                <div className="py-1">23</div>
                <div className="py-1">24</div>
                <div className="py-1">25</div>
                <div className="py-1">26</div>
                <div className="py-1">27</div>
                <div className="py-1">28</div>
                <div className="py-1">29</div>
                <div className="py-1">30</div>
                <div className="py-1">31</div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/calendar" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  Full Calendar <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PatientDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.firstName}. Here's an overview of your health information.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search your records, appointments..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Alert for incomplete profile or important notifications */}
      <Card className="bg-yellow-50 border-yellow-100">
        <CardContent className="p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-sm text-yellow-700">
            Please complete your profile information to help us provide better care.
            <Button variant="link" className="text-primary p-0 h-auto ml-1">Complete Profile</Button>
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Column 1 & 2: Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Upcoming Appointments Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {patientAppointments.length > 0 ? (
                <div className="space-y-4">
                  {patientAppointments.map((appointment) => (
                    <div key={appointment.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 text-primary">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                            <p className="text-sm text-gray-500">
                              {appointment.specialty} • {appointment.date} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'Confirmed'
                            ? 'bg-green-50 text-green-700'
                            : appointment.status === 'Pending'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-gray-50 text-gray-700'
                            }`}>
                            {appointment.status}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              {appointment.canReschedule && (
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              )}
                              {appointment.canCancel && (
                                <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No Upcoming Appointments</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    You don't have any appointments scheduled.
                  </p>
                  <Button className="mt-4">
                    Book an Appointment
                  </Button>
                </div>
              )}
              <div className="mt-4 text-center">
                <Link to="/appointments" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Appointments <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Medical Records Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Medical Records</CardTitle>
              <Button variant="outline" size="sm">
                <FileIcon className="h-4 w-4 mr-2" /> Request Records
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientMedicalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.title}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          {record.hasFile && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" /> Download
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Link to="/medical-records" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Medical Records <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Lab Results Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Recent Lab Results</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientLabResults.map((result) => (
                  <div key={result.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4 text-blue-500">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{result.testName}</p>
                            {!result.read && (
                              <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded">New</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{result.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/lab-results" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Lab Results <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Side Content */}
        <div className="space-y-6">
          {/* Prescriptions Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Active Prescriptions</CardTitle>
              <Button variant="outline" size="sm">
                Request Refill
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientPrescriptions
                  .filter(prescription => prescription.active)
                  .map((prescription) => (
                    <div key={prescription.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex">
                        <div className="mr-4">
                          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-4 text-green-500">
                            <Pill className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {prescription.dosage} - {prescription.instructions}
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              Until {prescription.endDate}
                            </span>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Download className="h-3.5 w-3.5 mr-1" /> Download
                            </Button>
                            {prescription.refill && (
                              <Button variant="outline" size="sm" className="text-xs">
                                Request Refill
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/prescriptions" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Prescriptions <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Messages Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                Messages from Doctors
                {patientMessages.some(msg => !msg.read) && (
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full">
                    {patientMessages.filter(msg => !msg.read).length} new
                  </span>
                )}
              </CardTitle>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" /> New Message
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientMessages.map((message) => (
                  <div key={message.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{message.from}</h4>
                          <span className="text-xs text-gray-500">{message.date}</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{message.subject}</p>
                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {message.preview}
                        </p>
                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                          Read Message
                        </Button>
                      </div>
                      {!message.read && (
                        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/messages" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View All Messages <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Profile Health Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Health Profile</CardTitle>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Blood Type:</span>
                  <span className="text-sm font-medium">A+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Weight:</span>
                  <span className="text-sm font-medium">72 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Height:</span>
                  <span className="text-sm font-medium">175 cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Allergies:</span>
                  <span className="text-sm font-medium">Penicillin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Primary Doctor:</span>
                  <span className="text-sm font-medium">Dr. Ahmed Hassan</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/profile" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
                  View Complete Profile <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  // Render different dashboards based on user role
  if (user?.role === 'patient') {
    return <PatientDashboard />;
  }

  // Default to doctor dashboard for other roles
  return <DoctorDashboard />;
};

export default Dashboard;

