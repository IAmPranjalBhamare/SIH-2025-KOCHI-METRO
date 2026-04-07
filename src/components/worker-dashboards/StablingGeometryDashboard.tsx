import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Route,
  Fuel,
  Timer,
  Zap
} from 'lucide-react';

const stablingData = [
  {
    trainset: 'T-001',
    currentPosition: 'Stabling Track 1',
    optimalPosition: 'Stabling Track 3',
    nextService: 'Aluva Departure 06:00',
    shuntingTime: 12,
    energyConsumption: 'High',
    status: 'Suboptimal',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Relocate to optimal position', completed: false, time: 15 },
      { id: 2, task: 'Update positioning log', completed: false, time: 5 },
      { id: 3, task: 'Coordinate with operations', completed: true, time: 10 }
    ]
  },
  {
    trainset: 'T-005',
    currentPosition: 'Stabling Track 5',
    optimalPosition: 'Stabling Track 5',
    nextService: 'Ernakulam Departure 05:45',
    shuntingTime: 3,
    energyConsumption: 'Low',
    status: 'Optimal',
    priority: 'Low',
    tasks: [
      { id: 1, task: 'Morning readiness check', completed: true, time: 5 },
      { id: 2, task: 'Confirm departure schedule', completed: true, time: 2 }
    ]
  },
  {
    trainset: 'T-012',
    currentPosition: 'Maintenance Track',
    optimalPosition: 'Stabling Track 2',
    nextService: 'Thaikoodam Departure 07:30',
    shuntingTime: 25,
    energyConsumption: 'Very High',
    status: 'Critical',
    priority: 'High',
    tasks: [
      { id: 1, task: 'Emergency repositioning required', completed: false, time: 30 },
      { id: 2, task: 'Route clearance coordination', completed: false, time: 15 },
      { id: 3, task: 'Energy optimization review', completed: false, time: 20 }
    ]
  },
  {
    trainset: 'T-018',
    currentPosition: 'Stabling Track 7',
    optimalPosition: 'Stabling Track 4',
    nextService: 'Peak Hour Service 08:15',
    shuntingTime: 8,
    energyConsumption: 'Medium',
    status: 'Acceptable',
    priority: 'Medium',
    tasks: [
      { id: 1, task: 'Minor position adjustment', completed: false, time: 10 },
      { id: 2, task: 'Pre-service inspection', completed: true, time: 15 }
    ]
  }
];

const trackOccupancy = [
  { track: 'Track 1', occupied: true, trainset: 'T-001', optimal: false, nextMovement: '23:30' },
  { track: 'Track 2', occupied: false, trainset: null, optimal: true, nextMovement: 'Available' },
  { track: 'Track 3', occupied: true, trainset: 'T-007', optimal: true, nextMovement: '05:30' },
  { track: 'Track 4', occupied: false, trainset: null, optimal: true, nextMovement: 'Reserved' },
  { track: 'Track 5', occupied: true, trainset: 'T-005', optimal: true, nextMovement: '05:45' },
  { track: 'Track 6', occupied: true, trainset: 'T-015', optimal: false, nextMovement: '06:15' },
  { track: 'Track 7', occupied: true, trainset: 'T-018', optimal: false, nextMovement: '08:15' },
  { track: 'Track 8', occupied: false, trainset: null, optimal: true, nextMovement: 'Available' }
];

const shuntingData = [
  { hour: '21:00', movements: 2, energy: 45 },
  { hour: '21:30', movements: 5, energy: 125 },
  { hour: '22:00', movements: 8, energy: 220 },
  { hour: '22:30', movements: 12, energy: 340 },
  { hour: '23:00', movements: 6, energy: 180 },
  { hour: '23:30', movements: 3, energy: 80 }
];

const energyData = [
  { category: 'Optimal Positioning', consumption: 120 },
  { category: 'Minor Adjustments', consumption: 280 },
  { category: 'Major Repositioning', consumption: 450 },
  { category: 'Emergency Moves', consumption: 380 }
];

const positioningEfficiency = [
  { week: 'Week 1', optimal: 68, suboptimal: 32 },
  { week: 'Week 2', optimal: 72, suboptimal: 28 },
  { week: 'Week 3', optimal: 75, suboptimal: 25 },
  { week: 'Week 4', optimal: 78, suboptimal: 22 }
];

export function StablingGeometryDashboard() {
  const [tasks, setTasks] = useState(
    stablingData.flatMap((stabling, stablingIndex) =>
      stabling.tasks.map((task, taskIndex) => ({
        ...task,
        trainset: stabling.trainset,
        status: stabling.status,
        priority: stabling.priority,
        shuntingTime: stabling.shuntingTime,
        key: `${stablingIndex}-${taskIndex}`
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
      case 'Optimal': return 'text-green-600 bg-green-100';
      case 'Acceptable': return 'text-blue-600 bg-blue-100';
      case 'Suboptimal': return 'text-yellow-600 bg-yellow-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const urgentTasks = tasks.filter(task => !task.completed && (task.priority === 'High' || task.status === 'Critical'));
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  const optimalPositions = stablingData.filter(s => s.status === 'Optimal').length;
  const criticalPositions = stablingData.filter(s => s.status === 'Critical').length;
  const avgShuntingTime = Math.round(stablingData.reduce((sum, s) => sum + s.shuntingTime, 0) / stablingData.length);
  const availableTracks = trackOccupancy.filter(t => !t.occupied).length;

  return (
    <div className="space-y-6">
      {/* Alert for Critical Positioning */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Critical Positioning Alert:</strong> T-012 is on maintenance track requiring 25-minute shunting for morning service. 
          Immediate repositioning needed to avoid service delays.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Optimal Positions</p>
                <p className="text-3xl">{optimalPositions}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Critical Positions</p>
                <p className="text-3xl">{criticalPositions}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Available Tracks</p>
                <p className="text-3xl">{availableTracks}</p>
              </div>
              <Route className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Shunting Time</p>
                <p className="text-2xl">{avgShuntingTime} min</p>
              </div>
              <Timer className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-orange-600" />
              Energy Consumption by Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                  <Bar dataKey="consumption" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Positioning Efficiency Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={positioningEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="optimal" stroke="#10b981" strokeWidth={3} name="Optimal %" />
                  <Line type="monotone" dataKey="suboptimal" stroke="#ef4444" strokeWidth={3} name="Suboptimal %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Track Occupancy Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5 text-blue-600" />
            Stabling Track Status
          </CardTitle>
          <CardDescription>Real-time track occupancy and optimization status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trackOccupancy.map((track, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{track.track}</h4>
                    <Badge className={track.occupied ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}>
                      {track.occupied ? 'Occupied' : 'Available'}
                    </Badge>
                  </div>
                  
                  {track.trainset && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Train: {track.trainset}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${track.optimal ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-sm ${track.optimal ? 'text-green-600' : 'text-red-600'}`}>
                          {track.optimal ? 'Optimal' : 'Suboptimal'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Next: {track.nextMovement}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Stabling Optimization Tasks
          </CardTitle>
          <CardDescription>
            Complete positioning tasks to minimize shunting and energy consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {urgentTasks.length > 0 && (
              <div>
                <h4 className="font-medium text-red-600 mb-3">🚨 Critical Tasks</h4>
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
                        Est. {task.time} min • Shunting time: {task.shuntingTime} min
                      </p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
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
                      <p className="text-sm text-gray-500">
                        Completed in {task.time} min
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

      {/* Detailed Positioning Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Detailed Position Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stablingData.map((stabling) => (
              <div key={stabling.trainset} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{stabling.trainset}</h4>
                    <p className="text-gray-600">
                      Current: {stabling.currentPosition} → Optimal: {stabling.optimalPosition}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(stabling.status)}>
                      {stabling.status}
                    </Badge>
                    <Badge className={getEnergyColor(stabling.energyConsumption)}>
                      {stabling.energyConsumption} Energy
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Next Service: {stabling.nextService}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-400" />
                    <span>Shunting: {stabling.shuntingTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span>Energy: {stabling.energyConsumption}</span>
                  </div>
                </div>

                {stabling.status === 'Critical' && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded mb-2">
                    ⚠️ Critical positioning issue - immediate action required to avoid service delays
                  </div>
                )}

                {stabling.shuntingTime > 15 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                    ⚠️ High shunting time detected - consider repositioning for energy efficiency
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
