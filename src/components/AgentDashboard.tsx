"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare, Users, Clock, CheckCircle } from "lucide-react";
import { useQuery, useSubscription, gql } from "@apollo/client";
import { Sidebar } from "./SideBar";
import { Header } from "./Header";
import StatsCard from "./StatsCard";

const GET_STATS = gql`
  query GetAgentStats {
    getAgentStats {
      totalConversations
      activeChats
      responseTime
      resolutionRate
    }
  }
`;

const AGENT_UPDATED = gql`
  subscription OnAgentUpdated {
    agentUpdated {
      totalConversations
      activeChats
      responseTime
      resolutionRate
    }
  }
`;

const AgentDashboard: React.FC = () => {
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_STATS);
  const { data: subData, error: subError } = useSubscription(AGENT_UPDATED);

  const [stats, setStats] = useState({
    totalConversations: 0,
    activeChats: 0,
    responseTime: "Loading...",
    resolutionRate: 0,
  });

  // Log GraphQL query data
  useEffect(() => {
    console.log("Query Data:", queryData);
    if (queryData?.getAgentStats) {
      setStats(queryData.getAgentStats);
    }
  }, [queryData]);

  // Log GraphQL subscription data
  useEffect(() => {
    console.log("Subscription Data:", subData);
    if (subData?.agentUpdated) {
      setStats(subData.agentUpdated);
    }
  }, [subData]);

  // Log GraphQL subscription errors
  useEffect(() => {
    if (subError) {
      console.error("Subscription Error:", subError);
    }
  }, [subError]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />

      <main className="ml-64 pt-16 p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard 
            title="Total Conversations" 
            value={queryLoading ? "Loading..." : stats.totalConversations.toString()} 
            change="+12.5%" 
            icon={MessageSquare}
          />
          <StatsCard 
            title="Active Chats" 
            value={queryLoading ? "Loading..." : stats.activeChats.toString()} 
            change="+3.2%" 
            icon={Users}
          />
          <StatsCard 
            title="Response Time" 
            value={queryLoading ? "Loading..." : stats.responseTime} 
            change="-30s" 
            icon={Clock}
          />
          <StatsCard 
            title="Resolution Rate" 
            value={queryLoading ? "Loading..." : `${stats.resolutionRate}%`} 
            change="+1.2%" 
            icon={CheckCircle}
          />
        </div>

        {/* Show query error if it fails */}
        {queryError && <p className="text-red-500">Error: {queryError.message}</p>}
        
        {/* Show subscription error if it fails */}
        {subError && <p className="text-red-500">Subscription Error: {subError.message}</p>}
      </main>
    </div>
  );
};

export default AgentDashboard;
