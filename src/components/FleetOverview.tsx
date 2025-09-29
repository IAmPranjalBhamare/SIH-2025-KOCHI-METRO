import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Train, Clock, Wrench, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const fleetStatusData = [
  { name: 'In Service', value: 18, color: '#10b981' },
  { name: 'Standby', value: 4, color: '#f59e0b' },
  { name: 'Maintenance', value: 3, color: '#8b5cf6' }
];

const mileageData = [
  { trainset: 'T-001', mileage: 74523, status: 'Normal' },
  { trainset: 'T-002', mileage: 68932, status: 'Normal' },
  { trainset: 'T-003', mileage: 82156, status: 'High' },
  { trainset: 'T-004', mileage: 71245, status: 'Normal' },
  { trainset: 'T-005', mileage: 65789, status: 'Low' },
  { trainset: 'T-006', mileage: 79432, status: 'High' }
];

const punctualityTrend = [
  { date: '2024-01-01', punctuality: 98.5 },
  { date: '2024-01-02', punctuality: 99.1 },
  { date: '2024-01-03', punctuality: 99.8 },
  { date: '2024-01-04', punctuality: 99.2 },
  { date: '2024-01-05', punctuality: 99.6 },
  { date: '2024-01-06', punctuality: 99.9 },
  { date: '2024-01-07', punctuality: 99.2 }
];

const maintenanceSchedule = [
  { type: 'Daily Inspection', count: 25, completed: 23 },
  { type: 'Weekly Check', count: 8, completed: 8 },
  { type: 'Monthly Service', count: 3, completed: 2 },
  { type: 'Quarterly Overhaul', count: 1, completed: 0 }
];

export function FleetOverview() {
  return (
    <div className="space-y-6">
      {/* Fleet Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="w-5 h-5 text-blue-600" />
              Fleet Status Distribution
            </CardTitle>
            <CardDescription>Current operational status of all 25 trainsets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fleetStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {fleetStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {fleetStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value} units</Badge>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Fleet utilization: 88%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Punctuality Trend
            </CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={punctualityTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis domain={[98, 100]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value}%`, 'Punctuality']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="punctuality" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Above target consistently</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mileage Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-5 h-5 text-purple-600" />
            Mileage Balancing Analysis
          </CardTitle>
          <CardDescription>Individual trainset mileage comparison for balanced wear</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mileageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trainset" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} km`, 'Mileage']} />
                <Bar 
                  dataKey="mileage" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 mb-1">High Mileage</p>
              <p className="text-2xl text-red-700">2 units</p>
              <p className="text-xs text-red-500">Requires priority rotation</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Balanced</p>
              <p className="text-2xl text-green-700">20 units</p>
              <p className="text-xs text-green-500">Within normal range</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">Low Mileage</p>
              <p className="text-2xl text-blue-700">3 units</p>
              <p className="text-xs text-blue-500">Can handle more load</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-orange-600" />
            Maintenance Schedule Overview
          </CardTitle>
          <CardDescription>Current maintenance tasks and completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {maintenanceSchedule.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.type}</span>
                  <Badge variant={item.completed === item.count ? "default" : "secondary"}>
                    {item.completed}/{item.count}
                  </Badge>
                </div>
                <Progress 
                  value={(item.completed / item.count) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{Math.round((item.completed / item.count) * 100)}% completed</span>
                  {item.completed < item.count && (
                    <span className="text-orange-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {item.count - item.completed} pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}