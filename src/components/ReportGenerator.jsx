import React, { useState } from 'react';
import { Download, FileText, Calendar, AlertTriangle, Users, MapPin } from 'lucide-react';
import { expandedIndianMineZones, stateWiseStatistics, emergencyResponseTeams } from '../data/expandedIndianMinesData';

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('safety');
  const [selectedZones, setSelectedZones] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: '2024-08-01',
    end: '2024-09-04'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'safety', name: 'Safety Compliance Report', description: 'Complete safety assessment and compliance status' },
    { id: 'risk', name: 'Risk Analysis Report', description: 'Detailed risk analysis with predictions' },
    { id: 'incident', name: 'Incident Report', description: 'Historical incidents and response analysis' },
    { id: 'worker', name: 'Worker Safety Report', description: 'Worker-focused safety metrics and alerts' },
    { id: 'environmental', name: 'Environmental Impact Report', description: 'Environmental factors affecting mine safety' }
  ];

  const generateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const reportData = {
        reportType: reportType,
        generatedAt: new Date().toLocaleString(),
        dateRange: dateRange,
        selectedZones: selectedZones.length > 0 ? selectedZones : expandedIndianMineZones.map(z => z.id),
        summary: generateReportSummary(),
        recommendations: generateRecommendations()
      };
      
      downloadReport(reportData);
      setIsGenerating(false);
    }, 2000);
  };

  const generateReportSummary = () => {
    const zones = selectedZones.length > 0 
      ? expandedIndianMineZones.filter(z => selectedZones.includes(z.id))
      : expandedIndianMineZones;

    const highRiskCount = zones.filter(z => z.riskLevel === 'high' || z.riskLevel === 'critical').length;
    const totalWorkers = zones.reduce((sum, z) => sum + z.workers, 0);
    const criticalZones = zones.filter(z => z.riskLevel === 'critical');

    return {
      totalZones: zones.length,
      highRiskZones: highRiskCount,
      totalWorkers: totalWorkers,
      criticalZones: criticalZones.length,
      statesAffected: new Set(zones.map(z => z.state)).size,
      averageRisk: (zones.reduce((sum, z) => sum + z.probability, 0) / zones.length * 100).toFixed(1)
    };
  };

  const generateRecommendations = () => {
    const summary = generateReportSummary();
    const recommendations = [];

    if (summary.criticalZones > 0) {
      recommendations.push('तत्काल कार्य बंद करें और सभी कर्मचारियों को निकालें (Immediate work stoppage and worker evacuation required)');
    }
    
    if (summary.highRiskZones > 3) {
      recommendations.push('अतिरिक्त सुरक्षा उपकरण और निगरानी सिस्टम लगाएं (Deploy additional safety equipment and monitoring systems)');
    }
    
    if (summary.averageRisk > 50) {
      recommendations.push('व्यापक सुरक्षा ऑडिट और जोखिम मूल्यांकन करें (Conduct comprehensive safety audit and risk assessment)');
    }
    
    recommendations.push('सभी श्रमिकों को अनिवार्य सुरक्षा प्रशिक्षण दें (Mandatory safety training for all workers)');
    recommendations.push('आपातकालीन प्रतिक्रिया योजना को अपडेट करें (Update emergency response plans)');

    return recommendations;
  };

  const downloadReport = (reportData) => {
    const reportContent = generateReportHTML(reportData);
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Indian_Mine_Safety_Report_${reportData.reportType}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportHTML = (data) => {
    const zones = selectedZones.length > 0 
      ? expandedIndianMineZones.filter(z => selectedZones.includes(z.id))
      : expandedIndianMineZones;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indian Mine Safety Report - ${data.reportType.toUpperCase()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .summary { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .zone-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .high-risk { border-left: 5px solid #dc3545; }
        .medium-risk { border-left: 5px solid #ffc107; }
        .low-risk { border-left: 5px solid #28a745; }
        .critical-risk { border-left: 5px solid #6f42c1; background: #fff5f5; }
        .recommendations { background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .emergency-contacts { background: #fff2e7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background: #f8f9fa; font-weight: bold; }
        .footer { text-align: center; margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🇮🇳 भारतीय खान सुरक्षा रिपोर्ट / Indian Mine Safety Report</div>
        <h1>${reportTypes.find(r => r.id === data.reportType)?.name || 'Safety Report'}</h1>
        <p>Generated on: ${data.generatedAt}</p>
        <p>Report Period: ${data.dateRange.start} to ${data.dateRange.end}</p>
    </div>

    <div class="summary">
        <h2>📊 Executive Summary / कार्यकारी सारांश</h2>
        <table>
            <tr><th>Metric / मेट्रिक</th><th>Value / मान</th></tr>
            <tr><td>Total Mine Zones / कुल खान क्षेत्र</td><td>${data.summary.totalZones}</td></tr>
            <tr><td>High Risk Zones / उच्च जोखिम क्षेत्र</td><td>${data.summary.highRiskZones}</td></tr>
            <tr><td>Critical Zones / गंभीर क्षेत्र</td><td>${data.summary.criticalZones}</td></tr>
            <tr><td>Total Workers / कुल श्रमिक</td><td>${data.summary.totalWorkers}</td></tr>
            <tr><td>States Affected / प्रभावित राज्य</td><td>${data.summary.statesAffected}</td></tr>
            <tr><td>Average Risk Level / औसत जोखिम स्तर</td><td>${data.summary.averageRisk}%</td></tr>
        </table>
    </div>

    <h2>🗺️ Mine Zone Details / खान क्षेत्र विवरण</h2>
    ${zones.map(zone => `
        <div class="zone-card ${zone.riskLevel === 'critical' ? 'critical-risk' : zone.riskLevel}-risk">
            <h3>${zone.name}</h3>
            <p><strong>State / राज्य:</strong> ${zone.state} | <strong>District / जिला:</strong> ${zone.district}</p>
            <p><strong>Mine Type / खान प्रकार:</strong> ${zone.mineType} | <strong>Workers / श्रमिक:</strong> ${zone.workers}</p>
            <p><strong>Risk Level / जोखिम स्तर:</strong> ${zone.riskLevel.toUpperCase()} (${(zone.probability * 100).toFixed(1)}%)</p>
            <p><strong>Last Incident / अंतिम घटना:</strong> ${zone.lastIncident || 'None recorded / कोई रिकॉर्ड नहीं'}</p>
        </div>
    `).join('')}

    <div class="recommendations">
        <h2>🛡️ Safety Recommendations / सुरक्षा सिफारिशें</h2>
        <ul>
            ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>

    <div class="emergency-contacts">
        <h2>🚨 Emergency Contacts / आपातकालीन संपर्क</h2>
        <h3>Central Authorities / केंद्रीय अधिकारी</h3>
        <ul>
            ${Object.entries(emergencyResponseTeams.Central).map(([name, contact]) => 
                `<li><strong>${name}:</strong> ${contact.phone} | ${contact.email}</li>`
            ).join('')}
        </ul>
        <h3>Regional Authorities / क्षेत्रीय अधिकारी</h3>
        <ul>
            ${Object.entries(emergencyResponseTeams.Regional).map(([name, contact]) => 
                `<li><strong>${name}:</strong> ${contact.phone} | ${contact.email}</li>`
            ).join('')}
        </ul>
    </div>

    <div class="footer">
        <p><strong>Disclaimer:</strong> This report is generated by AI-based analysis for informational purposes. 
        Please consult with certified mine safety professionals for official assessments.</p>
        <p><strong>अस्वीकरण:</strong> यह रिपोर्ट सूचनात्मक उद्देश्यों के लिए AI-आधारित विश्लेषण द्वारा तैयार की गई है। 
        आधिकारिक मूल्यांकन के लिए प्रमाणित खान सुरक्षा पेशेवरों से सलाह लें।</p>
        <p>Generated by Indian Mine Safety & Rockfall Prediction System</p>
    </div>
</body>
</html>`;
  };

  const handleZoneSelection = (zoneId) => {
    setSelectedZones(prev => 
      prev.includes(zoneId) 
        ? prev.filter(id => id !== zoneId)
        : [...prev, zoneId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Safety Report Generator</h2>
          <p className="text-sm text-gray-600">सुरक्षा रिपोर्ट जेनरेटर</p>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">PDF & HTML Reports</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    reportType === type.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-800">{type.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Report Period</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Zone Selection */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Mine Zones (Optional)</h3>
            <p className="text-sm text-gray-600 mb-3">Leave empty to include all zones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {expandedIndianMineZones.map(zone => (
                <label key={zone.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={selectedZones.includes(zone.id)}
                    onChange={() => handleZoneSelection(zone.id)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">{zone.name}</span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{zone.state}</span>
                      <span className={`px-1 rounded ${
                        zone.riskLevel === 'critical' ? 'bg-purple-100 text-purple-600' :
                        zone.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                        zone.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {zone.riskLevel}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Report Preview & Generation */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Report Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Report Type:</span>
                <span className="font-medium">{reportTypes.find(r => r.id === reportType)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Zones Selected:</span>
                <span className="font-medium">{selectedZones.length || expandedIndianMineZones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date Range:</span>
                <span className="font-medium">{dateRange.start} to {dateRange.end}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Format:</span>
                <span className="font-medium">HTML</span>
              </div>
            </div>
          </div>

          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Generate & Download Report</span>
              </>
            )}
          </button>

          {/* Quick Stats */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">Current Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Mines:</span>
                <span className="font-medium">{expandedIndianMineZones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Critical Risk:</span>
                <span className="font-medium text-purple-600">
                  {expandedIndianMineZones.filter(z => z.riskLevel === 'critical').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High Risk:</span>
                <span className="font-medium text-red-600">
                  {expandedIndianMineZones.filter(z => z.riskLevel === 'high').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Workers:</span>
                <span className="font-medium text-blue-600">
                  {expandedIndianMineZones.reduce((sum, z) => sum + z.workers, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;