import React from 'react';
import { TrendingUp, Users, AlertTriangle, Activity, BarChart3, PieChart, LineChart, Gauge, Target, Map } from 'lucide-react';
import AreaChartComponent from './charts/AreaChart';
import BarChartComponent from './charts/BarChart';
import PieChartComponent from './charts/PieChart';
import LineChartComponent from './charts/LineChart';
import RadarChartComponent from './charts/RadarChart';
import GaugeChart from './charts/GaugeChart';
import BubbleChart from './charts/BubbleChart';
import TreeMapChart from './charts/TreeMap';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      subtitle: 'This month'
    },
    {
      title: 'Active Users',
      value: '24,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      subtitle: 'Online now'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red',
      subtitle: 'Requiring attention'
    },
    {
      title: 'System Health',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up',
      icon: Activity,
      color: 'purple',
      subtitle: 'Uptime'
    }
  ];

  const ChartCard = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">Real-time data</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your systems today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            subtitle={stat.subtitle}
            delay={index * 100}
          />
        ))}
      </div>
      
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Revenue Trends" icon={BarChart3} className="lg:col-span-1">
          <AreaChartComponent />
        </ChartCard>
        <ChartCard title="Monthly Sales" icon={TrendingUp} className="lg:col-span-1">
          <BarChartComponent />
        </ChartCard>
      </div>
      
      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Traffic Sources" icon={PieChart}>
          <PieChartComponent />
        </ChartCard>
        <ChartCard title="Conversion Rate" icon={LineChart}>
          <LineChartComponent />
        </ChartCard>
        <ChartCard title="Performance Metrics" icon={Target}>
          <RadarChartComponent />
        </ChartCard>
      </div>
      
      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="System Utilization" icon={Gauge}>
          <GaugeChart value={72} min={0} max={100} title="System Utilization" />
        </ChartCard>
        <ChartCard title="Data Distribution" icon={Map}>
          <BubbleChart />
        </ChartCard>
        <ChartCard title="Category Analysis" icon={BarChart3}>
          <TreeMapChart />
        </ChartCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Generate Report</h4>
            <p className="text-sm text-gray-500">Create detailed analytics</p>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">User Management</h4>
            <p className="text-sm text-gray-500">Manage user access</p>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <h4 className="font-medium text-gray-900">Alert Settings</h4>
            <p className="text-sm text-gray-500">Configure notifications</p>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all duration-200 text-left group">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <Activity className="h-4 w-4 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">System Health</h4>
            <p className="text-sm text-gray-500">Monitor performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;