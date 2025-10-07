// Mock data for AI-Based Rockfall Prediction System

export const mineZones = [
  { id: 1, name: 'North Slope A', x: 100, y: 150, riskLevel: 'high', probability: 0.85, lastIncident: '2024-08-15' },
  { id: 2, name: 'South Bench B', x: 200, y: 100, riskLevel: 'medium', probability: 0.45, lastIncident: '2024-07-22' },
  { id: 3, name: 'East Wall C', x: 300, y: 200, riskLevel: 'low', probability: 0.15, lastIncident: '2024-06-10' },
  { id: 4, name: 'West Terrace D', x: 150, y: 250, riskLevel: 'high', probability: 0.78, lastIncident: null },
  { id: 5, name: 'Central Pit E', x: 250, y: 180, riskLevel: 'medium', probability: 0.52, lastIncident: '2024-08-01' }
];

export const sensorData = [
  { id: 'S001', type: 'displacement', location: 'North Slope A', value: 15.2, unit: 'mm', status: 'critical', timestamp: '2024-09-04 14:30' },
  { id: 'S002', type: 'strain', location: 'South Bench B', value: 0.003, unit: 'με', status: 'normal', timestamp: '2024-09-04 14:30' },
  { id: 'S003', type: 'pore_pressure', location: 'East Wall C', value: 125, unit: 'kPa', status: 'warning', timestamp: '2024-09-04 14:29' },
  { id: 'S004', type: 'vibration', location: 'West Terrace D', value: 8.7, unit: 'mm/s', status: 'critical', timestamp: '2024-09-04 14:31' },
  { id: 'S005', type: 'displacement', location: 'Central Pit E', value: 3.1, unit: 'mm', status: 'normal', timestamp: '2024-09-04 14:30' }
];

export const environmentalData = [
  { timestamp: '2024-09-04 00:00', rainfall: 0, temperature: 18, humidity: 65, windSpeed: 12 },
  { timestamp: '2024-09-04 06:00', rainfall: 2.5, temperature: 16, humidity: 78, windSpeed: 8 },
  { timestamp: '2024-09-04 12:00', rainfall: 8.2, temperature: 22, humidity: 85, windSpeed: 15 },
  { timestamp: '2024-09-04 18:00', rainfall: 12.1, temperature: 19, humidity: 92, windSpeed: 18 }
];

export const predictionHistory = [
  { date: '2024-09-01', zone: 'North Slope A', predicted: 0.72, actual: 0.85, accuracy: 0.91 },
  { date: '2024-09-02', zone: 'South Bench B', predicted: 0.38, actual: 0.42, accuracy: 0.95 },
  { date: '2024-09-03', zone: 'East Wall C', predicted: 0.18, actual: 0.15, accuracy: 0.88 },
  { date: '2024-09-04', zone: 'West Terrace D', predicted: 0.75, actual: 0.78, accuracy: 0.92 }
];

export const alertHistory = [
  { id: 1, timestamp: '2024-09-04 14:25', type: 'critical', zone: 'North Slope A', message: 'High displacement detected - immediate evacuation recommended', status: 'active' },
  { id: 2, timestamp: '2024-09-04 13:45', type: 'warning', zone: 'West Terrace D', message: 'Increasing vibration levels - monitor closely', status: 'acknowledged' },
  { id: 3, timestamp: '2024-09-04 12:30', type: 'info', zone: 'Central Pit E', message: 'Routine sensor calibration completed', status: 'resolved' },
  { id: 4, timestamp: '2024-09-04 11:15', type: 'warning', zone: 'East Wall C', message: 'Elevated pore pressure after rainfall', status: 'monitoring' }
];

export const riskTrendData = [
  { date: '2024-08-28', northSlope: 0.45, southBench: 0.32, eastWall: 0.18, westTerrace: 0.52, centralPit: 0.28 },
  { date: '2024-08-29', northSlope: 0.52, southBench: 0.35, eastWall: 0.22, westTerrace: 0.58, centralPit: 0.31 },
  { date: '2024-08-30', northSlope: 0.61, southBench: 0.38, eastWall: 0.19, westTerrace: 0.65, centralPit: 0.34 },
  { date: '2024-08-31', northSlope: 0.68, southBench: 0.41, eastWall: 0.16, westTerrace: 0.71, centralPit: 0.37 },
  { date: '2024-09-01', northSlope: 0.72, southBench: 0.43, eastWall: 0.14, westTerrace: 0.74, centralPit: 0.42 },
  { date: '2024-09-02', northSlope: 0.78, southBench: 0.44, eastWall: 0.13, westTerrace: 0.76, centralPit: 0.45 },
  { date: '2024-09-03', northSlope: 0.82, southBench: 0.45, eastWall: 0.15, westTerrace: 0.77, centralPit: 0.48 },
  { date: '2024-09-04', northSlope: 0.85, southBench: 0.45, eastWall: 0.15, westTerrace: 0.78, centralPit: 0.52 }
];