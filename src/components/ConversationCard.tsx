import React from 'react';

interface ConversationCardProps {
  customer: string;
  message: string;
  time: string;
  status: 'Active' | 'Closed';
}

const ConversationCard: React.FC<ConversationCardProps> = ({ 
  customer, 
  message, 
  time, 
  status 
}) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <img
              src="/api/placeholder/40/40"
              alt={customer}
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            <h3 className="font-medium">{customer}</h3>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">{time}</span>
          <div className={`text-xs mt-1 ${
            status === 'Active' ? 'text-green-600' : 'text-gray-500'
          }`}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;