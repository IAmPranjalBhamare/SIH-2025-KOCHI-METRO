import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { 
  Train, 
  CheckCircle, 
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Activity,
  Gauge
} from 'lucide-react';

const mileageData = [
  {
    trainset: 'T-001',
    totalMileage: 74523,
    weeklyAverage: 2850,
    lastRotation: '2024-01-20',
    nextRotation: '2024-02-15',
    wearLevel: 'Normal',
    bogieMileage: 28450,
    brakePadLife: 85,
    hvacHours: 1240,
    priority: 'Medium',
    status: 'Active',
    tasks: [
      { id: 1, task: 'Weekly mileage log update', completed: true },
      { id: 2, task: 'Wear assessment', completed: false },
      { id: 3, task: 'Schedule rotation', completed: false }
    ]
  },
  {
    trainset: 'T-003',
    totalMileage: 89245,
    weeklyAverage: 3200,
    lastRotation: '2024-01-10',
    nextRotation: '2024-02-01',
    wearLevel: 'High',
    bogieMileage: 34200,
    brakePadLife: 45,
    hvacHours: 1890,
    priority: 'High',
    status: 'Needs Rotation',
    tasks: [
      { id: 1, task: 'Immediate rotation required', completed: false },
      { id: 2, task: 'Component wear inspection', completed: false },
      { id: 3, task: 'Update maintenance schedule', completed: false }
    ]
  },
  {
    trainset: 'T-005',
    totalMileage: 65789,
    weeklyAverage: 2100,
    lastRotation: '2024-01-25',
    nextRotation: '2024-03-01',
    wearLevel: 'Low',
    bogieMileage: 22100,
    brakePadLife: 92,
    hvacHours: 980,
    priority: 'Low',
    status: 'Available',
    tasks: [
      { id: 1, task: 'Increase service allocation', completed: false },
      { id: 2, task: 'Route optimization review', completed: true }
    ]
  },
  {
    trainset: 'T-012',
    totalMileage: 82156,
    weeklyAverage: 2950,
    lastRotation: '2024-01-18',
    nextRotation: '2024-02-08',
    wearLevel: 'High',
    bogieMileage: 31800,
    brakePadLife: 58,
    hvacHours: 1654,
    priority: 'High',
    status: 'Monitor Closely',
    tasks: [
      { id: 1, task: 'Daily mileage tracking', completed: true },
      { id: 2, task: 'Brake pad replacement planning', completed: false },
      { id: 3, task: 'Load balancing adjustment', completed: false }
    ]
  }
];

const wearDistribution = [
  { range: '< 70k km', count: 8, color: '#10b981' },
  { range: '70-80k km', count: 10, color: '#f59e0b' },
  { range: '80-90k km', count: 6, color: '#ef4444' },
  { range: '> 90k km', count: 1, color: '#7c2d12' }
];

const rotationSchedule = [
  { week: 'Week 1', rotations: 3 },
  { week: 'Week 2', rotations: 2 },
  { week: 'Week 3', rotations: 4 },
  { week: 'Week 4', rotations: 3 }
];

const componentWear = [
  { component: 'Bogie', avgWear: 65, threshold: 80 },
  { component: 'Brake Pads', avgWear: 72, threshold: 90 },
  { component: 'HVAC', avgWear: 58, threshold: 75 },
  { component: 'Traction', avgWear: 61, threshold: 85 }
];

export function MileageBalancingDashboard() {
  const [tasks, setTasks] = useState(
    mileageData.flatMap((train, trainIndex) =>
      train.tasks.map((task, taskIndex) => ({
        ...task,
        trainset: train.trainset,
        priority: train.priority,
        wearLevel: train.wearLevel,
        key: `${trainIndex}-${taskIndex}`
      }))
    )
  );

  const toggleTask = (key: string) => {
    setTasks(tasks.map(task => 
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const getWearColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Normal': return 'text-blue-600 bg-blue-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Available': return 'text-blue-600 bg-blue-100';
      case 'Needs Rotation': return 'text-red-600 bg-red-100';
      case 'Monitor Closely': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const urgentTasks = tasks.filter(task => !task.completed && (task.priority === 'High' || task.wearLevel === 'High'));
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  const averageMileage = Math.round(mileageData.reduce((sum, train) => sum + train.totalMileage, 0) / mileageData.length);
  const highWearTrains = mileageData.filter(train => train.wearLevel === 'High').length;
  const rotationsNeeded = mileageData.filter(train => train.status === 'Needs Rotation').length;

  return (
    <div className="space-y-6">
      {/* Alert for High Wear */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Wear Alert:</strong> Trainsets T-003 (89,245 km) and T-012 (82,156 km) have exceeded optimal mileage thresholds. 
          Immediate rotation is required to prevent costly component failures, ensure passenger safety, and maintain fleet reliability standards.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Average Mileage</p>
                <p className="text-2xl">{averageMileage.toLocaleString()} km</p>
              </div>
              <Train className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">High Wear Trains</p>
                <p className="text-3xl">{highWearTrains}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Rotations Needed</p>
                <p className="text-3xl">{rotationsNeeded}</p>
              </div>
              <RotateCcw className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Task Progress</p>
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
              <Gauge className="w-5 h-5 text-blue-600" />
              Mileage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wearDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Component Wear Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {componentWear.map((comp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{comp.component}</span>
                    <span>{comp.avgWear}% / {comp.threshold}% threshold</span>
                  </div>
                  <Progress 
                    value={(comp.avgWear / comp.threshold) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    {comp.avgWear < comp.threshold * 0.8 ? 
                      'Good condition' : 
                      comp.avgWear < comp.threshold * 0.9 ? 
                      'Monitor closely' : 
                      'Replacement needed'
                    }
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
            Mileage Balancing Tasks
          </CardTitle>
          <CardDescription>
            Optimize fleet utilization and component wear distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-3">⚡ Urgent Actions</h4>
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
                        Wear Level: {task.wearLevel} • Priority: {task.priority}
                      </p>
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
                      <p className="font-medium line-through text-gray-500">
                        {task.trainset}: {task.task}
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

      {/* Detailed Trainset Mileage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-5 h-5 text-blue-600" />
            Detailed Mileage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mileageData.map((train) => (
              <div key={train.trainset} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{train.trainset}</h4>
                    <p className="text-gray-600">Total: {train.totalMileage.toLocaleString()} km</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(train.status)}>
                      {train.status}
                    </Badge>
                    <Badge className={getWearColor(train.wearLevel)}>
                      {train.wearLevel} Wear
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Weekly Average</div>
                    <div className="text-lg font-semibold">{train.weeklyAverage.toLocaleString()} km</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Bogie Mileage</div>
                    <div className="text-lg font-semibold">{train.bogieMileage.toLocaleString()} km</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Brake Pad Life</div>
                    <div className="text-lg font-semibold">{train.brakePadLife}%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">HVAC Hours</div>
                    <div className="text-lg font-semibold">{train.hvacHours}h</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Last Rotation: {train.lastRotation} • Next Scheduled: {train.nextRotation}
                </div>

                {train.wearLevel === 'High' && (
                  <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                    ⚠️ High wear detected - immediate rotation recommended
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
