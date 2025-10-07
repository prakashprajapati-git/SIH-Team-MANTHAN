// Expanded Indian Mines Data covering more states and regions

export const expandedIndianMineZones = [
  // Existing mines
  { id: 1, name: 'Jharia Coal Mine - Block A', x: 120, y: 180, riskLevel: 'high', probability: 0.88, lastIncident: '2024-08-20', state: 'Jharkhand', mineType: 'Coal', district: 'Dhanbad', workers: 450 },
  { id: 2, name: 'Bailadila Iron Ore - Sector 14', x: 220, y: 120, riskLevel: 'medium', probability: 0.52, lastIncident: '2024-07-15', state: 'Chhattisgarh', mineType: 'Iron Ore', district: 'Dantewada', workers: 320 },
  { id: 3, name: 'Kolar Gold Fields - Level 3', x: 320, y: 220, riskLevel: 'high', probability: 0.82, lastIncident: '2024-08-25', state: 'Karnataka', mineType: 'Gold', district: 'Kolar', workers: 180 },
  { id: 4, name: 'Singareni Coal - Pit 2', x: 180, y: 260, riskLevel: 'medium', probability: 0.48, lastIncident: '2024-06-30', state: 'Telangana', mineType: 'Coal', district: 'Khammam', workers: 380 },
  { id: 5, name: 'Rajasthan Marble Quarry', x: 280, y: 160, riskLevel: 'low', probability: 0.22, lastIncident: null, state: 'Rajasthan', mineType: 'Marble', district: 'Makrana', workers: 150 },
  { id: 6, name: 'Odisha Bauxite Mine', x: 160, y: 100, riskLevel: 'high', probability: 0.76, lastIncident: '2024-08-10', state: 'Odisha', mineType: 'Bauxite', district: 'Koraput', workers: 280 },
  { id: 7, name: 'Gujarat Limestone Quarry', x: 100, y: 240, riskLevel: 'medium', probability: 0.41, lastIncident: '2024-07-05', state: 'Gujarat', mineType: 'Limestone', district: 'Kutch', workers: 220 },
  
  // New expanded mines across India
  { id: 8, name: 'Korba Coal Mine - Block C', x: 200, y: 140, riskLevel: 'high', probability: 0.79, lastIncident: '2024-08-18', state: 'Chhattisgarh', mineType: 'Coal', district: 'Korba', workers: 520 },
  { id: 9, name: 'Rourkela Steel Plant Mine', x: 180, y: 110, riskLevel: 'medium', probability: 0.44, lastIncident: '2024-07-20', state: 'Odisha', mineType: 'Iron Ore', district: 'Sundargarh', workers: 410 },
  { id: 10, name: 'Bellary Iron Ore Mine', x: 300, y: 200, riskLevel: 'high', probability: 0.73, lastIncident: '2024-08-12', state: 'Karnataka', mineType: 'Iron Ore', district: 'Bellary', workers: 350 },
  { id: 11, name: 'Neyveli Lignite Mine', x: 330, y: 250, riskLevel: 'medium', probability: 0.39, lastIncident: '2024-06-25', state: 'Tamil Nadu', mineType: 'Lignite', district: 'Cuddalore', workers: 480 },
  { id: 12, name: 'Singhbhum Copper Mine', x: 140, y: 170, riskLevel: 'low', probability: 0.28, lastIncident: null, state: 'Jharkhand', mineType: 'Copper', district: 'East Singhbhum', workers: 190 },
  { id: 13, name: 'Zawar Lead-Zinc Mine', x: 250, y: 180, riskLevel: 'medium', probability: 0.56, lastIncident: '2024-07-08', state: 'Rajasthan', mineType: 'Lead-Zinc', district: 'Udaipur', workers: 240 },
  { id: 14, name: 'Mangampet Barytes Mine', x: 310, y: 210, riskLevel: 'low', probability: 0.31, lastIncident: null, state: 'Andhra Pradesh', mineType: 'Barytes', district: 'Kadapa', workers: 160 },
  { id: 15, name: 'Jharsuguda Coal Mine', x: 170, y: 120, riskLevel: 'high', probability: 0.81, lastIncident: '2024-08-22', state: 'Odisha', mineType: 'Coal', district: 'Jharsuguda', workers: 390 },
  { id: 16, name: 'Goa Iron Ore Mine', x: 270, y: 230, riskLevel: 'medium', probability: 0.47, lastIncident: '2024-07-12', state: 'Goa', mineType: 'Iron Ore', district: 'South Goa', workers: 200 },
  { id: 17, name: 'Jharia Coking Coal Mine', x: 130, y: 190, riskLevel: 'critical', probability: 0.92, lastIncident: '2024-08-28', state: 'Jharkhand', mineType: 'Coking Coal', district: 'Dhanbad', workers: 580 },
  { id: 18, name: 'Kudremukh Iron Ore Mine', x: 290, y: 220, riskLevel: 'medium', probability: 0.43, lastIncident: '2024-06-18', state: 'Karnataka', mineType: 'Iron Ore', district: 'Chikkamagaluru', workers: 270 },
  { id: 19, name: 'Talcher Coal Mine', x: 190, y: 130, riskLevel: 'high', probability: 0.77, lastIncident: '2024-08-15', state: 'Odisha', mineType: 'Coal', district: 'Angul', workers: 440 },
  { id: 20, name: 'Hutti Gold Mine', x: 310, y: 200, riskLevel: 'low', probability: 0.25, lastIncident: null, state: 'Karnataka', mineType: 'Gold', district: 'Raichur', workers: 120 }
];

export const indianSensorData = [
  { id: 'IND001', type: 'displacement', location: 'Jharia Coal Mine - Block A', value: 18.5, unit: 'mm', status: 'critical', timestamp: '2024-09-04 14:30', workerAlert: true },
  { id: 'IND002', type: 'strain', location: 'Bailadila Iron Ore - Sector 14', value: 0.0045, unit: 'με', status: 'normal', timestamp: '2024-09-04 14:30', workerAlert: false },
  { id: 'IND003', type: 'pore_pressure', location: 'Kolar Gold Fields - Level 3', value: 145, unit: 'kPa', status: 'warning', timestamp: '2024-09-04 14:29', workerAlert: true },
  { id: 'IND004', type: 'vibration', location: 'Singareni Coal - Pit 2', value: 12.3, unit: 'mm/s', status: 'critical', timestamp: '2024-09-04 14:31', workerAlert: true },
  { id: 'IND005', type: 'displacement', location: 'Rajasthan Marble Quarry', value: 2.8, unit: 'mm', status: 'normal', timestamp: '2024-09-04 14:30', workerAlert: false },
  { id: 'IND006', type: 'gas_detection', location: 'Jharia Coal Mine - Block A', value: 0.8, unit: '%CH4', status: 'warning', timestamp: '2024-09-04 14:32', workerAlert: true },
  { id: 'IND007', type: 'temperature', location: 'Odisha Bauxite Mine', value: 42, unit: '°C', status: 'warning', timestamp: '2024-09-04 14:28', workerAlert: false }
];

export const indianAlertHistory = [
  { id: 1, timestamp: '2024-09-04 14:25', type: 'critical', zone: 'Jharia Coal Mine - Block A', message: 'उच्च विस्थापन का पता चला - तत्काल निकासी की सिफारिश (High displacement detected - immediate evacuation recommended)', status: 'active', language: 'hindi' },
  { id: 2, timestamp: '2024-09-04 13:45', type: 'warning', zone: 'Kolar Gold Fields - Level 3', message: 'बढ़ते कंपन स्तर - बारीकी से निगरानी करें (Increasing vibration levels - monitor closely)', status: 'acknowledged', language: 'hindi' },
  { id: 3, timestamp: '2024-09-04 12:30', type: 'info', zone: 'Rajasthan Marble Quarry', message: 'नियमित सेंसर अंशांकन पूर्ण (Routine sensor calibration completed)', status: 'resolved', language: 'hindi' },
  { id: 4, timestamp: '2024-09-04 11:15', type: 'critical', zone: 'Odisha Bauxite Mine', message: 'मानसून के बाद उच्च छिद्र दबाव (High pore pressure after monsoon)', status: 'monitoring', language: 'hindi' },
  { id: 5, timestamp: '2024-09-04 10:30', type: 'warning', zone: 'Singareni Coal - Pit 2', message: 'गैस रिसाव का संदेह - क्षेत्र खाली करें (Suspected gas leak - evacuate area)', status: 'active', language: 'hindi' }
];

export const stateWiseStatistics = {
  'Jharkhand': { totalMines: 3, highRisk: 2, totalWorkers: 1220, majorMinerals: ['Coal', 'Copper', 'Coking Coal'] },
  'Chhattisgarh': { totalMines: 2, highRisk: 1, totalWorkers: 840, majorMinerals: ['Coal', 'Iron Ore'] },
  'Odisha': { totalMines: 4, highRisk: 2, totalWorkers: 1240, majorMinerals: ['Coal', 'Iron Ore', 'Bauxite'] },
  'Karnataka': { totalMines: 4, highRisk: 1, totalWorkers: 920, majorMinerals: ['Gold', 'Iron Ore'] },
  'Rajasthan': { totalMines: 2, highRisk: 0, totalWorkers: 390, majorMinerals: ['Marble', 'Lead-Zinc'] },
  'Gujarat': { totalMines: 1, highRisk: 0, totalWorkers: 220, majorMinerals: ['Limestone'] },
  'Tamil Nadu': { totalMines: 1, highRisk: 0, totalWorkers: 480, majorMinerals: ['Lignite'] },
  'Andhra Pradesh': { totalMines: 1, highRisk: 0, totalWorkers: 160, majorMinerals: ['Barytes'] },
  'Telangana': { totalMines: 1, highRisk: 0, totalWorkers: 380, majorMinerals: ['Coal'] },
  'Goa': { totalMines: 1, highRisk: 0, totalWorkers: 200, majorMinerals: ['Iron Ore'] }
};

export const emergencyResponseTeams = {
  'Central': {
    'Directorate General of Mines Safety (DGMS)': { phone: '+91-11-2338-4455', email: 'dgms@gov.in' },
    'National Disaster Response Force': { phone: '108', email: 'ndrf@nic.in' },
    'Central Industrial Security Force': { phone: '+91-11-2436-0100', email: 'cisf@nic.in' }
  },
  'Regional': {
    'Jharkhand Mine Rescue': { phone: '+91-651-244-0123', email: 'rescue.jharkhand@gov.in' },
    'Chhattisgarh Mining Safety': { phone: '+91-771-255-0456', email: 'safety.cg@gov.in' },
    'Odisha Mine Safety Dept': { phone: '+91-674-253-0321', email: 'safety.odisha@gov.in' },
    'Karnataka Geological Survey': { phone: '+91-80-2235-0789', email: 'kgs@kar.nic.in' },
    'Coal India Limited Emergency': { phone: '+91-33-2324-7474', email: 'emergency@coalindia.in' }
  }
};

export const safetyProtocolsHindi = {
  'critical': {
    title: 'अत्यधिक गंभीर स्थिति (Critical Emergency)',
    actions: [
      'तुरंत सभी कर्मचारियों को निकालें (Evacuate all workers immediately)',
      'आपातकालीन सायरन बजाएं (Sound emergency siren)',
      'DGMS और स्थानीय अधिकारियों को सूचित करें (Notify DGMS and local authorities)',
      'एम्बुलेंस और रेस्क्यू टीम को बुलाएं (Call ambulance and rescue team)',
      'सभी मशीनरी तुरंत बंद करें (Shut down all machinery immediately)',
      'मीडिया और परिवारों को सूचित करें (Inform media and families)'
    ]
  },
  'high': {
    title: 'उच्च जोखिम (High Risk)',
    actions: [
      'खतरनाक क्षेत्र से श्रमिकों को हटाएं (Remove workers from danger zone)',
      'निरंतर निगरानी शुरू करें (Start continuous monitoring)',
      'सुरक्षा अधिकारी को तुरंत सूचित करें (Immediately notify safety officer)',
      'वैकल्पिक कार्य क्षेत्र तैयार करें (Prepare alternative work areas)',
      'आपातकालीन उपकरण तैयार रखें (Keep emergency equipment ready)'
    ]
  },
  'medium': {
    title: 'मध्यम जोखिम (Medium Risk)',
    actions: [
      'बढ़ी हुई निगरानी करें (Enhanced monitoring)',
      'भारी मशीनों का उपयोग सीमित करें (Limit heavy machinery use)',
      'दैनिक सुरक्षा जांच करें (Daily safety checks)',
      'आकस्मिक योजना तैयार करें (Prepare contingency plan)',
      'श्रमिकों को सुरक्षा प्रशिक्षण दें (Provide safety training to workers)'
    ]
  }
};