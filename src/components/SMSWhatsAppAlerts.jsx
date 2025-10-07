import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Send, Users, Bell, CheckCircle, AlertTriangle } from 'lucide-react';
import { expandedIndianMineZones, emergencyResponseTeams } from '../data/expandedIndianMinesData';

const SMSWhatsAppAlerts = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [alertType, setAlertType] = useState('emergency');
  const [isSending, setIsSending] = useState(false);
  const [sentAlerts, setSentAlerts] = useState([]);
  const [contactGroups, setContactGroups] = useState({
    workers: [],
    supervisors: [],
    emergency: [],
    management: []
  });

  useEffect(() => {
    // Initialize contact groups with sample data
    setContactGroups({
      workers: [
        { id: 1, name: 'राम कुमार (Ram Kumar)', phone: '+91-9876543210', whatsapp: true, zone: 'Jharia Coal Mine' },
        { id: 2, name: 'सुनील यादव (Sunil Yadav)', phone: '+91-9876543211', whatsapp: true, zone: 'Bailadila Iron Ore' },
        { id: 3, name: 'अजय सिंह (Ajay Singh)', phone: '+91-9876543212', whatsapp: false, zone: 'Kolar Gold Fields' },
        { id: 4, name: 'विकास गुप्ता (Vikas Gupta)', phone: '+91-9876543213', whatsapp: true, zone: 'Singareni Coal' }
      ],
      supervisors: [
        { id: 5, name: 'प्रदीप शर्मा (Pradeep Sharma)', phone: '+91-9876543220', whatsapp: true, zone: 'Multiple Zones' },
        { id: 6, name: 'संजय मिश्रा (Sanjay Mishra)', phone: '+91-9876543221', whatsapp: true, zone: 'Odisha Bauxite' },
        { id: 7, name: 'राजेश कुमार (Rajesh Kumar)', phone: '+91-9876543222', whatsapp: false, zone: 'Gujarat Limestone' }
      ],
      emergency: [
        { id: 8, name: 'DGMS Emergency', phone: '+91-11-2338-4455', whatsapp: false, zone: 'Central Authority' },
        { id: 9, name: 'NDRF Rescue Team', phone: '108', whatsapp: false, zone: 'National Emergency' },
        { id: 10, name: 'Mine Safety Officer', phone: '+91-9876543230', whatsapp: true, zone: 'Regional Safety' }
      ],
      management: [
        { id: 11, name: 'डॉ. अनिल वर्मा (Dr. Anil Verma)', phone: '+91-9876543240', whatsapp: true, zone: 'Chief Mining Engineer' },
        { id: 12, name: 'सुमित्रा देवी (Sumitra Devi)', phone: '+91-9876543241', whatsapp: true, zone: 'Safety Director' }
      ]
    });
  }, []);

  const alertTemplates = {
    emergency: {
      hindi: 'आपातकाल! तुरंत खान से निकलें। जीवन खतरे में है। Emergency! Evacuate mine immediately. Life threatening situation.',
      english: 'EMERGENCY! Evacuate mine immediately. Life threatening rockfall risk detected. Follow emergency protocols.'
    },
    warning: {
      hindi: 'चेतावनी: खान में जोखिम बढ़ा है। सावधान रहें। Warning: Increased risk in mine area. Stay alert and follow safety protocols.',
      english: 'WARNING: Increased rockfall risk detected in your work area. Enhanced safety protocols in effect.'
    },
    info: {
      hindi: 'सूचना: नई सुरक्षा जांच शुरू की गई है। Info: New safety inspection initiated. Please cooperate with safety team.',
      english: 'INFO: Safety inspection in progress. Please follow instructions from safety personnel.'
    },
    shift: {
      hindi: 'शिफ्ट अपडेट: आज की शिफ्ट में सुरक्षा प्राथमिकता है। Shift Update: Safety is priority for today\'s shift.',
      english: 'SHIFT UPDATE: Enhanced safety measures in effect for current shift. Report any concerns immediately.'
    }
  };

  const handleSendAlert = () => {
    if (!alertMessage || selectedContacts.length === 0) return;
    
    setIsSending(true);
    
    // Simulate sending alerts
    setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        message: alertMessage,
        type: alertType,
        contacts: selectedContacts.length,
        timestamp: new Date().toLocaleString(),
        status: 'sent',
        deliveryRate: Math.floor(Math.random() * 10) + 90 // 90-100% delivery rate
      };
      
      setSentAlerts(prev => [newAlert, ...prev]);
      setAlertMessage('');
      setSelectedContacts([]);
      setIsSending(false);
    }, 2000);
  };

  const handleContactSelection = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllInGroup = (groupName) => {
    const groupContacts = contactGroups[groupName].map(c => c.id);
    setSelectedContacts(prev => [...new Set([...prev, ...groupContacts])]);
  };

  const handleTemplateSelection = (template) => {
    setAlertMessage(template);
  };

  const getAllContacts = () => {
    return Object.values(contactGroups).flat();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">SMS/WhatsApp Alert System</h2>
          <p className="text-sm text-gray-600">SMS/व्हाट्सऐप अलर्ट सिस्टम</p>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">Real-time Notifications</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Composition */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alert Type & Templates */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Compose Alert</h3>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {Object.keys(alertTemplates).map(type => (
                <button
                  key={type}
                  onClick={() => setAlertType(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    alertType === type 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Quick Templates</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleTemplateSelection(alertTemplates[alertType].hindi)}
                  className="text-left p-2 bg-orange-50 border border-orange-200 rounded text-sm hover:bg-orange-100"
                >
                  <strong>Hindi:</strong> {alertTemplates[alertType].hindi}
                </button>
                <button
                  onClick={() => handleTemplateSelection(alertTemplates[alertType].english)}
                  className="text-left p-2 bg-blue-50 border border-blue-200 rounded text-sm hover:bg-blue-100"
                >
                  <strong>English:</strong> {alertTemplates[alertType].english}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Custom Message</label>
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Type your custom alert message in Hindi/English..."
                maxLength="160"
              />
              <div className="text-xs text-gray-500 mt-1">
                {alertMessage.length}/160 characters
              </div>
            </div>

            <button
              onClick={handleSendAlert}
              disabled={isSending || !alertMessage || selectedContacts.length === 0}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isSending ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Sending Alerts...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send to {selectedContacts.length} Contacts</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Selection */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Recipients</h3>
            
            {Object.entries(contactGroups).map(([groupName, contacts]) => (
              <div key={groupName} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700 capitalize">{groupName}</h4>
                  <button
                    onClick={() => selectAllInGroup(groupName)}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    Select All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {contacts.map(contact => (
                    <label key={contact.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleContactSelection(contact.id)}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">{contact.name}</span>
                          {contact.whatsapp && (
                            <MessageSquare className="h-3 w-3 text-green-500" />
                          )}
                          <Phone className="h-3 w-3 text-blue-500" />
                        </div>
                        <div className="text-xs text-gray-500">
                          {contact.phone} • {contact.zone}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert History & Stats */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Alert Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Contacts:</span>
                <span className="font-medium">{getAllContacts().length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WhatsApp Enabled:</span>
                <span className="font-medium text-green-600">
                  {getAllContacts().filter(c => c.whatsapp).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Selected:</span>
                <span className="font-medium text-blue-600">{selectedContacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alerts Sent Today:</span>
                <span className="font-medium">{sentAlerts.length}</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Alerts</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {sentAlerts.length > 0 ? (
                sentAlerts.map(alert => (
                  <div key={alert.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.type === 'emergency' ? 'bg-red-100 text-red-600' :
                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {alert.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.message.substring(0, 50)}...</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{alert.contacts} recipients</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">{alert.deliveryRate}% delivered</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No alerts sent yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Quick Actions */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-700 mb-3">Emergency Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setAlertType('emergency');
                  setAlertMessage(alertTemplates.emergency.hindi);
                  setSelectedContacts(getAllContacts().map(c => c.id));
                }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Send Emergency Alert to All</span>
              </button>
              
              <button
                onClick={() => {
                  setAlertType('emergency');
                  setAlertMessage(alertTemplates.emergency.hindi);
                  setSelectedContacts(contactGroups.emergency.map(c => c.id));
                }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Alert Emergency Teams Only</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSWhatsAppAlerts;