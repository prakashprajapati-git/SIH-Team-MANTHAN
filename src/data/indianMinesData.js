// Indian Mines Specific Data for AI-Based Rockfall Prediction System

export const indianMineZones = [
  { id: 1, name: 'Jharia Coal Mine - Block A', x: 120, y: 180, riskLevel: 'high', probability: 0.88, lastIncident: '2024-08-20', state: 'Jharkhand', mineType: 'Coal' },
  { id: 2, name: 'Bailadila Iron Ore - Sector 14', x: 220, y: 120, riskLevel: 'medium', probability: 0.52, lastIncident: '2024-07-15', state: 'Chhattisgarh', mineType: 'Iron Ore' },
  { id: 3, name: 'Kolar Gold Fields - Level 3', x: 320, y: 220, riskLevel: 'high', probability: 0.82, lastIncident: '2024-08-25', state: 'Karnataka', mineType: 'Gold' },
  { id: 4, name: 'Singareni Coal - Pit 2', x: 180, y: 260, riskLevel: 'medium', probability: 0.48, lastIncident: '2024-06-30', state: 'Telangana', mineType: 'Coal' },
  { id: 5, name: 'Rajasthan Marble Quarry', x: 280, y: 160, riskLevel: 'low', probability: 0.22, lastIncident: null, state: 'Rajasthan', mineType: 'Marble' },
  { id: 6, name: 'Odisha Bauxite Mine', x: 160, y: 100, riskLevel: 'high', probability: 0.76, lastIncident: '2024-08-10', state: 'Odisha', mineType: 'Bauxite' },
  { id: 7, name: 'Gujarat Limestone Quarry', x: 100, y: 240, riskLevel: 'medium', probability: 0.41, lastIncident: '2024-07-05', state: 'Gujarat', mineType: 'Limestone' }
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

export const indianEnvironmentalData = [
  { timestamp: '2024-09-04 00:00', rainfall: 0, temperature: 28, humidity: 72, windSpeed: 8, monsoonIntensity: 'low' },
  { timestamp: '2024-09-04 06:00', rainfall: 15.2, temperature: 26, humidity: 88, windSpeed: 12, monsoonIntensity: 'moderate' },
  { timestamp: '2024-09-04 12:00', rainfall: 45.8, temperature: 32, humidity: 95, windSpeed: 22, monsoonIntensity: 'heavy' },
  { timestamp: '2024-09-04 18:00', rainfall: 62.3, temperature: 29, humidity: 98, windSpeed: 28, monsoonIntensity: 'very_heavy' }
];

export const indianAlertHistory = [
  { id: 1, timestamp: '2024-09-04 14:25', type: 'critical', zone: 'Jharia Coal Mine - Block A', message: 'उच्च विस्थापन का पता चला - तत्काल निकासी की सिफारिश (High displacement detected - immediate evacuation recommended)', status: 'active', language: 'hindi' },
  { id: 2, timestamp: '2024-09-04 13:45', type: 'warning', zone: 'Kolar Gold Fields - Level 3', message: 'बढ़ते कंपन स्तर - बारीकी से निगरानी करें (Increasing vibration levels - monitor closely)', status: 'acknowledged', language: 'hindi' },
  { id: 3, timestamp: '2024-09-04 12:30', type: 'info', zone: 'Rajasthan Marble Quarry', message: 'नियमित सेंसर अंशांकन पूर्ण (Routine sensor calibration completed)', status: 'resolved', language: 'hindi' },
  { id: 4, timestamp: '2024-09-04 11:15', type: 'critical', zone: 'Odisha Bauxite Mine', message: 'मानसून के बाद उच्च छिद्र दबाव (High pore pressure after monsoon)', status: 'monitoring', language: 'hindi' },
  { id: 5, timestamp: '2024-09-04 10:30', type: 'warning', zone: 'Singareni Coal - Pit 2', message: 'गैस रिसाव का संदेह - क्षेत्र खाली करें (Suspected gas leak - evacuate area)', status: 'active', language: 'hindi' }
];

export const indianWorkerSafetyProtocols = [
  {
    riskLevel: 'critical',
    actions: [
      'तत्काल सभी कर्मचारियों को निकालें (Evacuate all workers immediately)',
      'आपातकालीन सायरन बजाएं (Sound emergency siren)',
      'माइन सेफ्टी ऑफिसर को सूचित करें (Notify Mine Safety Officer)',
      'एम्बुलेंस और रेस्क्यू टीम को अलर्ट करें (Alert ambulance and rescue team)',
      'सभी मशीनरी बंद करें (Shut down all machinery)'
    ]
  },
  {
    riskLevel: 'high',
    actions: [
      'जोखिम क्षेत्र से कर्मचारियों को हटाएं (Remove workers from risk area)',
      'निरंतर निगरानी सक्रिय करें (Activate continuous monitoring)',
      'सुरक्षा अधिकारी को सूचित करें (Inform safety officer)',
      'वैकल्पिक कार्य क्षेत्र तैयार करें (Prepare alternative work areas)'
    ]
  },
  {
    riskLevel: 'medium',
    actions: [
      'बढ़ी हुई निगरानी प्रोटोकॉल (Enhanced monitoring protocol)',
      'भारी उपकरण पहुंच प्रतिबंधित करें (Restrict heavy equipment access)',
      'दैनिक दृश्य निरीक्षण (Daily visual inspections)',
      'आकस्मिक योजना तैयार करें (Prepare contingency plans)'
    ]
  }
];

export const indianMineTypes = {
  'Coal': { color: '#1f2937', icon: '⚫', majorStates: ['Jharkhand', 'Chhattisgarh', 'Odisha', 'Telangana'] },
  'Iron Ore': { color: '#dc2626', icon: '🔴', majorStates: ['Chhattisgarh', 'Jharkhand', 'Odisha', 'Karnataka'] },
  'Gold': { color: '#fbbf24', icon: '🟡', majorStates: ['Karnataka', 'Andhra Pradesh', 'Rajasthan'] },
  'Bauxite': { color: '#f97316', icon: '🟠', majorStates: ['Odisha', 'Gujarat', 'Jharkhand'] },
  'Marble': { color: '#e5e7eb', icon: '⚪', majorStates: ['Rajasthan', 'Gujarat', 'Andhra Pradesh'] },
  'Limestone': { color: '#6b7280', icon: '🔘', majorStates: ['Rajasthan', 'Madhya Pradesh', 'Chhattisgarh'] }
};

export const emergencyContacts = {
  national: {
    'Directorate General of Mines Safety': '+91-11-2338-4455',
    'National Disaster Response Force': '108',
    'Emergency Services': '112'
  },
  regional: {
    'Jharkhand Mine Safety': '+91-651-244-0123',
    'Chhattisgarh Mining Dept': '+91-771-255-0456',
    'Karnataka Geological Dept': '+91-80-2235-0789',
    'Odisha Mining Corporation': '+91-674-253-0321'
  }
};