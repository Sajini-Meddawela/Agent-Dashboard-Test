'use client';
import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle 
} from 'lucide-react';

import {Sidebar} from './SideBar';
import {Header} from './Header';
import StatsCard from './StatsCard';
import ConversationCard from './ConversationCard';

const AgentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16 p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard 
            title="Total Conversations" 
            value="1,234" 
            change="+12.5%" 
            icon={MessageSquare}
          />
          <StatsCard 
            title="Active Chats" 
            value="56" 
            change="+3.2%" 
            icon={Users}
          />
          <StatsCard 
            title="Response Time" 
            value="1m 30s" 
            change="-30s" 
            icon={Clock}
          />
          <StatsCard 
            title="Resolution Rate" 
            value="94%" 
            change="+1.2%" 
            icon={CheckCircle}
          />
        </div>

        {/* Recent Conversations */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Recent Conversations</h2>
          </div>
          <div>
            <ConversationCard 
              customer="Sarah Johnson"
              message="Thanks for your help with..."
              time="2m ago"
              status="Active"
            />
            <ConversationCard 
              customer="Mike Wilson"
              message="I need assistance with..."
              time="5m ago"
              status="Active"
            />
            <ConversationCard 
              customer="Emma Davis"
              message="Could you please check..."
              time="15m ago"
              status="Closed"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;