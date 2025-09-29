import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Wrench, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  FileText,
  User,
  Calendar,
  Settings,
  Database,
  RefreshCw
} from 'lucide-react';

const jobCardData = [
  {
    id: 'JC-001',
    trainset: 'T-005',
    title: 'Bogie Bearing Replacement',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Ravi Kumar',
    team: 'Mechanical Team A',
    createdDate: '2024-01-20',
    dueDate: '2024-02-05',
    daysRemaining: 3,
    progress: 75,
    category: 'Mechanical',
    estimatedHours: 24,
    actualHours: 18,
    tasks: [
      { id: 1, task: 'Remove old bearing assembly', completed: true, time: 4 },
      { id: 2, task: 'Clean bearing housing', completed: true, time: 2 },
      { id: 3, task: 'Install new bearing', completed: true, time: 6 },
      { id: 4, task: 'Lubrication and testing', completed: false, time: 4 },
      { id: 5, task: 'Documentation and sign-off', completed: false, time: 2 }
    ]
  },
  {
    id: 'JC-002',
    trainset: 'T-012',
    title: 'HVAC System Maintenance',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: 'Suresh Nair',
    team: 'Electrical Team B',
    createdDate: '2024-01-25',
    dueDate: '2024-02-10',
    daysRemaining: 8,
    progress: 0,
    category: 'Electrical',
    estimatedHours: 16,
    actualHours: 0,
    tasks: [
      { id: 1, task: 'System diagnostic check', completed: false, time: 3 },
      { id: 2, task: 'Filter replacement', completed: false, time: 2 },
      { id: 3, task: 'Compressor maintenance', completed: false, time: 6 },
      { id: 4, task: 'Control system calibration', completed: false, time: 4 },
      { id: 5, task: 'Performance testing', completed: false, time: 1 }
    ]
  },
  {
    id: 'JC-003',
    trainset: 'T-018',
    title: 'Door Mechanism Repair',
    priority: 'High',
    status: 'Overdue',
    assignedTo: 'Anil Menon',
    team: 'Mechanical Team C',
    createdDate: '2024-01-15',
    dueDate: '2024-01-30',
    daysRemaining: -2,
    progress: 40,
    category: 'Mechanical',
    estimatedHours: 12,
    actualHours: 8,
    tasks: [
      { id: 1, task: 'Diagnose door malfunction', completed: true, time: 2 },
      { id: 2, task: 'Order replacement parts', completed: true, time: 0.5 },
      { id: 3, task: 'Replace faulty components', completed: false, time: 4 },
      { id: 4, task: 'System testing', completed: false, time: 2 },
      { id: 5, task: 'Safety certification', completed: false, time: 1 }
    ]
  },
  {
    id: 'JC-004',
    trainset: 'T-023',
    title: 'Brake System Inspection',
    priority: 'Medium',
    status: 'Completed',
    assignedTo: 'Vijay Pillai',
    team: 'Safety Team D',
    createdDate: '2024-01-10',
    dueDate: '2024-01-25',
    daysRemaining: 0,
    progress: 100,
    category: 'Safety',
    estimatedHours: 8,
    actualHours: 7,
    tasks: [
      { id: 1, task: 'Visual brake inspection', completed: true, time: 1 },
      { id: 2, task: 'Brake pad measurement', completed: true, time: 2 },
      { id: 3, task: 'Hydraulic system check', completed: true, time: 2 },
      { id: 4, task: 'Performance testing', completed: true, time: 1.5 },
      { id: 5, task: 'Report generation', completed: true, time: 0.5 }
    ]
  }
];

// Additional Q-MMS sample data for random task updates
const qmmsTaskPool = [
  { task: 'Pantograph inspection and maintenance', time: 3, priority: 'High' },
  { task: 'Traction motor temperature check', time: 2, priority: 'Medium' },
  { task: 'Emergency brake system test', time: 4, priority: 'High' },
  { task: 'LED light replacement in coach 2', time: 1, priority: 'Low' },
  { task: 'Air compressor filter cleaning', time: 2, priority: 'Medium' },
  { task: 'Wheel profile measurement', time: 3, priority: 'High' },
  { task: 'CCTV system functionality check', time: 1.5, priority: 'Low' },
  { task: 'Coupling mechanism lubrication', time: 2, priority: 'Medium' },
  { task: 'Transformer oil level verification', time: 1, priority: 'Medium' },
  { task: 'Door sensor calibration', time: 3, priority: 'High' },
  { task: 'Battery voltage monitoring', time: 1.5, priority: 'Medium' },
  { task: 'Bogie frame crack inspection', time: 4, priority: 'High' },
  { task: 'Fire detection system test', time: 2, priority: 'High' },
  { task: 'Auxiliary power unit check', time: 2.5, priority: 'Medium' },
  { task: 'Interior panel alignment', time: 1, priority: 'Low' }
];

const statusData = [
  { name: 'Open', count: 8, color: '#3b82f6' },
  { name: 'In Progress', count: 6, color: '#f59e0b' },
  { name: 'Overdue', count: 3, color: '#ef4444' },
  { name: 'Completed', count: 8, color: '#10b981' }
];

const weeklyTrend = [
  { week: 'Week 1', opened: 12, completed: 8 },
  { week: 'Week 2', opened: 15, completed: 10 },
  { week: 'Week 3', opened: 18, completed: 14 },
  { week: 'Week 4', opened: 14, completed: 12 }
];

const categoryData = [
  { category: 'Mechanical', count: 10 },
  { category: 'Electrical', count: 8 },
  { category: 'Safety', count: 4 },
  { category: 'Other', count: 3 }
];

export function JobCardsDashboard() {
  const [tasks, setTasks] = useState(
    jobCardData.flatMap((job, jobIndex) =>
      job.tasks.map((task, taskIndex) => ({
        ...task,
        jobId: job.id,
        trainset: job.trainset,
        assignee: job.assignedTo,
        priority: job.priority,
        key: `${jobIndex}-${taskIndex}`
      }))
    )
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleTask = (key: string) => {
    setTasks(tasks.map(task => 
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const retrieveFromQMMS = async () => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate random new tasks from Q-MMS
    const numNewTasks = Math.floor(Math.random() * 5) + 3; // 3-7 new tasks
    const shuffledPool = [...qmmsTaskPool].sort(() => 0.5 - Math.random());
    const selectedTasks = shuffledPool.slice(0, numNewTasks);
    
    const trainsets = ['T-001', 'T-007', 'T-014', 'T-021', 'T-025'];
    const jobIds = ['JC-005', 'JC-006', 'JC-007', 'JC-008', 'JC-009'];
    const assignees = ['Ravi Kumar', 'Suresh Nair', 'Anil Menon', 'Vijay Pillai', 'Priya Das'];
    
    const newTasks = selectedTasks.map((taskData, index) => ({
      id: Date.now() + index,
      task: taskData.task,
      completed: false,
      time: taskData.time,
      jobId: jobIds[Math.floor(Math.random() * jobIds.length)],
      trainset: trainsets[Math.floor(Math.random() * trainsets.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      priority: taskData.priority,
      key: `qmms-${Date.now()}-${index}`
    }));
    
    // Add new tasks to the beginning of the list
    setTasks(prevTasks => [...newTasks, ...prevTasks]);
    setIsUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const urgentTasks = tasks.filter(task => !task.completed && (task.priority === 'High' || task.jobId === 'JC-003'));
  const myTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Alert for Overdue Jobs */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Maintenance Alert:</strong> Job Card JC-003 (T-018 Door Mechanism Repair) is overdue by 2 days. 
          This safety-critical repair must be completed immediately to prevent passenger service suspension and ensure operational compliance.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Open Job Cards</p>
                <p className="text-3xl">8</p>
              </div>
              <FileText className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">In Progress</p>
                <p className="text-3xl">6</p>
              </div>
              <Settings className="w-10 h-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Overdue</p>
                <p className="text-3xl">3</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">My Progress</p>
                <p className="text-3xl">{completionRate}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-600" />
              Weekly Job Card Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="opened" stroke="#ef4444" strokeWidth={3} name="Opened" />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} name="Completed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Job Cards by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                My Task List - Job Card Activities
              </CardTitle>
              <CardDescription>
                Complete these tasks to resolve job cards and maintain fleet reliability
              </CardDescription>
            </div>
            <Button
              onClick={retrieveFromQMMS}
              disabled={isUpdating}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Retrieve from Q-MMS
                </>
              )}
            </Button>
          </div>
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
                      <p className="font-medium">{task.trainset} ({task.jobId}): {task.task}</p>
                      <p className="text-sm text-gray-600">
                        Assigned to: {task.assignee} • Est. {task.time}h
                      </p>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {myTasks.filter(t => t.priority !== 'High' && t.jobId !== 'JC-003').length > 0 && (
              <div>
                <h4 className="font-medium text-blue-600 mb-3">📋 Regular Tasks</h4>
                {myTasks.filter(t => t.priority !== 'High' && t.jobId !== 'JC-003').map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.trainset} ({task.jobId}): {task.task}</p>
                      <p className="text-sm text-gray-600">
                        Assigned to: {task.assignee} • Est. {task.time}h
                      </p>
                    </div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-3">✅ Completed Tasks</h4>
                {completedTasks.slice(0, 5).map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-through text-gray-500">
                        {task.trainset} ({task.jobId}): {task.task}
                      </p>
                      <p className="text-sm text-gray-500">
                        Completed by: {task.assignee} • {task.time}h
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600">Completed</Badge>
                  </div>
                ))}
                {completedTasks.length > 5 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    +{completedTasks.length - 5} more completed tasks
                  </p>
                )}
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

      {/* Detailed Job Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Detailed Job Card Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {jobCardData.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{job.id}: {job.title}</h4>
                    <p className="text-gray-600">Trainset: {job.trainset} • Team: {job.team}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <Badge className={getPriorityColor(job.priority)}>
                      {job.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Assigned: {job.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Due: {job.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{job.actualHours}/{job.estimatedHours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span>{job.progress}% complete</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>

                {job.daysRemaining < 0 && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded mb-2">
                    ⚠️ Overdue by {Math.abs(job.daysRemaining)} days
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}