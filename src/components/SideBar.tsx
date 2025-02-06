'use client';

import React from 'react';
import { 
  Home, Users, MessageSquare, Mail, 
  Phone, BarChart2, HelpCircle, Settings 
} from 'lucide-react';

const menuItems = [
  { icon: Home, text: 'Dashboard' },
  { icon: Users, text: 'Contacts', count: 12 },
  { icon: MessageSquare, text: 'Conversations', count: 5 },
  { icon: Mail, text: 'Email', count: 3 },
  { icon: Phone, text: 'Voice' },
  { icon: BarChart2, text: 'Analytics' },
  { icon: HelpCircle, text: 'Help Center' },
  { icon: Settings, text: 'Settings' }
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            AH
          </div>
          <span className="text-xl font-semibold">Agent Hub</span>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.text}</span>
                </div>
                {item.count && (
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}