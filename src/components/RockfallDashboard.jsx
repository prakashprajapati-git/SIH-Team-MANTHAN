import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, TrendingUp, Activity, Bell, MapPin } from 'lucide-react';
import RiskMap from './RiskMap';
import PredictionModel from './PredictionModel';
import AlertSystem from './AlertSystem';
import EnvironmentalMonitor from './EnvironmentalMonitor';
import { mineZones, sensorData, alertHistory } from '../data/rockfallData';

const RockfallDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [criticalAlerts, setCriticalAlerts] = useState(0);
    const [totalZones, setTotalZones] = useState(0);
    const [highRiskZones, setHighRiskZones] = useState(0);

    // NEW: State variables to manage the API data flow
    const [formData, setFormData] = useState({});
    const [predictionResult, setPredictionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [mapRiskData, setMapRiskData] = useState({});

    useEffect(() => {
        // This part remains the same, calculating metrics from static data
        const critical = alertHistory.filter(alert => alert.type === 'critical' && alert.status === 'active').length;
        const total = mineZones.length;
        const highRisk = mineZones.filter(zone => zone.riskLevel === 'high').length;
        
        setCriticalAlerts(critical);
        setTotalZones(total);
        setHighRiskZones(highRisk);
    }, []);

    // NEW: Function to handle selecting a zone on the map
    const handleZoneSelect = (zoneId, data) => {
        setFormData({ zone_id: zoneId, ...data });
        // Switch to the prediction tab automatically when a zone is clicked
        setActiveTab('prediction'); 
    };

    // NEW: The function that calls our Python backend API
    const handlePredict = async () => {
        setIsLoading(true);
        setPredictionResult(null);
        setApiError(null);

        try {
            // Fetch data from the Flask backend running on port 5000
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const newResult = { zone_id: formData.zone_id, ...data };
            
            setPredictionResult(newResult);
            // Update the risk data to change the map color
            setMapRiskData(prev => ({ ...prev, [newResult.zone_id]: newResult }));

        } catch (err) {
            console.error("Fetch failed:", err);
            setApiError('Failed to get prediction. Is the backend server running?');
        } finally {
            setIsLoading(false);
        }
    };

    // CORRECTED: Full implementation of getRiskColor
    const getRiskColor = (level) => {
        switch (level) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    // CORRECTED: Full implementation of StatCard
    const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
                    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
                </div>
                <Icon className={`h-8 w-8 text-${color}-500`} />
            </div>
        </div>
    );

    // CORRECTED: Full implementation of TabButton
    const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border'
            }`}
        >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">AI Rockfall Prediction System</h1>
                <p className="text-blue-100">Real-time monitoring and predictive analytics for open-pit mine safety</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={AlertTriangle} title="Critical Alerts" value={criticalAlerts} subtitle="Requiring immediate attention" color="red" />
                <StatCard icon={Shield} title="Total Zones" value={totalZones} subtitle="Under monitoring" color="blue" />
                <StatCard icon={TrendingUp} title="High Risk Zones" value={highRiskZones} subtitle="Above 70% probability" color="orange" />
                <StatCard icon={Activity} title="Active Sensors" value={sensorData.length} subtitle="Real-time monitoring" color="green" />
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2">
                <TabButton id="overview" label="Overview" icon={Activity} isActive={activeTab === 'overview'} onClick={setActiveTab} />
                <TabButton id="riskmap" label="Risk Map" icon={MapPin} isActive={activeTab === 'riskmap'} onClick={setActiveTab} />
                <TabButton id="prediction" label="AI Prediction" icon={TrendingUp} isActive={activeTab === 'prediction'} onClick={setActiveTab} />
                <TabButton id="alerts" label="Alert System" icon={Bell} isActive={activeTab === 'alerts'} onClick={setActiveTab} />
                <TabButton id="environmental" label="Environmental" icon={Shield} isActive={activeTab === 'environmental'} onClick={setActiveTab} />
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Mine Zone Status Overview</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Zone Status List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700">Zone Risk Assessment</h3>
                                {mineZones.map(zone => (
                                    <div key={zone.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-800">{zone.name}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(zone.riskLevel)}`}>
                                                {zone.riskLevel.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>Risk Probability: <span className="font-medium">{(zone.probability * 100).toFixed(1)}%</span></p>
                                            <p>Last Incident: <span className="font-medium">{zone.lastIncident || 'None recorded'}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Sensor Readings */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-700">Latest Sensor Readings</h3>
                                {sensorData.map(sensor => (
                                    <div key={sensor.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-800">{sensor.type.replace('_', ' ').toUpperCase()}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                sensor.status === 'critical' ? 'text-red-600 bg-red-100' :
                                                sensor.status === 'warning' ? 'text-yellow-600 bg-yellow-100' :
                                                'text-green-600 bg-green-100'
                                            }`}>
                                                {sensor.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>Location: <span className="font-medium">{sensor.location}</span></p>
                                            <p>Value: <span className="font-medium">{sensor.value} {sensor.unit}</span></p>
                                            <p>Updated: <span className="font-medium">{sensor.timestamp}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'riskmap' && <RiskMap onZoneSelect={handleZoneSelect} riskData={mapRiskData} />}
                
                {activeTab === 'prediction' && (
                    <div>
                        <PredictionModel 
                            formData={formData}
                            setFormData={setFormData}
                            onPredict={handlePredict}
                        />
                        {/* Display the result right below the prediction form */}
                        <AlertSystem 
                            result={predictionResult} 
                            loading={isLoading} 
                            error={apiError} 
                        />
                    </div>
                )}

                {activeTab === 'alerts' && <AlertSystem result={null} loading={false} error={null} />}
                {activeTab === 'environmental' && <EnvironmentalMonitor />}
            </div>
        </div>
    );
};

export default RockfallDashboard;

