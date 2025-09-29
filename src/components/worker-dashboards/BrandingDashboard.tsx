import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Zap, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';

const brandingData = [
  {
    trainset: 'T-001',
    advertiser: 'Kerala Tourism',
    contractValue: '₹25,00,000',
    startDate: '2023-12-01',
    endDate: '2024-06-30',
    daysLeft: 120,
    status: 'Active',
    exposureHours: 2840,
    targetHours: 3000,
    contractedRoutes: ['Aluva-Ernakulam', 'Ernakulam-Thaikoodam'],
    priority: 'High',
    tasks: [
      { id: 1, task: 'Weekly wrap condition inspection', completed: true },
      { id: 2, task: 'Photo documentation', completed: true },
      { id: 3, task: 'Exposure hours tracking', completed: false },
      { id: 4, task: 'Monthly client report', completed: false }
    ]
  },
  {
    trainset: 'T-007',
    advertiser: 'Malabar Gold',
    contractValue: '₹35,00,000',
    startDate: '2024-01-15',
    endDate: '2024-09-15',
    daysLeft: 225,
    status: 'Active',
    exposureHours: 580,
    targetHours: 4200,
    contractedRoutes: ['Full Network'],
    priority: 'High',
    tasks: [
      { id: 1, task: 'Install new branding wrap', completed: true },
      { id: 2, task: 'Quality check and approval', completed: true },
      { id: 3, task: 'Client handover documentation', completed: false }
    ]
  },
  {
    trainset: 'T-012',
    advertiser: 'Federal Bank',
    contractValue: '₹28,00,000',
    startDate: '2023-10-01',
    endDate: '2024-04-01',
    daysLeft: 60,
    status: 'Expiring Soon',
    exposureHours: 3200,
    targetHours: 3500,
    contractedRoutes: ['Peak Hours Only'],
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Contract renewal discussion', completed: false },
      { id: 2, task: 'Wrap condition assessment', completed: true },
      { id: 3, task: 'Revenue reconciliation', completed: false },
      { id: 4, task: 'New contract preparation', completed: false }
    ]
  },
  {
    trainset: 'T-018',
    advertiser: 'Lulu Group',
    contractValue: '₹40,00,000',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    daysLeft: 155,
    status: 'Active',
    exposureHours: 120,
    targetHours: 3600,
    contractedRoutes: ['Shopping Mall Routes'],
    priority: 'High',
    tasks: [
      { id: 1, task: 'Installation in progress', completed: false },
      { id: 2, task: 'Safety clearance pending', completed: false },
      { id: 3, task: 'First month report due', completed: false }
    ]
  }
];

const revenueData = [
  { month: 'Oct 2023', revenue: 2850000 },
  { month: 'Nov 2023', revenue: 3200000 },
  { month: 'Dec 2023', revenue: 3500000 },
  { month: 'Jan 2024', revenue: 4100000 }
];

const exposureData = [
  { advertiser: 'Kerala Tourism', hours: 2840, target: 3000 },
  { advertiser: 'Malabar Gold', hours: 580, target: 4200 },
  { advertiser: 'Federal Bank', hours: 3200, target: 3500 },
  { advertiser: 'Lulu Group', hours: 120, target: 3600 }
];

const statusData = [
  { name: 'Active', count: 15, color: '#10b981' },
  { name: 'Expiring Soon', count: 4, color: '#f59e0b' },
  { name: 'Pending Install', count: 3, color: '#8b5cf6' },
  { name: 'Available', count: 3, color: '#6b7280' }
];

export function BrandingDashboard() {
  const [tasks, setTasks] = useState(
    brandingData.flatMap((brand, brandIndex) =>
      brand.tasks.map((task, taskIndex) => ({
        ...task,
        trainset: brand.trainset,
        advertiser: brand.advertiser,
        priority: brand.priority,
        key: `${brandIndex}-${taskIndex}`
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
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Expiring Soon': return 'text-orange-600 bg-orange-100';
      case 'Pending Install': return 'text-purple-600 bg-purple-100';
      case 'Available': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const urgentTasks = tasks.filter(task => !task.completed && (task.priority === 'High'));
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);
  
  const totalRevenue = brandingData.reduce((sum, brand) => 
    sum + parseInt(brand.contractValue.replace(/[₹,]/g, '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Alert for Expiring Contracts */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Revenue Alert:</strong> Federal Bank branding contract (T-012) expires in 60 days worth ₹28,00,000. 
          Initiate renewal negotiations immediately to prevent significant revenue loss and maintain client relationship.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Active Contracts</p>
                <p className="text-3xl">15</p>
              </div>
              <Zap className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Monthly Revenue</p>
                <p className="text-lg">₹{(revenueData[revenueData.length - 1]?.revenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Expiring Soon</p>
                <p className="text-3xl">4</p>
              </div>
              <Clock className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Task Progress</p>
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
              <DollarSign className="w-5 h-5 text-green-600" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value) => [`₹${(value/100000).toFixed(1)}L`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Exposure Hours vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exposureData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.advertiser}</span>
                    <span>{item.hours}/{item.target}h</span>
                  </div>
                  <Progress 
                    value={(item.hours / item.target) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    {Math.round((item.hours / item.target) * 100)}% of target achieved
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
            My Branding Tasks
          </CardTitle>
          <CardDescription>
            Manage branding contracts and ensure SLA compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-purple-600 mb-3">⚡ Priority Tasks</h4>
                {urgentTasks.map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.trainset} - {task.advertiser}: {task.task}</p>
                      <p className="text-sm text-gray-600">Priority branding contract</p>
                    </div>
                    <Badge variant="secondary" className="text-purple-600">
                      High Priority
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-green-600 mb-3">✅ Completed Tasks</h4>
                {completedTasks.slice(0, 3).map((task) => (
                  <div key={task.key} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.key)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-through text-gray-500">
                        {task.trainset} - {task.advertiser}: {task.task}
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
              <span className="text-sm font-medium">Task Progress</span>
              <span className="text-sm text-gray-600">{completedTasks.length}/{tasks.length} completed</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Contract Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-600" />
            Active Branding Contracts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {brandingData.map((brand) => (
              <div key={brand.trainset} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{brand.trainset} - {brand.advertiser}</h4>
                    <p className="text-gray-600">Value: {brand.contractValue}</p>
                  </div>
                  <Badge className={getStatusColor(brand.status)}>
                    {brand.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Ends: {brand.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{brand.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>{brand.exposureHours}/{brand.targetHours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span>{Math.round((brand.exposureHours/brand.targetHours)*100)}%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Exposure Progress</span>
                    <span className="text-sm text-gray-600">{brand.exposureHours}/{brand.targetHours} hours</span>
                  </div>
                  <Progress value={(brand.exposureHours / brand.targetHours) * 100} className="h-2" />
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Routes:</strong> {brand.contractedRoutes.join(', ')}
                </div>

                {brand.daysLeft < 90 && brand.status === 'Active' && (
                  <div className="mt-3 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                    ⚠️ Contract renewal required within 90 days
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