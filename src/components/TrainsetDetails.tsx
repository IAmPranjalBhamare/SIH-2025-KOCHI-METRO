import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { 
  Train, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Search,
  Filter,
  MapPin,
  Calendar,
  Zap,
  Thermometer,
  X,
  Info,
  Settings,
  TrendingUp,
  Shield,
  Paintbrush
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const trainsetData = [
  {
    id: 'T-001',
    status: 'In Service',
    location: 'Aluva-Ernakulam',
    mileage: 74523,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    fitnessExpiry: '2024-03-20',
    brandingContract: 'Kerala Tourism',
    brandingExpiry: '2024-06-30',
    cleaningStatus: 'Completed',
    jobCards: 0,
    alerts: []
  },
  {
    id: 'T-002',
    status: 'In Service',
    location: 'Ernakulam-Thaikoodam',
    mileage: 68932,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    fitnessExpiry: '2024-04-15',
    brandingContract: 'Malabar Gold',
    brandingExpiry: '2024-05-25',
    cleaningStatus: 'Pending',
    jobCards: 1,
    alerts: ['Cleaning overdue']
  },
  {
    id: 'T-003',
    status: 'Standby',
    location: 'Muttom Depot',
    mileage: 82156,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    fitnessExpiry: '2024-02-28',
    brandingContract: null,
    brandingExpiry: null,
    cleaningStatus: 'Completed',
    jobCards: 0,
    alerts: ['High mileage', 'Fitness expiring soon']
  },
  {
    id: 'T-004',
    status: 'In Service',
    location: 'Thaikoodam-Maharajas',
    mileage: 71245,
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-02-12',
    fitnessExpiry: '2024-05-10',
    brandingContract: 'Federal Bank',
    brandingExpiry: '2024-08-15',
    cleaningStatus: 'In Progress',
    jobCards: 2,
    alerts: ['Job cards pending']
  },
  {
    id: 'T-005',
    status: 'Maintenance',
    location: 'IBL Bay 1',
    mileage: 65789,
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-01-30',
    fitnessExpiry: '2024-04-20',
    brandingContract: 'Lulu Group',
    brandingExpiry: '2024-07-10',
    cleaningStatus: 'Not Required',
    jobCards: 3,
    alerts: ['In maintenance']
  },
  {
    id: 'T-006',
    status: 'In Service',
    location: 'Maharajas-Ernakulam South',
    mileage: 79432,
    lastMaintenance: '2024-01-18',
    nextMaintenance: '2024-02-18',
    fitnessExpiry: '2024-03-25',
    brandingContract: 'Kalyan Jewellers',
    brandingExpiry: '2024-09-30',
    cleaningStatus: 'Completed',
    jobCards: 0,
    alerts: ['High mileage']
  }
];

export function TrainsetDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTrainset, setSelectedTrainset] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Service': return 'bg-green-100 text-green-800';
      case 'Standby': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCleaningStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'Not Required': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = trainsetData.filter(train => {
    const matchesSearch = train.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || train.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getMileageStatus = (mileage) => {
    if (mileage > 80000) return { status: 'High', color: 'text-red-600' };
    if (mileage < 68000) return { status: 'Low', color: 'text-blue-600' };
    return { status: 'Normal', color: 'text-green-600' };
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Trainset Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by trainset ID or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="In Service">In Service</SelectItem>
                <SelectItem value="Standby">Standby</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trainset Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-5 h-5 text-purple-600" />
            Fleet Details
          </CardTitle>
          <CardDescription>Comprehensive view of all trainset parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trainset</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Fitness Expiry</TableHead>
                  <TableHead>Branding</TableHead>
                  <TableHead>Cleaning</TableHead>
                  <TableHead>Job Cards</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((train) => {
                  const mileageStatus = getMileageStatus(train.mileage);
                  return (
                    <TableRow key={train.id}>
                      <TableCell className="font-medium">{train.id}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(train.status)}>
                          {train.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{train.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className={`font-medium ${mileageStatus.color}`}>
                            {train.mileage.toLocaleString()} km
                          </span>
                          <div className="text-xs text-gray-500">
                            {mileageStatus.status}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{train.fitnessExpiry}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {train.brandingContract ? (
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{train.brandingContract}</div>
                            <div className="text-xs text-gray-500">Until {train.brandingExpiry}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">No branding</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCleaningStatusColor(train.cleaningStatus)}>
                          {train.cleaningStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {train.jobCards > 0 ? (
                            <>
                              <AlertTriangle className="w-3 h-3 text-orange-500" />
                              <span className="text-orange-600">{train.jobCards}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-green-600">0</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {train.alerts.length > 0 ? (
                          <div className="space-y-1">
                            {train.alerts.map((alert, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {alert}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-green-600">
                            No alerts
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Info className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Train className="w-5 h-5 text-purple-600" />
                                Trainset {train.id} - Detailed Information
                              </DialogTitle>
                              <DialogDescription>
                                Comprehensive overview of trainset status, maintenance, and operational details
                              </DialogDescription>
                            </DialogHeader>
                            
                            {/* Comprehensive Details */}
                            <div className="space-y-6">
                              {/* Status Overview */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardContent className="pt-4">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-3 h-3 rounded-full ${train.status === 'In Service' ? 'bg-green-500' : train.status === 'Standby' ? 'bg-yellow-500' : 'bg-purple-500'}`}></div>
                                      <span className="font-medium">Current Status</span>
                                    </div>
                                    <p className="text-lg font-semibold mt-1">{train.status}</p>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardContent className="pt-4">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-blue-600" />
                                      <span className="font-medium">Location</span>
                                    </div>
                                    <p className="text-lg font-semibold mt-1">{train.location}</p>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardContent className="pt-4">
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-green-600" />
                                      <span className="font-medium">Mileage Status</span>
                                    </div>
                                    <p className={`text-lg font-semibold mt-1 ${getMileageStatus(train.mileage).color}`}>
                                      {train.mileage.toLocaleString()} km
                                    </p>
                                    <p className="text-sm text-gray-500">{getMileageStatus(train.mileage).status}</p>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              {/* Maintenance Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-purple-600" />
                                    Maintenance Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Last Maintenance</label>
                                      <p className="text-lg">{new Date(train.lastMaintenance).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Next Maintenance Due</label>
                                      <p className="text-lg">{new Date(train.nextMaintenance).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                      <label className="text-sm font-medium text-gray-600">Maintenance Progress</label>
                                      <div className="mt-2">
                                        <Progress value={75} className="h-2" />
                                        <p className="text-sm text-gray-500 mt-1">Scheduled maintenance in 15 days</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              {/* Fitness Certificate */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    Fitness Certificate
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">Expiry Date</p>
                                      <p className="text-lg">{new Date(train.fitnessExpiry).toLocaleDateString('en-IN')}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-gray-600">Days Remaining</p>
                                      <p className="text-2xl font-bold text-green-600">
                                        {Math.ceil((new Date(train.fitnessExpiry) - new Date()) / (1000 * 60 * 60 * 24))}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-3">
                                    <Progress 
                                      value={Math.max(0, Math.min(100, (Math.ceil((new Date(train.fitnessExpiry) - new Date()) / (1000 * 60 * 60 * 24)) / 365) * 100))} 
                                      className="h-2" 
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                              
                              {/* Branding Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Paintbrush className="w-5 h-5 text-pink-600" />
                                    Branding Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {train.brandingContract ? (
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="font-medium">Current Contract</p>
                                          <p className="text-lg">{train.brandingContract}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm text-gray-600">Contract Expiry</p>
                                          <p className="text-lg">{new Date(train.brandingExpiry).toLocaleDateString('en-IN')}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-600 mb-1">Contract Duration Remaining</p>
                                        <Progress 
                                          value={Math.max(0, Math.min(100, (Math.ceil((new Date(train.brandingExpiry) - new Date()) / (1000 * 60 * 60 * 24)) / 365) * 100))} 
                                          className="h-2" 
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                          {Math.ceil((new Date(train.brandingExpiry) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center py-8 text-gray-500">
                                      <Paintbrush className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                      <p>No active branding contract</p>
                                      <p className="text-sm">Available for new branding opportunities</p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                              
                              {/* Cleaning & Job Cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <Zap className="w-5 h-5 text-blue-600" />
                                      Cleaning Status
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center justify-between">
                                      <Badge className={getCleaningStatusColor(train.cleaningStatus)}>
                                        {train.cleaningStatus}
                                      </Badge>
                                      {train.cleaningStatus === 'Completed' && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                      )}
                                    </div>
                                    <div className="mt-3">
                                      <p className="text-sm text-gray-600">Last Cleaned</p>
                                      <p>2 days ago</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <Settings className="w-5 h-5 text-orange-600" />
                                      Job Cards
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-2xl font-bold">{train.jobCards}</p>
                                        <p className="text-sm text-gray-600">Active job cards</p>
                                      </div>
                                      {train.jobCards === 0 ? (
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                      ) : (
                                        <AlertTriangle className="w-8 h-8 text-orange-500" />
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              {/* Alerts & Recommendations */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    Alerts & Recommendations
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {train.alerts.length > 0 ? (
                                    <div className="space-y-2">
                                      {train.alerts.map((alert, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                                          <AlertTriangle className="w-4 h-4 text-red-500" />
                                          <span className="text-red-700">{alert}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-4 text-green-600">
                                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                      <p>No active alerts - All systems operational</p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                              
                              {/* Quick Actions */}
                              <Card>
                                <CardHeader>
                                  <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline">Schedule Maintenance</Button>
                                    <Button size="sm" variant="outline">Update Location</Button>
                                    <Button size="sm" variant="outline">Generate Report</Button>
                                    <Button size="sm" variant="outline">View History</Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ready for Service</p>
              <p className="text-xl font-semibold">22</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Job Cards</p>
              <p className="text-xl font-semibold">6</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cleaning Pending</p>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Wrench className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Maintenance</p>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}