import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, change, trend, icon, color = 'blue', subtitle, delay = 0 }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      icon: 'text-blue-500',
      border: 'border-blue-200'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      light: 'from-green-50 to-green-100',
      text: 'text-green-600',
      icon: 'text-green-500',
      border: 'border-green-200'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      light: 'from-red-50 to-red-100',
      text: 'text-red-600',
      icon: 'text-red-500',
      border: 'border-red-200'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      light: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      icon: 'text-orange-500',
      border: 'border-orange-200'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      icon: 'text-purple-500',
      border: 'border-purple-200'
    },
    indigo: {
      bg: 'from-indigo-500 to-indigo-600',
      light: 'from-indigo-50 to-indigo-100',
      text: 'text-indigo-600',
      icon: 'text-indigo-500',
      border: 'border-indigo-200'
    }
  };

  const currentColor = colorClasses[color] || colorClasses.blue;

  return (
    <div 
      className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border ${currentColor.border} hover:scale-105`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentColor.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {icon && (
                <div className="text-white">
                  {typeof icon === 'string' ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={icon} 
                      />
                    </svg>
                  ) : (
                    <icon className="h-6 w-6" />
                  )}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <span className={`text-3xl font-bold ${currentColor.text} group-hover:scale-105 transition-transform duration-300`}>
            {value}
          </span>
        </div>

        {/* Change Indicator */}
        {change && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                trend === 'up' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {change}
              </div>
            </div>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 bg-gradient-to-r ${currentColor.bg} rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: trend === 'up' ? '75%' : '45%',
                animationDelay: `${delay + 200}ms`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default StatsCard;