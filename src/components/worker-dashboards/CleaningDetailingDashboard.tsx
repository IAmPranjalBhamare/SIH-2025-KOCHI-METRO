import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users,
  Droplets,
  Sparkles,
  MapPin,
  User
} from 'lucide-react';

const cleaningData = [
  {
    trainset: 'T-001',
    lastCleaned: '2024-01-28',
    nextDue: '2024-02-04',
    daysOverdue: 0,
    status: 'Scheduled',
    type: 'Deep Clean',
    assignedTeam: 'Team Alpha',
    estimatedTime: '4 hours',
    bay: 'Bay 2',
    timeSlot: '14:00 - 18:00',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Interior vacuuming', completed: false, time: 45 },
      { id: 2, task: 'Seat sanitization', completed: false, time: 60 },
      { id: 3, task: 'Floor mopping', completed: false, time: 30 },
      { id: 4, task: 'Window cleaning', completed: false, time: 45 },
      { id: 5, task: 'Exterior wash', completed: false, time: 60 }
    ]
  },
  {
    trainset: 'T-007',
    lastCleaned: '2024-01-26',
    nextDue: '2024-02-02',
    daysOverdue: 2,
    status: 'Overdue',
    type: 'Deep Clean',
    assignedTeam: 'Team Beta',
    estimatedTime: '4 hours',
    bay: 'Available',
    timeSlot: 'To be scheduled',
    priority: 'High',
    tasks: [
      { id: 1, task: 'Emergency sanitization', completed: false, time: 30 },
      { id: 2, task: 'Deep interior cleaning', completed: false, time: 120 },
      { id: 3, task: 'Exterior pressure wash', completed: false, time: 90 }
    ]
  },
  {
    trainset: 'T-012',
    lastCleaned: '2024-02-01',
    nextDue: '2024-02-08',
    daysOverdue: 0,
    status: 'Completed',
    type: 'Maintenance Clean',
    assignedTeam: 'Team Gamma',
    estimatedTime: '2 hours',
    bay: 'Bay 1',
    timeSlot: '10:00 - 12:00',
    priority: 'Low',
    tasks: [
      { id: 1, task: 'Interior cleaning', completed: true, time: 60 },
      { id: 2, task: 'Surface sanitization', completed: true, time: 30 },
      { id: 3, task: 'Exterior wash', completed: true, time: 30 }
    ]
  },
  {
    trainset: 'T-018',
    lastCleaned: '2024-01-30',
    nextDue: '2024-02-06',
    daysOverdue: 0,
    status: 'In Progress',
    type: 'Deep Clean',
    assignedTeam: 'Team Delta',
    estimatedTime: '4 hours',
    bay: 'Bay 3',
    timeSlot: '08:00 - 12:00',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Interior vacuuming', completed: true, time: 45 },
      { id: 2, task: 'Seat cleaning', completed: true, time: 60 },
      { id: 3, task: 'Floor cleaning', completed: false, time: 30 },
      { id: 4, task: 'Window cleaning', completed: false, time: 45 }
    ]
  }
];

const manpowerData = [
  { team: 'Team Alpha', members: 4, availability: 'Available', currentJob: 'None' },
  { team: 'Team Beta', members: 5, availability: 'Busy', currentJob: 'T-007 Deep Clean' },
  { team: 'Team Gamma', members: 3, availability: 'Available', currentJob: 'None' },
  { team: 'Team Delta', members: 4, availability: 'Busy', currentJob: 'T-018 Deep Clean' }
];

const bayStatus = [
  { bay: 'Bay 1', status: 'Available', currentTrain: null, nextScheduled: 'T-023 (16:00)' },
  { bay: 'Bay 2', status: 'Reserved', currentTrain: null, nextScheduled: 'T-001 (14:00)' },
  { bay: 'Bay 3', status: 'Occupied', currentTrain: 'T-018', nextScheduled: 'T-015 (13:00)' },
  { bay: 'Bay 4', status: 'Maintenance', currentTrain: null, nextScheduled: 'Available tomorrow' }
];

const cleaningTypes = [
  { type: 'Daily Clean', count: 12, color: '#10b981' },
  { type: 'Deep Clean', count: 8, color: '#3b82f6' },
  { type: 'Maintenance Clean', count: 4, color: '#f59e0b' },
  { type: 'Emergency Clean', count: 1, color: '#ef4444' }
];

const completionTrend = [
  { day: 'Mon', completed: 8, scheduled: 10 },
  { day: 'Tue', completed: 12, scheduled: 12 },
  { day: 'Wed', completed: 9, scheduled: 11 },
  { day: 'Thu', completed: 15, scheduled: 16 },
  { day: 'Fri', completed: 13, scheduled: 14 },
  { day: 'Sat', completed: 11, scheduled: 12 },
  { day: 'Sun', completed: 7, scheduled: 8 }
];

export function CleaningDetailingDashboard() {
  const [tasks, setTasks] = useState(
    cleaningData.flatMap((clean, cleanIndex) =>
      clean.tasks.map((task, taskIndex) => ({
        ...task,
        trainset: clean.trainset,
        assignedTeam: clean.assignedTeam,
        priority: clean.priority,
        status: clean.status,
        key: `${cleanIndex}-${taskIndex}`
      }))
    )
  );

  const toggleTask = (key: string) => {
    setTasks(tasks.map(task => 
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Scheduled': return 'text-purple-600 bg-purple-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBayStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Reserved': return 'text-yellow-600 bg-yellow-100';
      case 'Occupied': return 'text-red-600 bg-red-100';
      case 'Maintenance': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const urgentTasks = tasks.filter(task => !task.completed && (task.priority === 'High' || task.status === 'Overdue'));
  const inProgressTasks = tasks.filter(task => !task.completed && task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  const overdueCount = cleaningData.filter(clean => clean.status === 'Overdue').length;
  const availableTeams = manpowerData.filter(team => team.availability === 'Available').length;
  const availableBays = bayStatus.filter(bay => bay.status === 'Available').length;

  return (
    <div className="space-y-6">
      {/* Alert for Overdue Cleaning */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Overdue Alert:</strong> T-007 cleaning is 2 days overdue. 
          Schedule immediate cleaning to maintain hygiene standards and passenger satisfaction.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Available Teams</p>
                <p className="text-3xl">{availableTeams}</p>
              </div>
              <Users className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Available Bays</p>
                <p className="text-3xl">{availableBays}</p>
              </div>
              <MapPin className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Overdue</p>
                <p className="text-3xl">{overdueCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Task Progress</p>
                <p className="text-3xl">{completionRate}%</p>
              </div>
              <Sparkles className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              Cleaning Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cleaningTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {cleaningTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {cleaningTypes.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.type}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Weekly Completion Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="scheduled" fill="#e5e7eb" name="Scheduled" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manpower & Bay Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Team Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {manpowerData.map((team, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{team.team}</p>
                      <p className="text-sm text-gray-600">{team.members} members</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={team.availability === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                      {team.availability}
                    </Badge>
                    {team.currentJob !== 'None' && (
                      <p className="text-xs text-gray-500 mt-1">{team.currentJob}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Bay Occupancy Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bayStatus.map((bay, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{bay.bay}</p>
                    {bay.currentTrain && (
                      <p className="text-sm text-blue-600">Current: {bay.currentTrain}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge className={getBayStatusColor(bay.status)}>
                      {bay.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{bay.nextScheduled}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            My Cleaning Tasks
          </CardTitle>
          <CardDescription>
            Complete cleaning tasks to maintain fleet hygiene and passenger satisfaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-3">🚨 Urgent Tasks</h4>
                {urgentTasks.map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.trainset}: {task.task}</p>
                      <p className="text-sm text-gray-600">
                        Team: {task.assignedTeam} • Est. {task.time} min
                      </p>
                    </div>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                ))}
              </div>
            )}

            {inProgressTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-blue-600 mb-3">🔄 In Progress</h4>
                {inProgressTasks.map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.trainset}: {task.task}</p>
                      <p className="text-sm text-gray-600">
                        Team: {task.assignedTeam} • Est. {task.time} min
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-blue-600">
                      In Progress
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-3">✅ Completed Tasks</h4>
                {completedTasks.slice(0, 4).map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-through text-gray-500">
                        {task.trainset}: {task.task}
                      </p>
                      <p className="text-sm text-gray-500">
                        Completed by: {task.assignedTeam}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600">Completed</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{completedTasks.length}/{tasks.length} completed</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cleaning Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Cleaning Schedule Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cleaningData.map((clean) => (
              <div key={clean.trainset} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{clean.trainset}</h4>
                    <p className="text-gray-600">{clean.type} • {clean.assignedTeam}</p>
                  </div>
                  <Badge className={getStatusColor(clean.status)}>
                    {clean.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Last: {clean.lastCleaned}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Due: {clean.nextDue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Bay: {clean.bay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Time: {clean.timeSlot}</span>
                  </div>
                </div>

                {clean.daysOverdue > 0 && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded mb-2">
                    ⚠️ Overdue by {clean.daysOverdue} days - immediate cleaning required
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  Estimated time: {clean.estimatedTime}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}