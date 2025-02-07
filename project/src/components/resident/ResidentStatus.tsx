import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface ResidentStatusProps {
  status: 'pending' | 'completed';
}

export function ResidentStatus({ status }: ResidentStatusProps) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      <Clock className="h-3 w-3 mr-1" />
      Pending
    </span>
  );
}