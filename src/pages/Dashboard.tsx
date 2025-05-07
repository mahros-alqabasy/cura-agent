
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  ChevronLeft
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

// Mock data for appointments
const appointments = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    appointmentType: 'Follow-up',
    department: 'Cardiology',
    time: '09:30 AM'
  },
  {
    id: '2',
    patientName: 'Michael Brown',
    appointmentType: 'Initial Consultation',
    department: 'Neurology',
    time: '10:45 AM'
  },
  {
    id: '3',
    patientName: 'Emily Wilson',
    appointmentType: 'Medication Review',
    department: 'General',
    time: '01:15 PM'
  },
  {
    id: '4',
    patientName: 'David Thompson',
    appointmentType: 'Test Results',
    department: 'Oncology',
    time: '03:30 PM'
  },
];

// Mock data for patient activities
const patientActivities = [
  {
    id: '1',
    patientName: 'Lisa Anderson',
    avatarUrl: '',
    action: 'Lab results uploaded:',
    detail: 'Blood Work Panel',
    time: '2 hours ago',
  },
  {
    id: '2',
    patientName: 'Robert Chen',
    avatarUrl: '',
    action: 'Prescription refill requested:',
    detail: 'Atorvastatin 20mg',
    time: 'Yesterday',
  },
  {
    id: '3',
    patientName: 'Jessica Taylor',
    avatarUrl: '',
    action: 'Sent message:',
    detail: '"I\'ve been experiencing increased pain in my right knee..."',
    time: '2 days ago',
  },
];

// Mock tasks data
const tasks = [
  {
    id: '1',
    title: 'Review lab results for Michael Brown',
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

const Dashboard = () => {
  const { user } = useAuth();
  const [taskList, setTaskList] = useState(tasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTaskList(taskList.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. {user?.lastName}. You have 8 appointments today.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11 11"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                {appointments.map((appointment) => (
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
                {patientActivities.map((activity) => (
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
                          <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                            task.priority === 'High Priority' ? 'bg-red-50 text-red-700' :
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

export default Dashboard;
