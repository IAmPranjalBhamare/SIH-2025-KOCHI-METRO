import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Wrench, 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  User,
  MapPin,
  FileText,
  Settings
} from 'lucide-react';

const maintenanceJobs = [
  {
    id: 'MJ-001',
    trainset: 'T-005',
    type: 'Quarterly Overhaul',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Team A',
    bay: 'IBL Bay 1',
    startDate: '2024-01-25',
    dueDate: '2024-01-30',
    progress: 75,
    tasks: [
      { name: 'Bogie inspection', completed: true },
      { name: 'Brake system check', completed: true },
      { name: 'HVAC service', completed: true },
      { name: 'Electrical systems', completed: false },
      { name: 'Final testing', completed: false }
    ]
  },
  {
    id: 'MJ-002',
    trainset: 'T-012',
    type: 'Monthly Service',
    priority: 'Medium',
    status: 'Scheduled',
    assignee: 'Team B',
    bay: 'IBL Bay 2',
    startDate: '2024-02-01',
    dueDate: '2024-02-03',
    progress: 0,
    tasks: [
      { name: 'Interior cleaning', completed: false },
      { name: 'Safety systems check', completed: false },
      { name: 'Exterior wash', completed: false }
    ]
  },
  {
    id: 'MJ-003',
    trainset: 'T-018',
    type: 'Fitness Certificate Renewal',
    priority: 'High',
    status: 'Pending',
    assignee: 'Team C',
    bay: 'IBL Bay 3',
    startDate: '2024-01-28',
    dueDate: '2024-01-29',
    progress: 0,
    tasks: [
      { name: 'Rolling stock inspection', completed: false },
      { name: 'Signalling system check', completed: false },
      { name: 'Telecom equipment test', completed: false },
      { name: 'Documentation', completed: false }
    ]
  }
];

const upcomingMaintenance = [
  { trainset: 'T-001', type: 'Weekly Check', dueDate: '2024-02-05', daysLeft: 3 },
  { trainset: 'T-007', type: 'Monthly Service', dueDate: '2024-02-08', daysLeft: 6 },
  { trainset: 'T-014', type: 'Fitness Renewal', dueDate: '2024-02-10', daysLeft: 8 },
  { trainset: 'T-023', type: 'Quarterly Overhaul', dueDate: '2024-02-15', daysLeft: 13 }
];

const bayOccupancy = [
  { bay: 'IBL Bay 1', trainset: 'T-005', status: 'Occupied', job: 'Quarterly Overhaul', completion: 75 },
  { bay: 'IBL Bay 2', trainset: null, status: 'Available', job: null, completion: 0 },
  { bay: 'IBL Bay 3', trainset: null, status: 'Reserved', job: 'Fitness Renewal (T-018)', completion: 0 },
  { bay: 'IBL Bay 4', trainset: 'T-021', status: 'Occupied', job: 'Monthly Service', completion: 90 }
];

export function MaintenanceSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('current');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBayStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Jobs</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="bays">Bay Status</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Maintenance Jobs */}
          <div className="grid gap-6">
            {maintenanceJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-orange-600" />
                        {job.id} - {job.trainset}
                      </CardTitle>
                      <CardDescription>{job.type}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(job.priority)}>
                        {job.priority} Priority
                      </Badge>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Assignee: {job.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Location: {job.bay}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Start: {job.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Due: {job.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{job.progress}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Task Checklist
                      </h4>
                      <div className="space-y-2">
                        {job.tasks.map((task, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {task.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                            )}
                            <span className={`text-sm ${task.completed ? 'text-green-600 line-through' : 'text-gray-700'}`}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Upcoming Maintenance Schedule
              </CardTitle>
              <CardDescription>Scheduled maintenance activities for the next 2 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMaintenance.map((maintenance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Wrench className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{maintenance.trainset}</p>
                        <p className="text-sm text-gray-600">{maintenance.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Due: {maintenance.dueDate}</p>
                      <Badge variant={maintenance.daysLeft <= 3 ? "destructive" : "outline"}>
                        {maintenance.daysLeft} days left
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bays" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Inspection Bay Line (IBL) Status
              </CardTitle>
              <CardDescription>Real-time bay occupancy and maintenance progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bayOccupancy.map((bay) => (
                  <Card key={bay.bay} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{bay.bay}</h4>
                        <Badge className={getBayStatusColor(bay.status)}>
                          {bay.status}
                        </Badge>
                      </div>
                      
                      {bay.trainset && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Trainset: {bay.trainset}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{bay.job}</span>
                          </div>
                          {bay.completion > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{bay.completion}%</span>
                              </div>
                              <Progress value={bay.completion} className="h-1" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {bay.status === 'Available' && (
                        <div className="text-center py-4">
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm text-green-600">Ready for next job</p>
                        </div>
                      )}
                      
                      {bay.status === 'Reserved' && (
                        <div className="text-center py-2">
                          <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">{bay.job}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  Maintenance Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Schedule for {selectedDate?.toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">08:00 - 12:00</span>
                    </div>
                    <p className="text-sm text-blue-700">T-005 Quarterly Overhaul (Bay 1)</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">14:00 - 16:00</span>
                    </div>
                    <p className="text-sm text-green-700">T-018 Fitness Certificate Renewal (Bay 3)</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">No other scheduled maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}