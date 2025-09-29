import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  Navigation, 
  Zap,
  Users,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Eye,
  Activity
} from 'lucide-react';

interface TrainPosition {
  id: string;
  name: string;
  route: string;
  station: string;
  nextStation: string;
  speed: number;
  passengers: number;
  status: 'Running' | 'Stopped' | 'Maintenance' | 'Emergency';
  coordinates: { x: number; y: number; z: number };
  direction: number;
  delay: number;
  energyConsumption: number;
}

const metroRoutes = [
  {
    name: 'Blue Line',
    color: '#3b82f6',
    stations: ['Aluva', 'Pulinchodu', 'Kalamassery', 'Cusat', 'Pathadipalam', 'Edapally', 'Changampuzha Park', 'Palarivattom', 'JLN Stadium', 'Kaloor', 'Town Hall', 'MG Road', 'Maharajas', 'Ernakulam South', 'Kadavanthra', 'Elamkulam', 'Vyttila', 'Thaikoodam']
  }
];

const liveTrains: TrainPosition[] = [
  {
    id: 'T-001',
    name: 'Metro Express 1',
    route: 'Blue Line',
    station: 'Ernakulam South',
    nextStation: 'Kadavanthra',
    speed: 45,
    passengers: 280,
    status: 'Running',
    coordinates: { x: 320, y: 105, z: 0 },
    direction: 90,
    delay: 0,
    energyConsumption: 1250
  },
  {
    id: 'T-007',
    name: 'Metro Express 7',
    route: 'Blue Line',
    station: 'MG Road',
    nextStation: 'Town Hall',
    speed: 0,
    passengers: 320,
    status: 'Stopped',
    coordinates: { x: 290, y: 125, z: 0 },
    direction: 270,
    delay: 2,
    energyConsumption: 850
  },
  {
    id: 'T-012',
    name: 'Metro Express 12',
    route: 'Blue Line',
    station: 'Depot',
    nextStation: 'Aluva',
    speed: 0,
    passengers: 0,
    status: 'Maintenance',
    coordinates: { x: 30, y: 300, z: 0 },
    direction: 0,
    delay: 0,
    energyConsumption: 0
  },
  {
    id: 'T-018',
    name: 'Metro Express 18',
    route: 'Blue Line',
    station: 'Palarivattom',
    nextStation: 'JLN Stadium',
    speed: 55,
    passengers: 195,
    status: 'Running',
    coordinates: { x: 230, y: 165, z: 0 },
    direction: 45,
    delay: 0,
    energyConsumption: 1380
  },
  {
    id: 'T-023',
    name: 'Metro Express 23',
    route: 'Blue Line',
    station: 'Aluva',
    nextStation: 'Pulinchodu',
    speed: 38,
    passengers: 150,
    status: 'Running',
    coordinates: { x: 60, y: 280, z: 0 },
    direction: 135,
    delay: 0,
    energyConsumption: 1100
  }
];

const stations = [
  { name: 'Aluva', x: 60, y: 280, isTerminal: true },
  { name: 'Pulinchodu', x: 90, y: 260 },
  { name: 'Kalamassery', x: 120, y: 240 },
  { name: 'Cusat', x: 150, y: 220 },
  { name: 'Pathadipalam', x: 180, y: 200 },
  { name: 'Edapally', x: 200, y: 185 },
  { name: 'Changampuzha Park', x: 215, y: 175 },
  { name: 'Palarivattom', x: 230, y: 165 },
  { name: 'JLN Stadium', x: 245, y: 155 },
  { name: 'Kaloor', x: 260, y: 145 },
  { name: 'Town Hall', x: 275, y: 135 },
  { name: 'MG Road', x: 290, y: 125 },
  { name: 'Maharajas', x: 305, y: 115 },
  { name: 'Ernakulam South', x: 320, y: 105 },
  { name: 'Kadavanthra', x: 340, y: 140 },
  { name: 'Elamkulam', x: 360, y: 130 },
  { name: 'Vyttila', x: 380, y: 120 },
  { name: 'Thaikoodam', x: 420, y: 100, isTerminal: true }
];

export function RealTime3DFleetMap() {
  const [trains, setTrains] = useState<TrainPosition[]>(liveTrains);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [showPassengerFlow, setShowPassengerFlow] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (isPlaying) {
        updateTrainPositions();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    drawMap();
  }, [trains, selectedTrain, viewMode, showPassengerFlow]);

  const updateTrainPositions = () => {
    setTrains(prevTrains => 
      prevTrains.map(train => {
        if (train.status === 'Running') {
          // Simulate train movement
          const speed = train.speed * 0.1;
          const radians = (train.direction * Math.PI) / 180;
          const newX = train.coordinates.x + Math.cos(radians) * speed;
          const newY = train.coordinates.y + Math.sin(radians) * speed;
          
          // Add some randomness to make it more realistic
          const speedVariation = train.speed + (Math.random() - 0.5) * 10;
          const passengerVariation = Math.max(0, train.passengers + Math.floor((Math.random() - 0.5) * 20));
          
          return {
            ...train,
            coordinates: { ...train.coordinates, x: newX, y: newY },
            speed: Math.max(0, Math.min(60, speedVariation)),
            passengers: Math.min(350, passengerVariation),
            energyConsumption: Math.round(train.speed * 25 + Math.random() * 100)
          };
        }
        return train;
      })
    );
  };

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background with better contrast
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#f8fafc');
    gradient.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw route lines with better visibility
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    // Add subtle shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    ctx.beginPath();
    stations.forEach((station, index) => {
      if (index === 0) {
        ctx.moveTo(station.x, station.y);
      } else {
        ctx.lineTo(station.x, station.y);
      }
    });
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw stations with smaller, clearer dots
    stations.forEach(station => {
      // Station outline for better visibility
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fillStyle = station.isTerminal ? '#dc2626' : '#2563eb';
      
      ctx.beginPath();
      ctx.arc(station.x, station.y, station.isTerminal ? 5 : 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      // Station names with better readability
      ctx.fillStyle = '#1f2937';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.font = '9px Arial';
      ctx.textAlign = 'center';
      
      // Text outline for better contrast
      ctx.strokeText(station.name, station.x, station.y - 10);
      ctx.fillText(station.name, station.x, station.y - 10);
    });

    // Draw passenger flow if enabled
    if (showPassengerFlow) {
      stations.forEach(station => {
        const intensity = Math.random() * 100;
        const alpha = intensity / 200; // Reduced opacity for better visibility
        ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        ctx.beginPath();
        ctx.arc(station.x, station.y, 8, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw trains with improved visibility
    trains.forEach(train => {
      const isSelected = selectedTrain === train.id;
      const trainSize = isSelected ? 10 : 8; // Reduced train size
      
      // Train body with better styling
      ctx.save();
      ctx.translate(train.coordinates.x, train.coordinates.y);
      ctx.rotate((train.direction * Math.PI) / 180);
      
      // Train color based on status
      let trainColor = '#059669';
      let borderColor = '#047857';
      switch (train.status) {
        case 'Running':
          trainColor = '#059669';
          borderColor = '#047857';
          break;
        case 'Stopped':
          trainColor = '#d97706';
          borderColor = '#b45309';
          break;
        case 'Maintenance':
          trainColor = '#6b7280';
          borderColor = '#4b5563';
          break;
        case 'Emergency':
          trainColor = '#dc2626';
          borderColor = '#b91c1c';
          break;
      }
      
      // Train shadow for 3D effect
      if (viewMode === '3D') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(-trainSize/2 + 1, -trainSize/4 + 1, trainSize, trainSize/2);
      }
      
      // Train body
      ctx.fillStyle = trainColor;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.fillRect(-trainSize/2, -trainSize/4, trainSize, trainSize/2);
      ctx.strokeRect(-trainSize/2, -trainSize/4, trainSize, trainSize/2);
      
      // Train direction indicator (smaller)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(trainSize/4, -trainSize/8, trainSize/8, trainSize/4);
      
      ctx.restore();

      // Selection highlight with improved styling
      if (isSelected) {
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(train.coordinates.x, train.coordinates.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add glow effect
        ctx.shadowColor = '#7c3aed';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(train.coordinates.x, train.coordinates.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Speed indicator with better styling
      if (train.status === 'Running') {
        ctx.fillStyle = '#1f2937';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        
        ctx.strokeText(`${train.speed}km/h`, train.coordinates.x, train.coordinates.y + 20);
        ctx.fillText(`${train.speed}km/h`, train.coordinates.x, train.coordinates.y + 20);
      }

      // Train ID with better contrast
      ctx.fillStyle = '#1f2937';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.font = 'bold 7px Arial';
      ctx.textAlign = 'center';
      
      ctx.strokeText(train.id, train.coordinates.x, train.coordinates.y - 15);
      ctx.fillText(train.id, train.coordinates.x, train.coordinates.y - 15);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-green-600 bg-green-100';
      case 'Stopped': return 'text-yellow-600 bg-yellow-100';
      case 'Maintenance': return 'text-gray-600 bg-gray-100';
      case 'Emergency': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedTrainData = trains.find(t => t.id === selectedTrain);

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="p-3 bg-white/20 rounded-full"
                >
                  <Map className="w-8 h-8" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">Live 3D Fleet Tracker</h2>
                  <p className="text-cyan-200">Real-time train positioning & passenger flow</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-cyan-200">
                  Last updated: {currentTime.toLocaleTimeString()}
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(viewMode === '2D' ? '3D' : '2D')}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPassengerFlow(!showPassengerFlow)}
                    className={`p-2 rounded-lg transition-colors ${
                      showPassengerFlow ? 'bg-yellow-500/30' : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Map and Train Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Kochi Metro Network - {viewMode} View
              </CardTitle>
              <CardDescription>
                Click on trains for detailed information • 
                {showPassengerFlow ? ' Passenger flow overlay active' : ' Enable passenger flow overlay'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={350}
                  className="border rounded-lg cursor-pointer w-full shadow-lg bg-white"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 500;
                    const y = ((e.clientY - rect.top) / rect.height) * 350;
                    
                    // Find clicked train
                    const clickedTrain = trains.find(train => {
                      const distance = Math.sqrt(
                        Math.pow(x - train.coordinates.x, 2) + 
                        Math.pow(y - train.coordinates.y, 2)
                      );
                      return distance < 15; // Reduced click area for better precision
                    });
                    
                    setSelectedTrain(clickedTrain ? clickedTrain.id : null);
                  }}
                />
                
                {/* Map Legend */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Running</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Stopped</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded"></div>
                      <span>Maintenance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>Terminal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Train Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Train Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {selectedTrainData ? (
                  <motion.div
                    key={selectedTrainData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{selectedTrainData.name}</h3>
                      <Badge className={getStatusColor(selectedTrainData.status)}>
                        {selectedTrainData.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Location:</span>
                        <span className="font-medium">{selectedTrainData.station}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Station:</span>
                        <span className="font-medium">{selectedTrainData.nextStation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Speed:</span>
                        <span className="font-medium">{selectedTrainData.speed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-medium">{selectedTrainData.passengers}/350</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Energy Usage:</span>
                        <span className="font-medium">{selectedTrainData.energyConsumption} kW</span>
                      </div>
                      {selectedTrainData.delay > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delay:</span>
                          <span className="font-medium text-red-600">+{selectedTrainData.delay} min</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Passenger Load</span>
                        <span className="text-sm">{Math.round((selectedTrainData.passengers/350)*100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedTrainData.passengers/350)*100}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-2 rounded-full ${
                            selectedTrainData.passengers > 280 ? 'bg-red-500' :
                            selectedTrainData.passengers > 200 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-500 py-8"
                  >
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click on a train to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Fleet Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Live Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {trains.map((train) => (
                <motion.div
                  key={train.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTrain(train.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedTrain === train.id ? 'border-purple-500 bg-purple-50' : 'hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{train.id}</span>
                    <Badge className={`text-xs ${getStatusColor(train.status)}`}>
                      {train.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <span>{train.speed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Load:</span>
                      <span>{Math.round((train.passengers/350)*100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energy:</span>
                      <span>{train.energyConsumption}kW</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}