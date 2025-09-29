import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  FileText,
  Zap,
  Radio
} from 'lucide-react';

const fitnessData = [
  {
    trainset: 'T-001',
    rollingStock: { status: 'Valid', expiry: '2024-03-20', daysLeft: 18, inspector: 'A. Kumar' },
    signalling: { status: 'Valid', expiry: '2024-03-25', daysLeft: 23, inspector: 'R. Nair' },
    telecom: { status: 'Valid', expiry: '2024-03-15', daysLeft: 13, inspector: 'S. Pillai' },
    overall: 'Valid',
    priority: 'Medium',
    lastInspection: '2024-01-15',
    tasks: [
      { id: 1, task: 'Rolling Stock visual inspection', completed: true, assignee: 'Team A' },
      { id: 2, task: 'Signalling equipment test', completed: true, assignee: 'Team B' },
      { id: 3, task: 'Telecom systems verification', completed: false, assignee: 'Team C' }
    ]
  },
  {
    trainset: 'T-012',
    rollingStock: { status: 'Expiring', expiry: '2024-02-05', daysLeft: 3, inspector: 'M. Menon' },
    signalling: { status: 'Valid', expiry: '2024-04-10', daysLeft: 38, inspector: 'K. Raj' },
    telecom: { status: 'Expired', expiry: '2024-01-30', daysLeft: -2, inspector: 'L. Thomas' },
    overall: 'Critical',
    priority: 'High',
    lastInspection: '2024-01-20',
    tasks: [
      { id: 1, task: 'Emergency rolling stock inspection', completed: false, assignee: 'Team A' },
      { id: 2, task: 'Telecom emergency certification', completed: false, assignee: 'Team C' },
      { id: 3, task: 'Documentation update', completed: false, assignee: 'Admin' }
    ]
  },
  {
    trainset: 'T-018',
    rollingStock: { status: 'Valid', expiry: '2024-05-15', daysLeft: 73, inspector: 'D. Varma' },
    signalling: { status: 'Expiring', expiry: '2024-02-08', daysLeft: 6, inspector: 'P. Nair' },
    telecom: { status: 'Valid', expiry: '2024-04-20', daysLeft: 48, inspector: 'T. Kumar' },
    overall: 'Warning',
    priority: 'Medium',
    lastInspection: '2024-01-18',
    tasks: [
      { id: 1, task: 'Signalling system recertification', completed: false, assignee: 'Team B' },
      { id: 2, task: 'Preventive maintenance check', completed: true, assignee: 'Team A' }
    ]
  }
];

const statusData = [
  { name: 'Valid', count: 18, color: '#10b981' },
  { name: 'Expiring Soon', count: 4, color: '#f59e0b' },
  { name: 'Critical', count: 3, color: '#ef4444' }
];

const departmentData = [
  { department: 'Rolling Stock', valid: 20, expiring: 3, expired: 2 },
  { department: 'Signalling', valid: 18, expiring: 5, expired: 2 },
  { department: 'Telecom', valid: 19, expiring: 4, expired: 2 }
];

export function FitnessCertificatesDashboard() {
  const [tasks, setTasks] = useState(
    fitnessData.flatMap((train, trainIndex) =>
      train.tasks.map((task, taskIndex) => ({
        ...task,
        trainset: train.trainset,
        key: `${trainIndex}-${taskIndex}`
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
      case 'Valid': return 'text-green-600 bg-green-100';
      case 'Expiring': return 'text-yellow-600 bg-yellow-100';
      case 'Expired': return 'text-red-600 bg-red-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Warning': return 'text-yellow-600 bg-yellow-100';
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

  const urgentTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Alert for Critical Items */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Safety Alert:</strong> T-012 has an expired telecom certificate and its rolling stock certificate expires in 3 days. 
          This trainset must be immediately withdrawn from passenger service to comply with safety regulations and avoid operational penalties.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Valid Certificates</p>
                <p className="text-3xl">18</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Expiring Soon</p>
                <p className="text-3xl">4</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Critical/Expired</p>
                <p className="text-3xl">3</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Task Completion</p>
                <p className="text-3xl">{completionRate}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Certificate Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Department-wise Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valid" stackId="a" fill="#10b981" />
                  <Bar dataKey="expiring" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="expired" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span>Valid</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span>Expiring</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span>Expired</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            My Tasks - Fitness Certificate Management
          </CardTitle>
          <CardDescription>
            Complete these tasks to ensure fitness certificate compliance
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
                      <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                    </div>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-3">✅ Completed Tasks</h4>
                {completedTasks.map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-through text-gray-500">{task.trainset}: {task.task}</p>
                      <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
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

      {/* Detailed Trainset Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Detailed Certificate Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {fitnessData.map((train) => (
              <div key={train.trainset} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">{train.trainset}</h4>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(train.overall)}>
                      {train.overall}
                    </Badge>
                    <Badge className={getPriorityColor(train.priority)}>
                      {train.priority} Priority
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rolling Stock</p>
                      <p className={`text-sm ${train.rollingStock.status === 'Valid' ? 'text-green-600' : 'text-red-600'}`}>
                        {train.rollingStock.status} • {train.rollingStock.daysLeft} days
                      </p>
                      <p className="text-xs text-gray-500">{train.rollingStock.inspector}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Zap className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Signalling</p>
                      <p className={`text-sm ${train.signalling.status === 'Valid' ? 'text-green-600' : 'text-orange-600'}`}>
                        {train.signalling.status} • {train.signalling.daysLeft} days
                      </p>
                      <p className="text-xs text-gray-500">{train.signalling.inspector}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Radio className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Telecom</p>
                      <p className={`text-sm ${train.telecom.status === 'Valid' ? 'text-green-600' : train.telecom.status === 'Expired' ? 'text-red-600' : 'text-orange-600'}`}>
                        {train.telecom.status} • {train.telecom.daysLeft} days
                      </p>
                      <p className="text-xs text-gray-500">{train.telecom.inspector}</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Last inspection: {train.lastInspection}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}