import React from 'react';
import { format, parseISO } from 'date-fns';
import { ResidentStatus } from './ResidentStatus';
import type { Resident } from '../../types';

interface ResidentListItemProps {
  resident: Resident;
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
}

export function ResidentListItem({ resident, onStatusChange }: ResidentListItemProps) {
  const formattedDate = React.useMemo(() => {
    try {
      return format(parseISO(resident.submissionDate), 'MMM d, yyyy');
    } catch (error) {
      console.error('Invalid date format:', resident.submissionDate);
      return 'Invalid date';
    }
  }, [resident.submissionDate]);

  return (
    <li>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {resident.fullName}
            </p>
            <div className="ml-2">
              <ResidentStatus status={resident.applicationStatus} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">{formattedDate}</p>
            <select
              value={resident.applicationStatus}
              onChange={(e) => 
                onStatusChange(
                  resident.id,
                  e.target.value as 'pending' | 'completed'
                )
              }
              className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              {resident.contactNumber}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}